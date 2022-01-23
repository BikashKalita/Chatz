import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import MChatRoom from "./components/ChatRoom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
});
const auth = firebase.auth();

function App() {
  const [isDark, setDark] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });
  const [user] = useAuthState(auth);
  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar user={user} isDark={isDark} setDark={setDark} />
      {user ? <MChatRoom /> : <Signup />}
    </ThemeProvider>
  );
}

export default App;
