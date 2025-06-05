'use client';

import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";

import Link from "next/link";

import { googleSignIn, logOut, useUserContext } from "@/app/context/userContext";

export default function NavBar() {
  const user = useUserContext();

  function handleLogout() {
    logOut();
  }

  function handleGoogleLogin() {
    googleSignIn();
  }

  return (
    <AppBar position="static" sx={{backgroundColor: 'grey'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>BudgetMe</Typography>
        {(user) ? 
          <Link href={'/dashboard'} style={{textDecoration: 'none'}}>
            <Button variant={"contained"} sx={{margin: 1}} color={"info"}>
              Dashboard
            </Button>
          </Link>
        :
          <Link href={'/'} style={{textDecoration: 'none'}}>
            <Button variant={"contained"} sx={{margin: 1}} color={"info"}>
              Home
            </Button>
          </Link>
        }
        {(user) ? 
          <Button variant={"contained"} sx={{margin: 1}} color={"info"} onClick={handleLogout}>
            Log Out
          </Button>
        :
          <Link href={'/dashboard'} style={{textDecoration: 'none'}} onClick={handleGoogleLogin}>
            <Button variant={"contained"} sx={{margin: 1}} color={"info"}>
              Log in
            </Button>
          </Link>
        }
        {(user) ? 
          <Link href={'/profile'} style={{textDecoration: 'none'}}>
            <Avatar alt="Profile Image" src={user.photoURL || ''} />
          </Link>
        :
          <div></div>
        }
      </Toolbar>
    </AppBar>
  );
}