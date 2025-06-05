'use client';

import { useUserContext } from "@/app/context/userContext";
import { User } from "firebase/auth";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Budget } from "@/types/budget";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUserContext();
  return(
    <div>
      {(user) ?
        <CreateBudget user={user} />
      :
        <h1>This feature is only available to signed in users</h1>
      } 
    </div>
  );
}

export function CreateBudget(props: {user: User}) {
  const router = useRouter();
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
  });
  
  const input_styling = { padding: '3px', margin: '2px' }

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
    
  return(
    <div>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            variant="outlined"
            sx={input_styling}
            id="name-Input"
            name="name"
            label="Name"
            type="string"
            value={budget.name}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            sx={input_styling}
            id="name-Input"
            name="description"
            label="Description"
            type="string"
            value={budget.description}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            sx={input_styling}
            id="Food-Input"
            name="food"
            label="Food"
            type="number"
            value={budget.food}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            sx={input_styling}
            id="Housing-Input"
            name="housing"
            label="Housing"
            type="number"
            value={budget.housing}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            sx={input_styling}
            id="Retirement-Input"
            name="retirement"
            label="Retirement"
            type="number"
            value={budget.retirement}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            sx={input_styling}
            id="Transportation-Input"
            name="transportation"
            label="Transportation"
            type="number"
            value={budget.transportation}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            sx={input_styling}
            id="Entertainment-Input"
            name="entertainment"
            label="Entertainment"
            type="number"
            value={budget.entertainment}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            sx={input_styling}
            id="Education-Input"
            name="education"
            label="Education"
            type="number"
            value={budget.education}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            sx={input_styling}
            id="Savings-Input"
            name="savings"
            label="Savings"
            type="number"
            value={budget.savings}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            sx={input_styling}
            id="Miscellaneous-Input"
            name="miscellaneous"
            label="Miscellaneous"
            type="number"
            value={budget.miscellaneous}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" sx={{ margin: 1 }} color="info">
            Save
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}
