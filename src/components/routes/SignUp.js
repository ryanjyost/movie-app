import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles/index";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Container
} from "@material-ui/core";
import AdapterLink from "../nav/AdapterLink";
import { Actions } from "../../redux";

const useStyles = makeStyles({});

const SignUp = ({ startCreatingGroup }) => {
  // useEffect(() => {
  //   startCreatingGroup();
  // }, []);
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
      <Typography variant={"h5"} style={{ marginBottom: 30 }} gutterBottom>
        Sign Up
      </Typography>
      <a href="https://slack.com/oauth/authorize?scope=channels:write,bot,channels:read,groups:read,chat:write:bot,commands&client_id=508509281558.675161543139&&state=skoosh&redirect_uri=http://localhost:3000/auth-redirect&state=mmSignIn">
        <img
          alt="Add to Slack"
          height="40"
          width="139"
          src="https://platform.slack-edge.com/img/add_to_slack.png"
          srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
        />
      </a>
      <Button
        href={process.env.REACT_APP_GROUPME_AUTH}
        variant={"outlined"}
        // color={"primary"}
        style={{
          margin: "30px 0px 10px 0px",
          backgroundColor: "#00aff0",
          color: "#fff",
          border: "1px solid #00aff0",
          marginTop: 20,
          textTransform: "none"
        }}
      >
        <img
          src={"https://moviemedium-assets.s3.amazonaws.com/groupme_icon.png"}
          width={30}
          style={{ marginRight: 5 }}
        />{" "}
        Play in GroupMe
      </Button>

      <Typography
        variant={"caption"}
        align={"center"}
        style={{ marginTop: 40, color: "#a4a4a4" }}
      >
        By creating your new Movie Medium Group and the related social platform
        stuff, you agree to our <Link to={"/terms"}>Terms of Service</Link> and{" "}
        <Link to={"/privacy"}>Privacy Policy</Link>.
      </Typography>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    accessToken: state.user.accessToken,
    status: state.user.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startCreatingGroup: () => dispatch(Actions.user.createGroup.request())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
