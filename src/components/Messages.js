//TODO

import { Paper, Typography, styled, Avatar, Fade } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
const Messages = (props) => {
  const { uid, photoURL, displayName } = auth.currentUser;
  const { text, createTime, photoURL, displayName } = props.chat;
  return (
    <StyleDiv>
      <Fade
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Avatar alt={displayName} src={photoURL} />
      </Fade>
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          borderTopLeftRadius: 0.5,
          p: 1,
          ml: 1,
        }}
      >
        <Typography variant="body2">{text}</Typography>
        <Typography variant="overline" align="right" color="inherit">
          {createTime}
        </Typography>
      </Paper>
    </StyleDiv>
  );
};

const StyleDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
}));

export default Messages;
