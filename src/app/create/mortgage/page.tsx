'use client';

import { useUserContext } from "@/app/context/userContext";
import { Mortgage } from "@/types/mortgage";
import { User } from "firebase/auth";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUserContext();
  return(
    <div>
      {(user) ?
        <MortgageCalculator user={user}/>
      :
        <h1>This feature is only available to signed in users</h1>
      } 
    </div>
  );
}

export function MortgageCalculator(props: {user: User}) {
  const router = useRouter();
  const [mortgage, setMortgage] = useState<Mortgage>({
    userId: props.user.uid,
    homePrice: "",
    downPayment: "",
    loanTerm: "",
    interestRate: "",
    monthlyPropertyTax: "",
    additionalMonthlyPayment: "",
    additionalYearlyPayment: "",
  });
  
  const input_styling = { padding: '3px', margin: '2px' }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setMortgage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    await fetch("/api/mortgage", {
      method: "POST",
      body: JSON.stringify(mortgage),
    });
    router.push("/dashboard");
  }
    
  return(
    <div>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl>
          <TextField variant="outlined" sx={input_styling} id="HomePrice-Input" name="homePrice" label="Home Price" value={mortgage.homePrice} onChange={handleChange}/>
          <TextField variant="outlined" sx={input_styling} id="DownPayment-Input" name="downPayment" label="Down Payment" value={mortgage.downPayment} onChange={handleChange}/>
          <TextField variant="outlined" sx={input_styling} id="LoanTerm-Input" name="loanTerm" label="Loan Term" value={mortgage.loanTerm} onChange={handleChange}/>
          <TextField variant="outlined" sx={input_styling} id="InterestRate-Input" name="interestRate" label="Interest Rate" value={mortgage.interestRate} onChange={handleChange}/>
          <TextField variant="outlined" sx={input_styling} id="MonthlyPropertyTax-Input" name="monthlyPropertyTax" label="Monthly Property Tax" value={mortgage.monthlyPropertyTax} onChange={handleChange}/>
          <TextField variant="outlined" sx={input_styling} id="AdditionalMonthlyPayment-Input" name="additionalMonthlyPayment" label="Additional Monthly Payment" value={mortgage.additionalMonthlyPayment} onChange={handleChange}/>
          <TextField variant="outlined" sx={input_styling} id="AdditionalYearlyPayment-Input" name="additionalYearlyPayment" label="Additional Yearly Payment" value={mortgage.additionalYearlyPayment} onChange={handleChange}/>
          <Button type="submit" variant={"contained"} sx={{margin: 1}} color={"info"}>
            Save
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}
