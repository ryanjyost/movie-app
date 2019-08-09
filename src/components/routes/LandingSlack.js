import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Button,
  Container,
  Toolbar,
  Link,
  Snackbar,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
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
    info: {
      color: "rgba(0,0,0,0.5)",
      marginBottom: 40
    },
    infoBold: {
      color: "rgba(0,0,0,0.8)",
      fontWeight: "bold",
      marginBottom: 0
    },
    bottomLink: {
      margin: "0px 10px"
    }
  };
});

function Landing({ user, userId, userStatus }) {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(
    "Something went wrong."
  );

  React.useEffect(() => {
    if (userStatus.error) {
      console.log(userStatus.error);
      setOpen(true);
      setErrorMessage(
        userStatus.error && userStatus.error.error
          ? userStatus.error.error
          : "Something went wrong"
      );
    }
  }, []);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  const classes = useStyles();
  if (!user && userId && !userStatus.fetchedUser) {
    return <Loader />;
  }

  if (user) {
    return <Redirect to={"/app/leaderboard/seasons"} />;
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
          <strong>
            Predict Rotten Tomatoes Scores against your coworkers in Slack
          </strong>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size={"large"}
          style={{ display: "flex", maxHeight: 44, paddingLeft: 10 }}
          // component={AdapterLink}
          href={`https://slack.com/oauth/authorize?scope=channels:write,bot,channels:read,groups:read,chat:write:bot,commands,users:read&client_id=${
            process.env.REACT_APP_SLACK_CLIENT_ID
          }&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/auth-redirect`}
        >
          <img
            src={"slack_logo.svg"}
            height={50}
            width={50}
            style={{ marginRight: 0 }}
          />{" "}
          <strong> Add to Slack</strong>
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
          <strong>TLDR</strong>
        </Typography>
        <PeopleIcon className={classes.icon} />
        <Typography variant={"h6"} className={classes.sectionTitle}>
          Install the Slack Bot
        </Typography>
        <Typography className={classes.sectionInfo}>
          Your workspace will get a new #movie_medium channel, with a welcome
          message that's got tips and your first movies to predict.
        </Typography>

        <MovieIcon className={classes.icon} />
        <Typography variant={"h6"} className={classes.sectionTitle}>
          Play the game
        </Typography>
        <Typography className={classes.sectionInfo}>
          Watch trailers of upcoming movies and make your predictions for what
          the Rotten Tomatoes scores will be - without ever leaving Slack{" "}
          <i style={{ color: "rgba(0,0,0,0.5)" }}>
            (though we've got a{" "}
            <a href={process.env.REACT_APP_CLIENT_URL}>web app</a> if that's
            more your style)
          </i>
        </Typography>

        <FunIcon className={classes.icon} />
        <Typography variant={"h6"} className={classes.sectionTitle}>
          Have fun
        </Typography>
        <Typography className={classes.sectionInfo}>
          Debate RT scores, see how close everyone's predictions were and taste
          sweet victory when you're the winner of a 5 movie season.
        </Typography>

        <div style={{ width: "100%" }}>
          <Typography
            style={{ marginTop: 60, marginBottom: 30, textAlign: "center" }}
            variant={"h5"}
          >
            <strong>How it works with Slack</strong>
          </Typography>
          <Typography className={classes.infoBold}>
            First, install the Slack app
          </Typography>
          <Typography className={classes.info}>
            You can do that with the big button at the top of this page.
          </Typography>

          <Typography className={classes.infoBold}>
            Movie Medium will create a new channel called #movie_medium
          </Typography>
          <Typography className={classes.info}>
            This is where you'll invite coworkers and play the game.
          </Typography>

          <Typography className={classes.infoBold}>
            Movie Medium will share a movie when it's open to predictions
          </Typography>
          <Typography className={classes.info}>
            You can watch the trailer, visit the Rotten Tomatoes page and make
            your prediction.
          </Typography>

          <Typography className={classes.infoBold}>
            There are several ways you can predict RT scores of movies
          </Typography>
          <Typography className={classes.info}>
            1. Click "Make your prediction" buttons on messages from Movie
            Medium. <br />2. Use the <strong>/predict</strong> command in the
            #movie_medium channel <br />3. Go to moviemedium.io
          </Typography>

          <Typography className={classes.infoBold}>
            Movie Medium will post game-related messages to #movie_medium
          </Typography>
          <Typography className={classes.info}>
            You and your coworkers will get messages about new movies, warnings
            when movies are close to being locked-in, the locked-in predictions
            of all players, results of movies that finally have an RT score and
            the winners of single movies and seasons.
          </Typography>

          <Typography className={classes.infoBold}>
            <Link component={AdapterLink} to={"/rules"}>
              Here are the rules of the game
            </Link>
          </Typography>
        </div>

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
          <a
            className={classes.bottomLink}
            href={"mailto:ryanjyost@gmail.com?subject=Movie Medium"}
          >
            Contact/Support
          </a>
          <Typography variant={"subtitle1"} color={"textSecondary"}>
            All Rights Reserved. 2019 Movie Medium . Property of Yost, LLC.
          </Typography>
        </div>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={errorMessage}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
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
