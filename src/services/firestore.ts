import { doc, setDoc, deleteDoc, getDoc, getDocs, where, collection, query } from "firebase/firestore";
import { db } from './firebase';
import { Budget } from "@/types/budget";
import { Mortgage } from "@/types/mortgage";
import { UserInfo } from "@/types/userInfo";

const mortgageCollection = 'Mortgages';
const budgetCollection = 'Budgets';
const users_collection = "users";

export async function getUserInfo(userId: string): Promise<UserInfo>{
  const docRef = doc(db, users_collection, userId);
  const docSnap = await getDoc(docRef);

  return ((docSnap.exists())) ? docSnap.data() as UserInfo : {
    uid : userId,
    occupation : "",
    organization : "",
    linkedIn : "",
    gitHub : ""
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
    budgets.push(doc.data() as Budget)
  });

  return budgets;
}

// get a budget by id
export async function getBudgetById(budgetId: string): Promise<Budget | null>{
  const docRef = doc(db, budgetCollection, budgetId);
  const docSnap = await getDoc(docRef);

  return (docSnap.exists()) ? docSnap.data() as Budget : null;
}

// create/update a mortgage
export async function upsertMortgage(mortgageData: Mortgage): Promise<void>{
  await setDoc(doc(db, mortgageCollection, mortgageData.userId), mortgageData);
}

// delete a mortgage
export async function deleteMortgage(userId: string): Promise<void>{
  await deleteDoc(doc(db, mortgageCollection, userId));
}

// get a mortgage
export async function getMortgage(userId: string): Promise<Mortgage | null>{
  const docRef = doc(db, mortgageCollection, userId);
  const docSnap = await getDoc(docRef);

  return ((docSnap.exists())) ? docSnap.data() as Mortgage : null;
}
