'use client';
import { useUserContext } from "@/app/context/userContext";
import { UserInfo } from "@/types/userInfo";
import { Avatar, Box, Button, TextField, Paper, Typography, Stack } from "@mui/material";
import { User } from "firebase/auth";
import { FormEvent, useState, useEffect } from "react";

function ProfileDetails(props: { user: User }) {
  const [editMode, toggleEditMode] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    uid: props.user.uid,
    occupation: "",
    organization: "",
    income: 0
  });
  const empty_val: string = "None Provided";

  useEffect(() => {
    initUserInfo();
  });

  async function initUserInfo() {
    const res = await fetch(`/api/users?userId=${props.user.uid}`);
    const data = await res.json();
    setUserInfo(data as UserInfo);
  }

  async function updateUserInfo(user: UserInfo) {
    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toggleEditMode(prev => !prev);
    updateUserInfo(userInfo);
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: '#f5f6fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 6,
          maxWidth: 600,
          width: 1,
          borderRadius: 4,
          boxSizing: 'border-box',
          minHeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Stack spacing={4} alignItems="center" sx={{ width: '100%' }}>
          <Avatar
            alt="Profile Image"
            src={props.user.photoURL || ""}
            sx={{ width: 140, height: 140 }}
          />
          <Typography variant="h4" fontWeight={600}>{props.user.displayName}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{props.user.email}</Typography>
          {editMode ? (
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Stack spacing={3}>
                <TextField
                  variant="outlined"
                  id="Occupation-Input"
                  label="Occupation"
                  name="occupation"
                  value={userInfo.occupation}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  id="Organization-Input"
                  label="Organization"
                  name="organization"
                  value={userInfo.organization}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  id="Income-Input"
                  label="Income"
                  name="income"
                  value={userInfo.income}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                />
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button type="submit" variant="contained" color="info">Save</Button>
                  <Button variant="outlined" color="info" onClick={() => toggleEditMode(prev => !prev)}>
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ) : (
            <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
              <Typography variant="body1">
                <strong>Occupation:</strong> {userInfo.occupation ? userInfo.occupation : empty_val}
              </Typography>
              <Typography variant="body1">
                <strong>Organization:</strong> {userInfo.organization ? userInfo.organization : empty_val}
              </Typography>
              <Typography variant="body1">
                <strong>Income:</strong> ${userInfo.income}
              </Typography>
              <Button variant="contained" color="info" onClick={() => toggleEditMode(prev => !prev)}>
                Edit Profile
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default function Home() {
  const user = useUserContext();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: '#f5f6fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {user ? (
        <ProfileDetails user={user} />
      ) : (
        <Paper
          elevation={4}
          sx={{
            p: 6,
            maxWidth: 600,
            width: 1,
            borderRadius: 4,
            textAlign: 'center',
            minHeight: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h5">
            You are currently not logged in, Log in to view your profile details
          </Typography>
        </Paper>
      )}
    </Box>
  );
}