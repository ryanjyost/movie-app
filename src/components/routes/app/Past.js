import React, { useEffect } from "react";
import { Card, CardContent, Typography, Link } from "@material-ui/core";
import {
  makeStyles,
  withStyles,
  lighten
} from "@material-ui/core/styles/index";
import { Actions } from "../../../redux";
import { connect } from "react-redux";
import MovieTitleWithPoster from "../../movies/MovieTitleWithPoster";
import { prepSortGroupPredictions } from "../../../util";
import LinearProgress from "@material-ui/core/LinearProgress";
import ChooseGroup from "../../nav/ChooseGroup";
import ChooseSeason from "../../nav/ChooseSeason";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%",
    maxWidth: 500,
    margin: "auto",
    marginBottom: 50
  },
  imgContainer: {
    width: 60,
    height: 80
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  title: {},
  progressBar: {
    borderRadius: 5,
    marginBottom: 5
  },
  currentUserColor: {
    color: theme.palette.primary.main
  }
}));

const RTBar = withStyles(theme => ({
  root: {
    backgroundColor: lighten(theme.palette.secondary.main, 0.9)
  }
}))(LinearProgress);

const UserBar = withStyles(theme => ({
  root: {
    backgroundColor: lighten(theme.palette.primary.main, 0.9)
  }
}))(LinearProgress);

const PlayerBar = withStyles(theme => ({
  root: {
    backgroundColor: lighten("#000000", 0.9)
  },
  bar: {
    backgroundColor: lighten("#000000", 0.7)
  }
}))(LinearProgress);

const SinglePlayer = ({ member, isCurrentUser, movie, isSingle }) => {
  const classes = useStyles();

  if (isCurrentUser && isSingle) {
    member.prediction = member.votes[movie._id];
  }

  if (isSingle && member.prediction !== undefined) {
    member.didPredict = true;
    member.absDiff = Math.abs(member.prediction - movie.rtScore);
  }

  if (!member) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
          padding: "3px 0px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            overflow: "hidden"
          }}
        >
          <Typography
            noWrap
            variant={"subtitle2"}
            style={{
              maxWidth: "60%",
              paddingRight: 5,
              fontWeight: isCurrentUser ? "bold" : "normal"
            }}
            className={isCurrentUser ? classes.currentUserColor : null}
          >
            {isCurrentUser ? "You" : `${member.name} `}
          </Typography>
          <Typography
            noWrap
            variant={"caption"}
            color={"textSecondary"}
            className={isCurrentUser ? classes.currentUserColor : null}
          >
            {member.didPredict ? (
              <span>
                {isCurrentUser ? "were" : "was"}
                <strong style={{ padding: "0px 3px" }}>
                  {member.absDiff}%
                </strong>
                off
              </span>
            ) : (
              `didn't predict`
            )}
          </Typography>
        </div>
        {member.didPredict ? (
          <Typography
            style={{ fontWeight: "bold" }}
            className={isCurrentUser ? classes.currentUserColor : null}
          >
            {member.prediction}%
          </Typography>
        ) : (
          <Typography variant={"subtitle2"} style={{ opacity: 0.5 }}>
            {"-"}
          </Typography>
        )}
      </div>
      {member.didPredict ? (
        isCurrentUser ? (
          <UserBar
            className={classes.progressBar}
            variant="determinate"
            value={member.prediction}
            color={"primary"}
          />
        ) : (
          <PlayerBar
            className={classes.progressBar}
            variant="determinate"
            value={member.prediction}
          />
        )
      ) : null}
    </div>
  );
};

const Past = ({ pastMovies, group, user, selectedSeason }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 20
        }}
      >
        <ChooseGroup />
        <ChooseSeason />
      </div>
      {user.groups.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography
            style={{ width: "100%", textAlign: "center" }}
            color={"primary"}
            variant={"subtitle1"}
          >
            <strong>
              {selectedSeason ? `Season ${selectedSeason.id}` : "All Seasons"}
            </strong>
          </Typography>
          <Typography
            style={{ width: "100%", textAlign: "center", marginBottom: 30 }}
            color={"primary"}
          >
            &darr;
          </Typography>
        </div>
      ) : null}
      {pastMovies
        .filter(movie => {
          if (selectedSeason) {
            return movie.season === selectedSeason.id;
          } else {
            return true;
          }
        })
        .sort((a, b) => {
          a = a.releaseDate;
          b = b.releaseDate;

          if (a > b) return -1;
          if (b > a) return 1;
          return 0;
        })
        .map((movie, i) => {
          const sortedPredictions = group
            ? prepSortGroupPredictions(group.members, movie, "absDiff", true)
            : [];
          return (
            <Card key={movie._id} className={classes.card}>
              <MovieTitleWithPoster movie={movie} />
              <CardContent>
                <div>
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 6,
                      paddingBottom: 0
                    }}
                  >
                    <Link
                      href={movie.rtLink}
                      color={"secondary"}
                      noWrap
                      variant={"subtitle2"}
                      style={{ display: "flex", alignItems: "flex-end" }}
                    >
                      Rotten Tomatoes Score{" "}
                      <OpenInBrowserIcon
                        style={{ fontSize: 18, marginLeft: 5 }}
                      />
                    </Link>

                    <Typography
                      style={{ fontWeight: "bold" }}
                      color={"secondary"}
                    >
                      {movie.rtScore}%
                    </Typography>
                  </div>
                  <RTBar
                    className={classes.progressBar}
                    color="secondary"
                    variant="determinate"
                    value={movie.rtScore}
                  />
                </div>

                {group ? (
                  sortedPredictions.map((member, i) => {
                    if (member.isMM) return null;
                    const isCurrentUser = member._id === user._id;
                    return (
                      <SinglePlayer
                        key={i}
                        member={member}
                        isCurrentUser={isCurrentUser}
                      />
                    );
                  })
                ) : (
                  <SinglePlayer
                    member={user}
                    isCurrentUser={true}
                    movie={movie}
                    isSingle
                  />
                )}
              </CardContent>
            </Card>
          );
        })}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    group: state.user.group,
    selectedSeason: state.movies.selectedSeason,
    pastMovies: state.movies.pastMovies.sort((a, b) => {
      a = a ? a.releaseDate : null;
      b = b ? b.releaseDate : null;

      if (a < b) return 1;
      if (b < a) return -1;
      return 0;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Past);
