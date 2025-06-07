'use client';

import { Budget } from "@/types/budget";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useUserContext } from "@/app/context/userContext";
import BudgetCardList from "@/components/budgetCardList";
import BudgetsSummaryCard from "@/components/budgetsSummaryCard";
import { UserInfo } from "@/types/userInfo";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUserContext();
  return(
    <div>
      {(user) ?
        <Dashboard user={user}/>
      :
        <h1>This feature is only available to signed in users</h1>
      } 
    </div>
  );
}

function Dashboard(props: {user: User}){
  const router = useRouter();
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    getBudgetInit()
    getUserInfo()
  }, [])

  async function getBudgetInit(){
    const res = await fetch(`/api/budget/all?userId=${props.user.uid}`);
    const data = await res.json();
    setBudgets(data as Budget[]);
  }
  async function getUserInfo(){
    const res = await fetch(`/api/users?userId=${props.user.uid}`);
    const data = await res.json();
    setUserInfo(data as UserInfo);
  }

  // Half and half screen - left half summary card, right half budgets list
  return (
    <div>
      {userInfo ?
        <>
          {userInfo.income === 0 ? (<h1>Your Income Has Not yet Been Set, <a href={`/profile`}>Complete Your Profile</a></h1>) : null}
          {budgets.length === 0 ? (
            <>
              <h1>No Budgets Yet</h1>
              <Button onClick={() => router.push(`/create/budget`)} variant="contained" sx={{ margin: 1 }} color="info">
                Create
              </Button>
            </>
          ) : (
            <>
              <h1>My Budgets</h1>
              {budgets.map((budget, index) =>
                budget.active ? (
                  <BudgetsSummaryCard key={index} budget={budget} income={userInfo.income} />
                ) : null
              )}
              <BudgetCardList budgets={budgets} />
            </>
          )}
        </>
      :
        <h1>Loading...</h1>
      }
    </div>
  );
}