
'use client';

import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { googleSignIn, logOut, useUserContext } from "@/app/context/userContext";
import { User } from "firebase/auth";

export default function NavBar() {
  const user = useUserContext();

  return (
    <AppBar position="static" sx={{backgroundColor: 'grey'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>BudgetMe</Typography>
        {user ? <NavBarLoggedIn user={user} /> : <NavBarLoggedOut />}
      </Toolbar>
    </AppBar>
  );
}

function NavBarLoggedIn( props : { user: User }) {
  function handleLogout() {
    logOut();
  }

  return (
    <>
      <Link href={'/create/budget'} style={{textDecoration: 'none'}}>
        <Button variant="contained" sx={{margin: 1}} color="info">
          Create
        </Button>
      </Link>
      <Link href={'/dashboard'} style={{textDecoration: 'none'}}>
        <Button variant="contained" sx={{margin: 1}} color="info">
          Dashboard
        </Button>
      </Link>
      <Button variant="contained" sx={{margin: 1}} color="info" onClick={handleLogout}>
        Log Out
      </Button>
      <Link href={'/profile'} style={{textDecoration: 'none'}}>
        <Avatar alt="Profile Image" src={props.user.photoURL || ''} />
      </Link>
    </>
  );
}

function NavBarLoggedOut() {
  function handleGoogleLogin() {
    googleSignIn();
  }

  return (
    <>
      <Link href={'/'} style={{textDecoration: 'none'}}>
        <Button variant="contained" sx={{margin: 1}} color="info">
          Home
        </Button>
      </Link>
      <Link href={'/dashboard'} style={{textDecoration: 'none'}} onClick={handleGoogleLogin}>
        <Button variant="contained" sx={{margin: 1}} color="info">
          Log in
        </Button>
      </Link>
    </>
  );
}

