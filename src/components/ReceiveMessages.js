import { Paper, Typography, styled, Avatar, Fade } from "@mui/material";

const ReceiveMessages = (props) => {
  const { text, photoURL, displayName } = props.chat;
  // let normalDate = new Date(createAt.seconds * 1000).toDateString();

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
        {/* <Typography variant="overline" align="right" color="inherit">
          {normalDate}
        </Typography> */}
      </Paper>
    </StyleDiv>
  );
};

const StyleDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
}));

export default ReceiveMessages;
