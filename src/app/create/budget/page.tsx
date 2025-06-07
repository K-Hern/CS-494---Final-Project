'use client';
import { useUserContext } from "@/app/context/userContext";
import { User } from "firebase/auth";
import { Box, Button, FormControl, TextField, Paper, Typography, Stack } from "@mui/material";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { Budget } from "@/types/budget";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

export default function Home() {
  return (
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <CreatePageContent />
    </Suspense>
  );
}

function CreatePageContent() {
  const user = useUserContext();
  const searchParams = useSearchParams();
  const budgetId = searchParams.get('budgetId');
  return(
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f6fa' }}>
      {(user) ?
        <CreateBudget user={user} budgetId={budgetId}/>
      :
        <Typography variant="h5" color="text.secondary" align="center">
          This feature is only available to signed in users
        </Typography>
      } 
    </Box>
  );
}

function CreateBudget(props: {user: User, budgetId: string | null}) {
  const router = useRouter();
  const [budget, setBudget] = useState<Budget>({
    id: undefined,
    userId: props.user.uid,
    name: "",
    description: "",
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
      [e.target.name]: (e.target.type) == 'number' ? Number(e.target.value) : e.target.value,
    }));
  };
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget),
    });
    router.push("/dashboard");
  }

  async function budgetInit(){
    const res = await fetch(`/api/budget?budgetId=${props.budgetId}`);
    const data = await res.json();
    setBudget(data);
  }

  useEffect(()=>{
    if (props.budgetId){
      budgetInit()
    }
  })
    
  return(
    <Paper elevation={4} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
      <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 600 }}>
        {props.budgetId ? "Edit Budget" : "Create Budget"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <Stack spacing={2}>
            {
              Object.entries(budget).map(([key, value]) =>
                (!['active', 'id', 'userId'].includes(key)) ?
                  <TextField
                    key={key}
                    variant="outlined"
                    id={`${key}-Input`}
                    name={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    type={typeof value === "number" ? "number" : "text"}
                    value={value}
                    onChange={handleChange}
                    fullWidth
                  />
                :
                  null
              )
            }
            <Button type="submit" variant="contained" color="info" size="large" sx={{ mt: 2 }}>
              Save
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </Paper>
  );
}