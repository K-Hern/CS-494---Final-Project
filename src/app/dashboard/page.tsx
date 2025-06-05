'use client';

import { Budget } from "@/types/budget";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useUserContext } from "@/app/context/userContext";
import SelectActionCard from "@/components/budgetCard";
import CardInvertedColors from "@/components/budgetsSummaryCard";
import BudgetsSummaryCard from "@/components/budgetsSummaryCard";

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
  const [budgets, setBudgets] = useState<Budget[]>([])

  useEffect(() => {
    getBudgetInit()
  }, [])

  async function getBudgetInit(){
    const res = await fetch(`/api/budget/all?userId=${props.user.uid}`);
    const data = await res.json();
    setBudgets(data as Budget[]);
    console.log(data)
  }
  // Half and half screen - left half summary card, right half budgets list
  return(
    <div>
      <BudgetsSummaryCard/>
      <SelectActionCard budgets={budgets}/>
    </div>
  );
}