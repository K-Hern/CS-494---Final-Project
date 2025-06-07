'use client';
import { Budget } from '@/types/budget';
import { Button, Card, CardContent, Typography, Box, Chip, Grid } from '@mui/material';
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

  function deleteBudget(){
    if (budget){
      setBudget(budget => budget ? { ...budget, active: !budget.active } : budget)
      fetch(`/api/budget?budgetId=${budget.id}`, {method: 'DELETE'})
    }
    router.push('/dashboard')
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      {(budget) ? (
        <Card sx={{ minWidth: 400, maxWidth: 600, boxShadow: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h4" component="div">
              {budget.name}
              </Typography>
              <Chip
              label={budget.active ? "Active" : "Inactive"}
              variant="filled"
              sx={{
                backgroundColor: budget.active ? '#4caf50' : '#bdbdbd',
                color: '#fff',
                fontWeight: 600,
              }}
              />
            </Box>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {budget.description}
            </Typography>
            <Box mt={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Expenses:
            </Typography>
              <Grid container spacing={2}>
                {Object.entries(budget)
                  .filter(([key]) => !['name', 'description', 'userId', 'id', 'active'].includes(key))
                  .map(([key, value]) => (
                    <Grid key={key}>
                      <Typography variant="body1" color="text.secondary">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </Typography>
                      <Typography variant="h6" color="text.primary">
                        ${value}
                      </Typography>
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button onClick={toggleActiveBudget} variant="contained" color={budget.active ? "warning" : "success"}>
                {budget.active ? "Deactivate Budget" : "Activate Budget"}
              </Button>
              <Button onClick={() => router.push(`/create/budget?budgetId=${budget.id}`)} variant="contained" color="info">
                Edit
              </Button>
              <Button onClick={deleteBudget} variant="contained" color="error">
                Delete
              </Button>
              <Button onClick={() => router.back()} variant="contained" color="secondary">
                Back
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h5" color="text.secondary">Loading...</Typography>
      )}
    </Box>
  );
}