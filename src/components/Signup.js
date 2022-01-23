import { Container, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import firebase from "firebase/compat/app";

const Signup = () => {
  const auth = firebase.auth();
  const signinHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <Container
      sx={(theme) => ({
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        [theme.breakpoints.up("sm")]: {
          maxWidth: 480,
        },
      })}
    >
      <Button
        variant="contained"
        size="large"
        startIcon={<GoogleIcon />}
        sx={{ p: 2 }}
        onClick={signinHandler}
      >
        Sign Up Via Google
      </Button>
    </Container>
  );
};

export default Signup;
