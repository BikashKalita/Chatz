import { useState, useRef, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import ReceiveMessages from "./ReceiveMessages";
import SendMessages from "./SendMessages";

import { Container, TextField, Button, styled } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MChatRoom = () => {
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const messages = firestore.collection("chatMessages");
  const query = messages.orderBy("createAt");
  const [message] = useCollectionData(query, { idField: "id" });

  const [mtext, setmText] = useState("");

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (mtext === "") {
      return 0;
    }
    setmText("");
    const auth = firebase.auth();
    const { uid, photoURL, displayName } = auth.currentUser;
    await messages.add({
      text: mtext,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });

    endRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container
      sx={(theme) => ({
        pt: 10,
        bgcolor: "background.default",
        overflowY: "none",
        [theme.breakpoints.up("sm")]: {
          maxWidth: 480,
        },
      })}
      // sx={[
      //   {
      //     "&::-webkit-scrollbar": {
      //       width: "30px",
      //       height: "10px",
      //     },
      //   },
      // ]}
    >
      <MessageDiv>
        {message &&
          message.map((m) => {
            return m.uid === auth.currentUser.uid ? (
              <SendMessages key={m.id} chat={m} />
            ) : (
              <ReceiveMessages key={m.id} chat={m} />
            );
          })}
      </MessageDiv>
      <div ref={endRef} />
      <StyleForm onSubmit={sendMessageHandler}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="Enter Your Message"
          value={mtext}
          fullWidth
          sx={{ bgcolor: "background.default" }}
          onChange={(e) => setmText(e.target.value)}
        />
        <Button variant="contained" sx={{ p: 2 }} onClick={sendMessageHandler}>
          <SendIcon />
        </Button>
      </StyleForm>
    </Container>
  );
};

const StyleForm = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  position: "fixed",
  bottom: 0,
  right: 0,
  width: "100%",
  marginBottom: theme.spacing(0),
  [theme.breakpoints.up("sm")]: {
    maxWidth: 480,
    left: "50%",
    transform: "translate(-50%, 0)",
  },
}));

const MessageDiv = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    //todo
  },
}));

export default MChatRoom;
