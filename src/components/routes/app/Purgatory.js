import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles/index";
import { Actions } from "../../../redux";
import { connect } from "react-redux";
import MovieTitleWithPoster from "../../movies/MovieTitleWithPoster";
import { prepSortGroupPredictions } from "../../../util";
import ChooseGroup from "../../nav/ChooseGroup";

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
  currentUserColor: {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  }
}));

const SinglePlayer = ({ member, isUser }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 2
      }}
    >
      <Typography
        className={isUser ? classes.currentUserColor : null}
        variant={"subtitle2"}
      >
        {isUser ? "Your prediction" : member.name}
      </Typography>
      {member.didPredict ? (
        <Typography
          variant={"subtitle2"}
          className={isUser ? classes.currentUserColor : null}
          style={{ fontWeight: "bold" }}
        >
          {member.prediction}%
        </Typography>
      ) : (
        <Typography
          variant={"subtitle2"}
          className={isUser ? classes.currentUserColor : null}
          style={{ opacity: 0.5 }}
        >
          <strong>{member.didPredict ? member.prediction : "None"}</strong>
        </Typography>
      )}
    </div>
  );
};

const Purgatory = ({ purgatoryMovies, group, user }) => {
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
      </div>
      {purgatoryMovies.map((movie, i) => {
        const sortedPredictions = group
          ? prepSortGroupPredictions(group.members, movie)
          : [];

        return (
          <Card key={movie._id} className={classes.card}>
            <MovieTitleWithPoster movie={movie} />
            <CardContent>
              {group ? (
                sortedPredictions.map((member, i) => {
                  if (member.isMM) return null;
                  return (
                    <SinglePlayer
                      key={i}
                      member={member}
                      isUser={member._id === user._id}
                    />
                  );
                })
              ) : (
                <SinglePlayer member={user} isUser={true} />
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
    userStatus: state.user.status,
    purgatoryMovies: state.movies.purgatoryMovies.sort((a, b) => {
      a = a ? a.releaseDate : null;
      b = b ? b.releaseDate : null;

      if (a < b) return 1;
      if (b < a) return -1;
      return 0;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(Actions.movies.getMovies.request())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Purgatory);
