'use client';
import { AppBar, Avatar, Button, Toolbar, Typography, Stack } from "@mui/material";
import Link from "next/link";
import { googleSignIn, logOut, useUserContext } from "@/app/context/userContext";
import { User } from "firebase/auth";

export default function NavBar() {
  const user = useUserContext();

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg,rgb(61, 83, 104) 0%,rgb(46, 148, 231) 100%)', boxShadow: 3 }}>
      <Toolbar sx={{ minHeight: 72 }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
          BudgetMe
        </Typography>
        {user ? <NavBarLoggedIn user={user} /> : <NavBarLoggedOut />}
      </Toolbar>
    </AppBar>
  );
}

function NavBarLoggedIn({ user }: { user: User }) {
  function handleLogout() {
    logOut();
  }

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Link href="/create/budget" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="info"
            sx={{ fontWeight: 600, backgroundColor: 'rgb(61, 83, 104)', '&:hover': { backgroundColor: 'rgb(51, 70, 88)' } }}
          >
            Create
          </Button>
        </Link>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="info"
            sx={{ fontWeight: 600, backgroundColor: 'rgb(61, 83, 104)', '&:hover': { backgroundColor: 'rgb(51, 70, 88)' } }}
          >
            Dashboard
          </Button>
        </Link>
        <Button
          variant="contained"
          color="info"
          sx={{ fontWeight: 600, backgroundColor: 'rgb(61, 83, 104)', '&:hover': { backgroundColor: 'rgb(51, 70, 88)' } }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
        <Link href="/profile" style={{ textDecoration: 'none' }}>
          <Avatar
            alt="Profile Image"
            src={user.photoURL || ''}
            sx={{
              width: 40,
              height: 40,
              border: '2px solid #fff',
              ml: 1,
              boxShadow: 1,
              transition: '0.2s',
              '&:hover': { boxShadow: 4 }
            }}
          />
        </Link>
      </Stack>
    );
  }

  function NavBarLoggedOut() {
    function handleGoogleLogin() {
      googleSignIn();
    }

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="info"
            sx={{ fontWeight: 600, backgroundColor: 'rgb(61, 83, 104)', '&:hover': { backgroundColor: 'rgb(51, 70, 88)' } }}
          >
            Home
          </Button>
        </Link>
        <Button
          variant="contained"
          color="info"
          sx={{ fontWeight: 600, backgroundColor: 'rgb(61, 83, 104)', '&:hover': { backgroundColor: 'rgb(51, 70, 88)' } }}
          onClick={handleGoogleLogin}
        >
          Log in
        </Button>
      </Stack>
    );
  }

