import React from "react";
import { Typography, Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { makeStyles, lighten } from "@material-ui/core/styles/index";
import ListItem from "@material-ui/core/ListItem";
import { connect } from "react-redux";
import { Actions } from "../../redux";
import { makeSeasonLabel } from "../../util";

const useStyles = makeStyles(theme => ({
  list: {
    width: 300
  },
  topSideBar: {
    backgroundColor: theme.palette.secondary.main,
    height: 50,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0px 20px",
    fontWeight: "bold"
  },
  createSeason: {
    backgroundColor: theme.palette.secondary.main
  },
  listItem: {
    borderBottom: `1px solid ${lighten(theme.palette.primary.light, 0.8)}`
  },
  listItemActive: {
    borderBottom: `1px solid ${lighten(theme.palette.primary.light, 0.8)}`,
    backgroundColor: lighten(theme.palette.primary.light, 0.9)
  }
}));

const SideMenu = ({
  isOpen,
  toggleDrawer,
  selectedSeason,
  switchSeason,
  seasons,
  recentSeason,
  hideAllSeasons,
  getRankingsAtSwitch,
  getSeasonRankings
}) => {
  const classes = useStyles();
  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <div className={classes.topSideBar}>
          <Typography style={{ color: "#fff" }}>
            <strong>Choose a Season</strong>
          </Typography>
        </div>
        <List>
          {hideAllSeasons ? null : (
            <ListItem
              button
              onClick={() => {
                switchSeason(null);
              }}
              className={
                !selectedSeason ? classes.listItemActive : classes.listItem
              }
            >
              <Typography variant={"caption"}>
                <strong>All Seasons</strong>
              </Typography>
            </ListItem>
          )}
          {seasons.map((season, i) => {
            const isRecentSeason =
              recentSeason && recentSeason.id === season.id;
            return (
              <ListItem
                key={i}
                button
                onClick={() => {
                  if (getRankingsAtSwitch) {
                    getSeasonRankings(season.id);
                  }
                  switchSeason(season.id);
                }}
                className={
                  !selectedSeason && isRecentSeason && hideAllSeasons
                    ? classes.listItemActive
                    : selectedSeason && selectedSeason._id === season._id
                      ? classes.listItemActive
                      : classes.listItem
                }
              >
                <Typography variant={"caption"}>
                  <strong>
                    {isRecentSeason
                      ? "Current Season: "
                      : `Season ${season.id}: `}
                  </strong>
                  <span style={{ color: "rgba(0,0,0,0.5)" }}>
                    {makeSeasonLabel(season)}
                  </span>
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </div>
    </Drawer>
  );
};

const ChooseSeason = ({
  user,
  switchSeason,
  seasons,
  selectedSeason,
  recentSeason,
  text,
  hideAllSeasons,
  getRankingsAtSwitch,
  getSeasonRankings,
  group
}) => {
  const [isOpen, setOpen] = React.useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  if (!user.groups.length) {
    return null;
  }

  return (
    <React.Fragment>
      <Button
        size={"small"}
        variant="outlined"
        color={"primary"}
        style={{ margin: "0px 5px" }}
        onClick={toggleDrawer(true)}
      >
        {text || "Filter by Season"}
      </Button>
      <SideMenu
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        user={user}
        selectedSeason={selectedSeason}
        switchSeason={switchSeason}
        seasons={seasons}
        recentSeason={recentSeason}
        hideAllSeasons={hideAllSeasons}
        getRankingsAtSwitch={getRankingsAtSwitch}
        getSeasonRankings={seasonId => getSeasonRankings(group._id, seasonId)}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    selectedSeason: state.movies.selectedSeason,
    recentSeason: state.movies.recentSeason,
    seasons: state.movies.seasons,
    group: state.user.group
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchSeason: seasonId =>
      dispatch(Actions.movies.switchSeason.request(seasonId)),
    getSeasonRankings: (groupId, seasonId) =>
      dispatch(Actions.user.getSeasonRankings.request(groupId, seasonId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseSeason);
