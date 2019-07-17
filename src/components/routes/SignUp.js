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
  useEffect(() => {
    startCreatingGroup();
  }, []);
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
      <Typography variant={"h5"}>Sign up with</Typography>
      <img
        src={"https://moviemedium-assets.s3.amazonaws.com/groupme_logo.png"}
        width={150}
      />
      <Typography
        variant={"caption"}
        align={"center"}
        style={{ marginTop: 10, color: "#a4a4a4" }}
      >
        By creating your new Movie Medium Group and the linked GroupMe chat, you
        agree to our <Link to={"/terms"}>Terms of Service</Link> and{" "}
        <Link to={"/privacy"}>Privacy Policy</Link>.
      </Typography>

      <Button
        href={process.env.REACT_APP_GROUPME_AUTH}
        variant={"contained"}
        color={"secondary"}
        style={{ margin: "20px 0px 10px 0px" }}
      >
        Create group and start playing
      </Button>

      <Typography style={{ marginTop: 30 }}>
        <strong>Slack Integration coming soon!</strong>
      </Typography>

      {/*<Typography*/}
      {/*variant={"caption"}*/}
      {/*color={"textSecondary"}*/}
      {/*style={{*/}
      {/*padding: " 10px 0px",*/}
      {/*borderTop: "1px solid #a4a4a4",*/}
      {/*fontStyle: "italic"*/}
      {/*}}*/}
      {/*>*/}
      {/*Currently, the only way to play the Movie Medium game is with a{" "}*/}
      {/*<a href={"https://groupme.com/en-US/"}>GroupMe (chat application)</a>{" "}*/}
      {/*account.*/}
      {/*<br /> <br />Why? To allow groups to play within GroupMe. Also because*/}
      {/*the makers are lazy and strapped for time.*/}
      {/*<br /> <br />If you don't have/like GroupMe, and want another way to*/}
      {/*play,{" "}*/}
      {/*<a href={"mailto:ryanjyost@gmail.com"}>*/}
      {/*shoot me (Ryan, maker of this thing) an email*/}
      {/*</a>. I will respond to you personally and make updates based on the*/}
      {/*most popular feedback.*/}
      {/*</Typography>*/}
      <Typography style={{ marginTop: 10 }}>
        Don't like GroupMe or Slack?
      </Typography>
      <Button
        href={"mailto:ryanjyost@gmail.com?subject=Movie Medium"}
        variant={"outlined"}
        color={"primary"}
        style={{ marginTop: 10 }}
      >
        Let me (Ryan) know
      </Button>
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
