'use client';

import { useUserContext } from "@/app/context/userContext";
import { User } from "firebase/auth";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Budget } from "@/types/budget";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const user = useUserContext();
  const searchParams = useSearchParams();
  const budgetId = searchParams.get('budgetId');
  return(
    <div>
      {(user) ?
        <CreateBudget user={user} budgetId={budgetId}/>
      :
        <h1>This feature is only available to signed in users</h1>
      } 
    </div>
  );
}

export function CreateBudget(props: {user: User, budgetId: string | null}) {
  const router = useRouter();
  const input_styling = { padding: '3px', margin: '2px' }
  const [budget, setBudget] = useState<Budget>({
    id: undefined,
    userId: props.user.uid,
    description: "",
    name: "",
    food: 0,
    housing: 0,
    retirement: 0,
    transportation: 0,
    entertainment: 0,
    education: 0,
    savings: 0,
    miscellaneous: 0,
    active: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setBudget((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/budget", {
      method: "POST",
      body: JSON.stringify(budget),
    });
    router.push("/dashboard");
  }

  useEffect(()=>{
    (props.budgetId) ? budgetInit(): null
  }, [])

  async function budgetInit(){
    const res = await fetch(`/api/budget?budgetId=${props.budgetId}`);
    const data = await res.json();
    setBudget(data);
  }
    
  return(
    <div>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl>
          {
            Object.entries(budget).map(([key, value]) =>
              (!['active', 'id', 'userId'].includes(key)) ?
                <TextField
                  key={key}
                  variant="outlined"
                  sx={input_styling}
                  id={`${key}-Input`}
                  name={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)} // Insane that we have to do all this just to capitalize
                  type={typeof value}
                  value={value}
                  onChange={handleChange}
                />
              :
                null
            )
          }
          <Button type="submit" variant="contained" sx={{ margin: 1 }} color="info">
            Save
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}
