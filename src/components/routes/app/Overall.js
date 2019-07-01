import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Actions } from "../../../redux";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import Numeral from "numeral";
import ChooseGroup from "../../nav/ChooseGroup";

const useStyles = makeStyles(theme => ({
  main: {
    maxWidth: 500,
    margin: "auto"
  },
  header: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 3,
    color: "rgba(255, 255, 255, 0.8)",
    padding: "2px 10px",
    marginBottom: 10
  },
  playerRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 10px 10px 5px"
  },
  avgMMMetric: {
    lineHeight: 1
  },
  numMovies: {
    color: "#a4a4a4",
    fontSize: 10
  }
}));

const Overall = ({ user, group, getOverallRankings, rankings }) => {
  const classes = useStyles();

  useEffect(() => {
    if (!rankings.length) {
      getOverallRankings(group ? group._id : user.groups[0]._id);
    }
  }, []);

  return (
    <div className={classes.main}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
          justifyContent: "center"
        }}
      >
        <ChooseGroup getOverallRankingsAtSwitch />
      </div>
      <div className={classes.header}>
        <Typography variant={"caption"}>Player</Typography>
        <Typography variant={"caption"}>Average MM Metric</Typography>
      </div>
      {rankings.map((player, i) => {
        return (
          <div key={i} className={classes.playerRow}>
            <Typography variant={"subtitle1"}>
              <strong>{player.name}</strong>
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              }}
            >
              <Typography variant={"subtitle1"} className={classes.avgMMMetric}>
                <strong>
                  {player.moviesInCalc
                    ? Numeral(player.avgDiff).format("0.0")
                    : "N/A"}%
                </strong>
              </Typography>
              <Typography
                variant={"caption"}
                className={classes.numMovies}
              >{`based on ${player.moviesInCalc} movies`}</Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    group: state.user.group,
    rankings: state.user.overallRankings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOverallRankings: groupId =>
      dispatch(Actions.user.getOverallRankings.request(groupId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overall);
