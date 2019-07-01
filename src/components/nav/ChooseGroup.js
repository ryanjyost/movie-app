import React from "react";
import { Typography, Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { makeStyles, lighten } from "@material-ui/core/styles/index";
import ListItem from "@material-ui/core/ListItem";
import { connect } from "react-redux";
import { Actions } from "../../redux";
import { makeGroupLabel } from "../../util";

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
  createGroup: {
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
  user,
  currentGroup,
  switchGroup,
  getRankingsAtSwitch,
  getSeasonRankings,
  getOverallRankings,
  getOverallRankingsAtSwitch
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
            <strong>Choose a group</strong>
          </Typography>
        </div>
        <List>
          {user.groups.map((group, i) => {
            return (
              <ListItem
                key={i}
                button
                onClick={() => {
                  if (getRankingsAtSwitch) {
                    getSeasonRankings(group._id);
                  }

                  if (getOverallRankings) {
                    getOverallRankings(group._id);
                  }

                  switchGroup(group._id);
                }}
                className={
                  currentGroup && currentGroup._id === group._id
                    ? classes.listItemActive
                    : classes.listItem
                }
              >
                <Typography variant={"caption"}>
                  {makeGroupLabel(group)}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </div>
    </Drawer>
  );
};

const ChooseGroup = ({
  user,
  group,
  switchGroup,
  getRankingsAtSwitch,
  getSeasonRankings,
  recentSeason,
  selectedSeason,
  getOverallRankings,
  getOverallRankingsAtSwitch
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

  if (user.groups.length < 2) {
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
        Switch Group
      </Button>
      <SideMenu
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        user={user}
        currentGroup={group}
        switchGroup={switchGroup}
        getRankingsAtSwitch={getRankingsAtSwitch}
        getOverallRankings={getOverallRankings}
        getSeasonRankings={groupId =>
          getSeasonRankings(
            groupId,
            selectedSeason
              ? selectedSeason.id
              : recentSeason
                ? recentSeason.id
                : null
          )
        }
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    group: state.user.group,
    selectedSeason: state.movies.selectedSeason,
    recentSeason: state.movies.recentSeason
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchGroup: groupId => dispatch(Actions.user.switchGroup.request(groupId)),
    getSeasonRankings: (groupId, seasonId) =>
      dispatch(Actions.user.getSeasonRankings.request(groupId, seasonId)),
    getOverallRankings: groupId =>
      dispatch(Actions.user.getOverallRankings.request(groupId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseGroup);
