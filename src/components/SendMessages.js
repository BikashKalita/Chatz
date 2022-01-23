import { Paper, Typography, styled, Fade } from "@mui/material";

const SendMessages = (props) => {
  const { text } = props.chat;
  return (
    <StyleDiv>
      <Fade
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Paper
          elevation={5}
          sx={{
            borderRadius: 4,
            borderTopRightRadius: 0.5,
            p: 1,
            ml: 1,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="body2" textAlign="right">
            {text}
          </Typography>

          {/* <Typography variant="overline" align="right" textAlign="right">
            Just Now
          </Typography> */}
        </Paper>
        {/* <Avatar
        alt="Remy Sharp"
        src="https://mui.com/static/images/avatar/4.jpg"
      /> */}
      </Fade>
    </StyleDiv>
  );
};

const StyleDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "right",
  marginBottom: theme.spacing(2),
}));

export default SendMessages;
