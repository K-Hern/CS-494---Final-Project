'use client';
import { Budget } from '@/types/budget';
import { Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const budgetId = searchParams.get('budgetId');
  const [budget, setBudget] = useState<Budget>()

  useEffect(()=>{
    if (budgetId) {
      fetch(`/api/budget?budgetId=${budgetId}`)
        .then(res => res.json())
        .then(data => setBudget(data))
    } else {
      console.log(`BudgetId was undefined`)
    }
  }, [])

  function toggleActiveBudget(){
    if (budget){
      setBudget(budget => budget ? { ...budget, active: !budget.active } : budget)
      fetch('/api/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...budget, active: !budget.active }),
      })
    }
  }

  return (
    <div>
      {(budget) ?
      <>
        <h1>{budget.name}</h1>
        <h2>{budget.description}</h2>
        {Object.entries(budget)
          .map(([key, value]) => 
            !['name', 'description', 'userId', 'id', 'active'].includes(key)
              ? <h2 key={key}>{`${key}: ${String(value)}`}</h2>
              : null
          )
        }
        <Button onClick={toggleActiveBudget} variant="contained" sx={{ margin: 1 }} color="primary">
          {(budget.active)? "Deactivate Budget" : "Activate Budget"}
        </Button>
        <Button onClick={()=>router.push(`/create/budget?budgetId=${budget.id}`)} variant="contained" sx={{ margin: 1 }} color="primary">
          Edit
        </Button>
        <Button onClick={()=>router.back()} variant="contained" sx={{ margin: 1 }} color="primary">
          Back
        </Button>
      </> 
      : 
      "Loading..." 
      }
      
    </div>
  );
}