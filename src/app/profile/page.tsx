'use client';
import { useUserContext } from "@/app/context/userContext";
import { UserInfo } from "@/types/userInfo";
import { Avatar, Box, Button, FormControl, TextField } from "@mui/material";
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
  const input_styling = { padding: '3px', margin: '2px' };

  useEffect(() => {
    initUserInfo();
  }, []);

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
    <div style={{ padding: 20 }}>
      <Avatar
        alt="Profile Image"
        src={props.user.photoURL || ""}
        sx={{ width: 200, height: 200 }}
      />
      <h1>{props.user.displayName}</h1>
      <h1>{props.user.email}</h1>
      {editMode ?
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl>
            <TextField variant="outlined" sx={input_styling} id="Occupation-Input" label="Occupation" name="occupation" value={userInfo.occupation} onChange={handleChange} />
            <TextField variant="outlined" sx={input_styling} id="Organization-Input" label="Organization" name="organization" value={userInfo.organization} onChange={handleChange} />
            <TextField variant="outlined" sx={input_styling} id="Income-Input" label="Income" name="income" value={userInfo.income} onChange={handleChange} />

            <Button type="submit" variant={"contained"} sx={{ margin: 1 }} color={"info"}>Save</Button>
            <Button variant={"contained"} sx={{ margin: 1 }} color={"info"} onClick={() => toggleEditMode(prev => !prev)}>
              Cancel
            </Button>
          </FormControl>
        </Box>
        :
        <div>
          <h1>Occupation: {userInfo.occupation ? userInfo.occupation : empty_val}</h1>
          <h1>Organization: {userInfo.organization ? userInfo.organization : empty_val}</h1>
          <h1>Income: {userInfo.income}</h1>
          <Button variant={"contained"} sx={{ margin: 1 }} color={"info"} onClick={() => toggleEditMode(prev => !prev)}>
            Edit Profile
          </Button>
        </div>
      }
    </div>
  );
}

export default function Home() {
  const user = useUserContext();

  return (
    <div>
      {user ? <ProfileDetails user={user} /> : <h1>You are currently not logged in, Log in to view your profile details</h1>}
    </div>
  );
}
