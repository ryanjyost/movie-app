import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Tab,
  Tabs,
  Paper
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import MovieIcon from "@material-ui/icons/MovieOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import { NavLink, withRouter } from "react-router-dom";
import AppHeader from "../nav/AppHeader";
import Loader from "../misc/Loader";

const useStyles = makeStyles(theme => {
  console.log("THEME", theme);
  return {
    bottomNav: {
      position: "fixed",
      bottom: 0,
      width: "100%"
    }
  };
});

const AdapterLink = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const App = ({
  styles,
  user,
  children,
  location,
  getMovies,
  getSeasons,
  userStatus,
  userId,
  group
}) => {
  const classes = useStyles();
  const section = location.pathname.split("/")[2] || "home";
  const tabs = {
    predictions: [
      { label: "Upcoming", link: "/app/predictions/upcoming" },
      { label: "Purgatory", link: "/app/predictions/purgatory" },
      { label: "Past", link: "/app/predictions/past" }
    ],
    leaderboard: [
      // { label: "Seasons", link: "/app/leaderboard/seasons" },
      { label: "Seasons", link: "/app/leaderboard/seasons" },
      { label: "Overall", link: "/app/leaderboard/overall" }
    ]
  };

  useEffect(() => {
    getMovies();
    getSeasons();
  }, []);

  if (!user && userId) {
    return <Loader />;
  }

  if (!user) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <AppHeader>
        {user && tabs[section] ? (
          <Paper square elevation={0}>
            <Tabs
              value={location.pathname}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
            >
              {tabs[section].map((tab, i) => {
                return (
                  <Tab
                    key={i}
                    label={tab.label}
                    value={tab.link}
                    component={AdapterLink}
                    to={tab.link}
                  />
                );
              })}
            </Tabs>
          </Paper>
        ) : null}
      </AppHeader>
      <Container
        style={{ paddingTop: tabs[section] ? 150 : 100, paddingBottom: 150 }}
        maxWidth={"md"}
      >
        {children}
      </Container>{" "}
      <BottomNavigation
        className={classes.bottomNav}
        value={location.pathname.split("/")[2] || "home"}
        showLabels
      >
        {group ? (
          <BottomNavigationAction
            label="Leaderboard"
            component={AdapterLink}
            to={"/app/leaderboard/seasons"}
            icon={<PeopleIcon />}
            value={"leaderboard"}
          />
        ) : null}
        <BottomNavigationAction
          component={AdapterLink}
          label="Home"
          icon={<HomeIcon />}
          to={"/app"}
          value={"home"}
        />
        <BottomNavigationAction
          component={AdapterLink}
          to={"/app/predictions/upcoming"}
          value={"predictions"}
          label="Predictions"
          icon={<MovieIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    styles: state.styles,
    user: state.user.user,
    group: state.user.group,
    userId: state.user.userId,
    userStatus: state.user.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(Actions.movies.getMovies.request()),
    getSeasons: () => dispatch(Actions.movies.getSeasons.request())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
