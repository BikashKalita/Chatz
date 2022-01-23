import React, { useEffect, useRef, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

// import "./App.css";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import MChatRoom from "./components/ChatRoom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

firebase.initializeApp({
  apiKey: "AIzaSyBVkaVYHYdmQP09octLlwxToDKlOiz6HjM",
  authDomain: "bkzreactchat.firebaseapp.com",
  projectId: "bkzreactchat",
  storageBucket: "bkzreactchat.appspot.com",
  messagingSenderId: "33261951868",
  appId: "1:33261951868:web:973be83958f784efef22f9",
  measurementId: "G-DS07KZYTMG",
});
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  // const [theme, setTheme] = useEffect(true);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [user] = useAuthState(auth);
  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar user={user} />
      {user ? <MChatRoom /> : <Signup />}
    </ThemeProvider>
  );
}

// function App() {
//   const [user] = useAuthState(auth);
//   return (
//     <div className="App">
//       <header>
//       <h1>BKz💬</h1>
//         <SignOut />
//       </header>
//       <section>{user ? <MChatRoom /> : <SignIn />}</section>
//     </div>
//   );
// }

function SignIn() {
  const signinHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signinHandler}>SigIn in with Google</button>;
}

function SignOut() {
  return <button onClick={() => auth.signOut}>Sign Out</button>;
}

function ChatRoom() {
  const dummy = useRef();
  const messages = firestore.collection("chatMessages");
  const query = messages.orderBy("createAt").limit(25);
  const [message] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const sendHandler = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    await messages.add({
      text: formValue,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <main>
        {message &&
          message.map((msg) => <ChatMessage key={msg.id} chat={msg} />)}
        <div ref={dummy}></div>
      </main>
      <form>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" onClick={sendHandler}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL, displayName } = props.chat;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "recived";
  return (
    <div className={`message ${messageClass}`}>
      <img
        src={
          photoURL ||
          `https://avatars.dicebear.com/api/initials/${displayName}.svg`
        }
        alt="profile"
      />
      <p>{text}</p>
    </div>
  );
}

export default App;
