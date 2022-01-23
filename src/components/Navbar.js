import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import {
  AppBar,
  Typography,
  Avatar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Navbar = (props) => {
  const auth = firebase.auth();
  // const [user] = useAuthState(auth);
  // console.log(auth);
  const user = props.user;
  // const setTheme = props.setTheme;
  const signinHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  const signOutHandler = () => {
    auth.signOut(auth);
  };
  const [anchorOpen, setanchorOpen] = useState(null);
  const anchorRef = (e) => {
    setanchorOpen(e.currentTarget);
  };
  const closeAnchor = () => {
    setanchorOpen("");
  };

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        [theme.breakpoints.up("sm")]: {
          maxWidth: 480,
          left: "50%",
          transform: "translate(-50%, 0)",
        },
      })}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Chatz</Typography>
        <div></div>

        {user ? (
          <div>
            <IconButton
              color="inherit"
              onClick={() => props.setDark(!props.isDark)}
              sx={{ mr: 2 }}
            >
              {props.isDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton onClick={anchorRef} key="avatar">
              <Avatar src={user.photoURL} alt={user.displayName} sx={{}} />
            </IconButton>
            <Menu
              // sx={{ mt: 5 }}
              id="menu-appbar"
              anchorEl={anchorOpen}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorOpen)}
              onClose={closeAnchor}
            >
              <MenuItem key="logout" onClick={signOutHandler}>
                LogOut
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="inherit" variant="div" onClick={signinHandler}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
