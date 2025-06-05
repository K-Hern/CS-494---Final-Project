'use client';
import { useUserContext} from "@/app/context/userContext";
import { getUserInfo, updateUserInfo } from "@/services/firestore";
import { UserInfo } from "@/types/userInfo";
import { Avatar, Box, Button, FormControl, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

export default function Home() {
  const user = useUserContext();
  const [editMode, toggleEditMode] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    uid : "",
    occupation : "",
    organization : "",
    linkedIn : "",
    gitHub : ""
  });
  const empty_val: string = "None Provided";
  const banana : string = 'https://www.dole.com/sites/default/files/styles/1024w768h-80/public/media/2025-01/banana-cavendish_0.png?itok=xIgYOIE_-9FKLRtCr'
  const input_styling = { padding: '3px', margin: '2px' }

  useEffect(()=>{
    initUserInfo();
  },[user])

  async function initUserInfo(){
    if (user) {
      const user_info = await getUserInfo(user.uid)
      setUserInfo(user_info);
    }
  }

  function handleOccupation(e: ChangeEvent<HTMLInputElement>){
    setUserInfo(prev => (
        {
          ...prev,
          occupation: e.target.value
        }
      )
    );
  }

  function handleOrganization(e: ChangeEvent<HTMLInputElement>){
    setUserInfo(prev => (
        {
          ...prev,
          organization: e.target.value
        }
      )
    );
  }

  function handleLinkedIn(e: ChangeEvent<HTMLInputElement>){
    setUserInfo(prev => (
        {
          ...prev,
          linkedIn: e.target.value
        }
      )
    );
  }

  function handleGitHub(e: ChangeEvent<HTMLInputElement>){
    setUserInfo(prev => (
        {
          ...prev,
          gitHub: e.target.value
        }
      )
    );
  }
  
  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    toggleEditMode(prev => !prev);
    updateUserInfo(userInfo);
  }
    
  return(
    <div>
      {(user) ?
        <div style={{padding: 20}}>
          <Avatar
            alt="Profile Image"
            src={user.photoURL || banana}
            sx={{ width: 200, height: 200}}
          />
          <h1>{user.displayName}</h1>
          <h1>{user.email}</h1>
          {(editMode) ? 
            <Box component="form" onSubmit={handleSubmit}>
              <FormControl>
                <TextField variant="outlined" sx={input_styling} id="Occupation-Input" label="Occupation" value={userInfo.occupation} onChange={handleOccupation}/>
                <TextField variant="outlined" sx={input_styling} id="Organization-Input" label="Organization" value={userInfo.organization} onChange={handleOrganization}/>
                <TextField variant="outlined" sx={input_styling} id="LinkedIn-Input" label="LinkedIn" value={userInfo.linkedIn} onChange={handleLinkedIn}/>
                <TextField variant="outlined" sx={input_styling} id="GitHub-Input" label="GitHub" value={userInfo.gitHub} onChange={handleGitHub}/>
                <Button type="submit" variant={"contained"} sx={{margin: 1}} color={"info"}>Save</Button>
                <Button variant={"contained"} sx={{margin: 1}} color={"info"} onClick={() => toggleEditMode(prev => !prev)}>
                  Cancel
                </Button>
              </FormControl>
            </Box>
          :
            <div>
              <h1>Occupation: {(userInfo.occupation) ? userInfo.occupation : empty_val}</h1>
              <h1>Organization: {(userInfo.organization) ? userInfo.organization : empty_val}</h1>
              <h1>LinkedIn: {(userInfo.linkedIn) ? <a href={userInfo.linkedIn}>{userInfo.linkedIn}</a> : empty_val}</h1>
              <h1>GitHub: {(userInfo.gitHub) ? <a href={userInfo.gitHub}>{userInfo.gitHub}</a> : empty_val}</h1>
              <Button variant={"contained"} sx={{margin: 1}} color={"info"} onClick={() => toggleEditMode(prev => !prev)}>
                Edit Profile
              </Button>
            </div>
          }
        </div>
        :
        <h1>You are currently not logged in, Log in to view your profile details</h1>
      }
    </div>
  );
}
