import React from "react";
import { makeStyles } from "@material-ui/core/styles/index";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Container
} from "@material-ui/core";
import AdapterLink from "../nav/AdapterLink";
import { Link } from "react-router-dom";

const useStyles = makeStyles({});

console.log(process.env.REACT_APP_SLACK_CLIENT_ID);

const SignIn = () => {
  return (
    <Container
      maxWidth={"xs"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
        padding: "0px 20px"
      }}
    >
      <Typography variant={"h5"} style={{ marginBottom: 20 }} align={"center"}>
        Sign In
      </Typography>
      <a href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=508509281558.675161543139&&state=skoosh&redirect_uri=http://localhost:3000/auth-redirect&state=skoosh">
        <img src="https://api.slack.com/img/sign_in_with_slack.png" />
      </a>

      <Button
        href={process.env.REACT_APP_GROUPME_AUTH}
        variant={"outlined"}
        style={{
          margin: "30px 0px 10px 0px",
          backgroundColor: "#00aff0",
          color: "#fff",
          border: "1px solid #00aff0",
          marginTop: 20
        }}
      >
        <img
          src={"https://moviemedium-assets.s3.amazonaws.com/groupme_icon.png"}
          width={30}
          style={{ marginRight: 5 }}
        />{" "}
        Sign in with GroupMe
      </Button>

      <Typography
        variant={"caption"}
        align={"center"}
        style={{ marginTop: 40, color: "#a4a4a4" }}
      >
        By playing Movie Medium and using the related social platform stuff, you
        agree to our <Link to={"/terms"}>Terms of Service</Link> and{" "}
        <Link to={"/privacy"}>Privacy Policy</Link>.
      </Typography>
    </Container>
  );
};

export default SignIn;
