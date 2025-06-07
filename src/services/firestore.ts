import { doc, setDoc, deleteDoc, getDoc, getDocs, where, collection, query } from "firebase/firestore";
import { db } from './firebase';
import { Budget } from "@/types/budget";
import { UserInfo } from "@/types/userInfo";

const budgetCollection = 'Budgets';
const users_collection = "users";

export async function getUserInfo(userId: string): Promise<UserInfo>{
  const docRef = doc(db, users_collection, userId);
  const docSnap = await getDoc(docRef);

  return ((docSnap.exists())) ? docSnap.data() as UserInfo : {
    uid : userId,
    occupation : "",
    organization : "",
    income: 0
  };
}

export async function updateUserInfo(userInfo: UserInfo){
  const newDoc = doc(db, users_collection, userInfo.uid);
  await setDoc(newDoc, userInfo, { merge: true });
}

// delete a budget
export async function deleteBudget(budgetId: string): Promise<void>{
  await deleteDoc(doc(db, budgetCollection, budgetId));
}

// create/update a budget
export async function upsertBudget(budgetData: Budget): Promise<void>{
  await setDoc(doc(db, budgetCollection, budgetData.id ?? `${Date.now()}`), budgetData);
}

// get all budgets
export async function getAllBudgets(userId: string): Promise<Budget[]>{
  const budgets: Budget[] = []
  const budgetsRef = collection(db, budgetCollection);
  // Create a query against the collection.
  const q = query(budgetsRef, where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    budgets.push({ ...(doc.data() as Budget), id: doc.id });
  });

  return budgets;
}

// get a budget by id
export async function getBudgetById(budgetId: string): Promise<Budget | null>{
  const docRef = doc(db, budgetCollection, budgetId);
  const docSnap = await getDoc(docRef);

  return (docSnap.exists()) ? { ...(docSnap.data() as Budget), id: docSnap.id } : null;
}
