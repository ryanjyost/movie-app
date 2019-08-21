import React, { useEffect } from "react";
import { Follow } from "react-twitter-widgets";
import { Typography, Button, Card, CardContent } from "@material-ui/core";
import AddToHomeScreenButton from "../../misc/AddToHomeScreenButton";
import { makeStyles } from "@material-ui/core/styles/index";
import AdapterLink from "../../nav/AdapterLink";
import { Actions } from "../../../redux";
import { connect } from "react-redux";

const useStyles = makeStyles({
  card: {
    width: "100%",
    maxWidth: 500,
    marginBottom: 30
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    // padding: "40px 0px",
    // paddingBottom: "40px"
  },
  imgContainer: {
    width: 60,
    height: 80
  },
  twitter: {
    backgroundColor: "#1b95e0",
    border: "1px solid #1b95e0",
    color: "#fff"
  }
});

const Home = ({ currentUserOverall, getUserOverall, user }) => {
  const classes = useStyles();

  useEffect(() => {
    if (user) {
      getUserOverall(user._id);
    }
  }, []);

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {currentUserOverall && (
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography
              style={{ color: "rgba(0,0,0,0.5)", marginTop: 10 }}
              gutterBottom
            >
              Your average MM Metric
            </Typography>
            <strong>
              <Typography variant={"h4"} color={"secondary"}>
                <strong>{currentUserOverall.avgDiff}%</strong>
              </Typography>
            </strong>
            <Typography style={{ color: "rgba(0,0,0,0.5)" }} gutterBottom>
              based on {currentUserOverall.moviesInCalc} movies
            </Typography>
          </CardContent>
        </Card>
      )}
      <Card id={"addToHomeScreen"} className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant={"h6"} gutterBottom>
            Stay on top of your game
          </Typography>
          <AddToHomeScreenButton />
        </CardContent>
      </Card>

      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography style={{ marginBottom: 20 }}>
            Follow @movie_medium on the Twitters
          </Typography>
          <Button
            href={"https://twitter.com/movie_medium"}
            variant={"outlined"}
            className={`${classes.twitter} twitter-follow-button`}
            color={"secondary"}
          >
            Follow @movie_medium
          </Button>
        </CardContent>
      </Card>

      {/*<Card className={classes.card}>*/}
      {/*<CardContent className={classes.cardContent}>*/}
      {/*<Typography style={{ marginBottom: 20 }}>*/}
      {/*Have friends who'd want to play?*/}
      {/*</Typography>*/}
      {/*<Button*/}
      {/*component={AdapterLink}*/}
      {/*to={"/create-group"}*/}
      {/*variant={"outlined"}*/}
      {/*color={"secondary"}*/}
      {/*>*/}
      {/*Create a group*/}
      {/*</Button>*/}
      {/*</CardContent>*/}
      {/*</Card>*/}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    currentUserOverall: state.user.currentUserOverall
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserOverall: groupId =>
      dispatch(Actions.user.getUserOverall.request(groupId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
