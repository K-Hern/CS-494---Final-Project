import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import { Budget } from '@/types/budget';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BudgetsSummaryCard(props: {budget: Budget, income: number}) {
  const [total, setTotal] = useState<number>(0)
  const router = useRouter()

  async function activateBudget(){
    props.budget.active = false
    await fetch('/api/budget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props.budget),
    });
    router.push('/dashboard')
  }

  function totalInit(){
    let expenses: number = 0;
    Object.entries(props.budget).forEach(([key, value]) => {
      if (!['id', 'userId', 'description', 'name', 'active'].includes(key)) {
        console.log(`Active Key: ${key}, value is of type: ${typeof(value)}`)
        if (typeof value === 'string') {
          value = parseFloat(value);
        }
        expenses += Number(value);
      }
    });

    setTotal(props.income - expenses);
  }

  useEffect(()=>{
    totalInit()
  },[])

  return (
    <Card variant="solid" sx={{backgroundColor: (total > 0) ? 'green' : 'red'}} invertedColors>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={100}>
          $
        </CircularProgress>
        <CardContent>
          <Typography level="body-md">{props.budget.name} - Net Status</Typography>
          <Typography level="h2">
            {(total < 0) ? `-$${Math.abs(total)}` : `$${total}`}
          </Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button variant="soft" size="sm" onClick={activateBudget}>
          Deactivate
        </Button>
        <Button variant="solid" size="sm" onClick={()=>router.push(`/budget?budgetId=${props.budget.id}`)}>
          Open
        </Button>
      </CardActions>
    </Card>
  );
}