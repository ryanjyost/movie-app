import React from "react";
import { Typography, Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

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
      <a
        href={`https://slack.com/oauth/authorize?scope=users:read&client_id=${
          process.env.REACT_APP_SLACK_CLIENT_ID
        }&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/auth-redirect`}
      >
        <img
          alt="Sign in with Slack"
          height="42"
          width="180"
          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
          srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
        />
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
        variant={"subtitle1"}
        align={"center"}
        style={{ marginTop: 20, color: "#333" }}
      >
        Not invited to a group yet? <Link to={"/sign-up"}>Sign Up</Link>
      </Typography>

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
