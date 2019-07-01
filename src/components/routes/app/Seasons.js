import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Actions } from "../../../redux";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { makeSeasonLabel } from "../../../util";
import ChooseSeason from "../../nav/ChooseSeason";
import ChooseGroup from "../../nav/ChooseGroup";
import { emojiMap } from "../../../util";

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
    padding: "2px 10px 2px 5px"
  }
}));

const Current = ({
  user,
  group,
  seasonRankings,
  getSeasonRankings,
  recentSeason,
  selectedSeason
}) => {
  const classes = useStyles();
  const selectedIsRecent =
    recentSeason && selectedSeason && recentSeason.id === selectedSeason.id;

  useEffect(() => {
    if (!seasonRankings.length) {
      getSeasonRankings(group ? group._id : user.groups[0]._id, "recent");
    }
  }, []);

  const seasonIsOver =
    recentSeason && selectedSeason && selectedIsRecent
      ? recentSeason.length === recentSeason.movies.length
      : false;

  let slotsRemaining = [];
  if (recentSeason) {
    for (let i = recentSeason.movies.length; i < recentSeason.length; i++) {
      slotsRemaining.push(i);
    }
  }

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
        <ChooseGroup getRankingsAtSwitch />
        <ChooseSeason
          text={"Switch Season"}
          hideAllSeasons
          getRankingsAtSwitch
        />
      </div>
      {recentSeason && (
        <div style={{ marginBottom: 20 }}>
          <Typography color={"primary"} align={"center"} gutterBottom>
            <strong>
              {seasonIsOver
                ? `Current Season (${recentSeason.id}) is over!`
                : selectedIsRecent
                  ? `Current Season - ${recentSeason.length -
                      recentSeason.movies.length} movies left`
                  : `Season ${selectedSeason.id}`}
            </strong>
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "rgba(0,0,0,0.5)",
              textAlign: "center"
            }}
          >
            {makeSeasonLabel(selectedSeason || recentSeason)}
          </div>
        </div>
      )}

      <div className={classes.header}>
        <Typography variant={"caption"}>Player</Typography>
        <Typography variant={"caption"}>Season Points</Typography>
      </div>
      {seasonRankings.map((player, i) => {
        return (
          <div key={i} className={classes.playerRow}>
            <Typography variant={"subtitle1"}>
              {seasonIsOver || !selectedIsRecent
                ? emojiMap[player.place - 1] || null
                : null}
              {player.name}
            </Typography>
            <Typography variant={"subtitle1"}>
              <strong>{player.points}</strong>
            </Typography>
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
    seasonRankings: state.user.currentSeasonRankings,
    recentSeason: state.movies.recentSeason,
    selectedSeason: state.movies.selectedSeason || state.movies.recentSeason
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSeasonRankings: (groupId, seasonId) =>
      dispatch(Actions.user.getSeasonRankings.request(groupId, seasonId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Current);
