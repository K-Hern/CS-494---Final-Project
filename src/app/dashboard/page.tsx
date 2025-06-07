'use client';
import { Budget } from "@/types/budget";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useUserContext } from "@/app/context/userContext";
import BudgetCardList from "@/components/budgetCardList";
import BudgetsSummaryCard from "@/components/budgetsSummaryCard";
import { UserInfo } from "@/types/userInfo";
import { Button, Container, Box, Typography, Alert, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUserContext();
  return(
    <Container maxWidth="md" sx={{ mt: 6 }}>
      {(user) ?
        <Dashboard user={user}/>
      :
        <Typography variant="h5" color="text.secondary" align="center" sx={{ mt: 8 }}>
          This feature is only available to signed in users
        </Typography>
      } 
    </Container>
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
  
  return (
    <Box>
      {userInfo ?
        <Stack spacing={4}>
          {userInfo.income === 0 && (
            <Alert severity="warning">
              Your Income Has Not yet Been Set,&nbsp;
              <a href="/profile" style={{ color: "#1976d2", textDecoration: "underline" }}>Complete Your Profile</a>
            </Alert>
          )}
          {budgets.length === 0 ? (
            <Box textAlign="center" mt={6}>
              <Typography variant="h4" gutterBottom>No Budgets Yet</Typography>
              <Button onClick={() => router.push(`/create/budget`)} variant="contained" color="info">
                Create
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                My Budgets
              </Typography>
              <Stack spacing={3} mb={4}>
                {budgets.map((budget, index) =>
                  budget.active ? (
                    <BudgetsSummaryCard key={index} budget={budget} income={userInfo.income} />
                  ) : null
                )}
              </Stack>
              <BudgetCardList budgets={budgets} />
            </Box>
          )}
        </Stack>
      :
        <Typography variant="h5" color="text.secondary" align="center" sx={{ mt: 8 }}>
          Loading...
        </Typography>
      }
    </Box>
  );
}