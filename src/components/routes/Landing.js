import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Button,
  Container,
  AppBar,
  Toolbar,
  StepLabel,
  StepButton,
  Step,
  Link
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Actions } from "../../redux";
import PeopleIcon from "@material-ui/icons/People";
import MovieIcon from "@material-ui/icons/Movie";
import FunIcon from "@material-ui/icons/InsertEmoticon";
import AdapterLink from "../nav/AdapterLink";
import Loader from "../misc/Loader";

const useStyles = makeStyles(theme => {
  return {
    main: {
      minHeight: "100vh",
      width: "100%"
    },
    centerContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // justifyContent: "center",
      minHeight: "90vh",
      padding: "100px 40px 50px 40px",
      textAlign: "center"
    },
    title: {
      color: "rgba(0,0,0,0.8)",
      alignItems: "center",
      display: "flex",
      fontWeight: "bold"
    },
    icon: {
      color: theme.palette.secondary.main,
      fontSize: 30
    },
    sectionTitle: {
      color: "rgba(0,0,0,0.7)"
    },
    sectionInfo: {
      color: "rgba(0,0,0,0.5)",
      marginBottom: 40
    },
    bottomLink: {
      margin: "0px 10px"
    }
  };
});

function Landing({ user, userId, userStatus }) {
  const classes = useStyles();
  if (!user && userId && !userStatus.fetchedUser) {
    return <Loader />;
  }

  if (user) {
    return <Redirect to={"/app"} />;
  }

  return (
    <div className={classes.main}>
      <Toolbar
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="body1" className={classes.title}>
          <img
            src="/mm_logo_round_red.png"
            width={24}
            style={{ marginRight: 6 }}
          />

          {"Movie Medium"}
        </Typography>
        <Button
          size={"large"}
          component={AdapterLink}
          style={{ padding: "8px 0px", color: "rgba(0,0,0,0.5)" }}
          to={"/sign-in"}
        >
          <strong>Sign In</strong>
        </Button>
      </Toolbar>

      <Container maxWidth={"sm"} className={classes.centerContainer}>
        <Typography
          style={{ marginBottom: 30 }}
          color={"primary"}
          variant={"h5"}
        >
          <strong>Predict Rotten Tomatoes Scores with friends</strong>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size={"large"}
          component={AdapterLink}
          to={"/sign-up"}
        >
          <strong>Start Playing</strong>
        </Button>
        <Typography
          variant={"caption"}
          style={{
            textAlign: "center",
            paddingTop: 20,
            color: "rgba(0,0,0,0.3)"
          }}
        >
          Not endorsed by{" "}
          <a
            style={{ color: "rgba(0,0,0,0.3)" }}
            href="https://www.rottentomatoes.com/"
          >
            Rotten Tomatoes®
          </a>
        </Typography>

        <Typography style={{ marginTop: 100, marginBottom: 30 }} variant={"h5"}>
          <strong>How it works</strong>
        </Typography>
        <PeopleIcon className={classes.icon} />
        <Typography variant={"h6"} className={classes.sectionTitle}>
          Sign Up
        </Typography>
        <Typography className={classes.sectionInfo}>
          Create a group and play with friends. Groups are linked to GroupMe
          chats.
        </Typography>

        <MovieIcon className={classes.icon} />
        <Typography variant={"h6"} className={classes.sectionTitle}>
          Make Predictions
        </Typography>
        <Typography className={classes.sectionInfo}>
          Watch trailers of upcoming movies and make your best guess for what
          the Rotten Tomatoes score will be.
        </Typography>

        <FunIcon className={classes.icon} />
        <Typography variant={"h6"} className={classes.sectionTitle}>
          Have fun
        </Typography>
        <Typography className={classes.sectionInfo}>
          See the latest trailers, debate RT scores, and taste sweet victory
          when you make an exact prediction.
        </Typography>

        <div style={{ marginTop: 50 }}>
          <Link
            component={AdapterLink}
            to={"/privacy"}
            className={classes.bottomLink}
          >
            Privacy Policy
          </Link>
          <Link
            component={AdapterLink}
            to={"/terms"}
            className={classes.bottomLink}
          >
            Terms of Use
          </Link>
          <Typography variant={"subtitle1"} color={"textSecondary"}>
            All Rights Reserved. 2019 Movie Medium{" "}
          </Typography>
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    userId: state.user.userId,
    userStatus: state.user.status
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
