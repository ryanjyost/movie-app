import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Actions } from "../../../redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MovieTrailer from "../../movies/MovieTrailer";
import { generateReleaseText } from "../../../util";

import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Link
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    width: "100%",
    maxWidth: 500,
    margin: "auto",
    marginBottom: 50
  },
  info: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
    // marginLeft: 10
  },
  icon: { fontSize: 12, marginRight: 1 },
  pos: {
    marginBottom: 12
  },
  predictionInputFont: {
    fontSize: 26
  },
  predictionInput: {
    width: 120
  }
});

const Prediction = ({ movie, user, predictMovie }) => {
  const classes = useStyles();
  const [prediction, updatePrediction] = React.useState(null);
  const [isBeingPredicted, setEdit] = React.useState(null);

  useEffect(() => {
    let prediction = null;
    if (movie._id in user.votes && user.votes[movie._id] > -1) {
      prediction = user.votes[movie._id];
    }
    updatePrediction(prediction);
  }, []);

  function handleUpdatePrediction(value) {
    let vote = 50;
    if (value > 100) {
      vote = 100;
    } else if (value < 0) {
      vote = 0;
    } else {
      vote = value;
    }

    updatePrediction(vote);
  }

  if (prediction === null) {
    return (
      <CardContent>
        <Button
          variant={"contained"}
          color={"secondary"}
          fullWidth
          onClick={() => {
            setEdit(true);
            updatePrediction(50);
          }}
        >
          Make a prediction
        </Button>
      </CardContent>
    );
  }

  return (
    <CardContent
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {isBeingPredicted ? (
        <TextField
          autoFocus
          id="outlined-adornment-weight"
          variant="outlined"
          label="Prediction"
          value={prediction}
          type="number"
          onChange={e => handleUpdatePrediction(e.target.value)}
          InputProps={{
            classes: {
              input: classes.predictionInputFont
            },
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
          className={classes.predictionInput}
        />
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant={"h4"} color={"primary"}>
            <strong>{`${prediction}%`}</strong>
          </Typography>
          <Typography
            style={{ marginLeft: 5, color: "rgba(0,0,0,0.4)" }}
            variant={"caption"}
          >
            prediction
          </Typography>
        </div>
      )}
      {isBeingPredicted ? (
        <Button
          variant={"contained"}
          color={"primary"}
          style={{ width: 100 }}
          onClick={() => {
            predictMovie(movie._id, user._id, prediction);
            setEdit(false);
          }}
        >
          Save
        </Button>
      ) : (
        <Button
          variant={"outlined"}
          color={"default"}
          style={{ width: 100 }}
          onClick={() => setEdit(true)}
        >
          Edit
        </Button>
      )}
    </CardContent>
  );
};

const Upcoming = ({
  upcomingMovies,
  styles,
  moviePredictionCutoffDate,
  user,
  predictMovie
}) => {
  const classes = useStyles();

  const moviesThatNeedPrediction = user
    ? upcomingMovies.filter(movie => {
        return !(movie._id in user.votes);
      })
    : [];

  return (
    <React.Fragment>
      {moviesThatNeedPrediction.length ? (
        <Typography
          align={"center"}
          color={"secondary"}
          variant={"h6"}
          style={{ marginBottom: 20 }}
          gutterBottom
        >{`${
          moviesThatNeedPrediction.length
        } movies need your prediction`}</Typography>
      ) : null}
      {upcomingMovies
        .sort((a, b) => {
          a = a.releaseDate;
          b = b.releaseDate;

          if (a > b) return 1;
          if (b > a) return -1;
          return 0;
        })
        .map(movie => {
          const releaseText = generateReleaseText(
            movie.releaseDate,
            moviePredictionCutoffDate
          );
          return (
            <Card key={movie._id} className={classes.card}>
              <MovieTrailer movie={movie} windowWidth={styles.windowWidth} />
              <CardContent>
                <Link
                  variant={"h6"}
                  href={movie.rtLink}
                  className={classes.title}
                  color="textPrimary"
                >
                  <strong>{movie.title}</strong>{" "}
                </Link>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexWrap: "wrap"
                  }}
                >
                  <Typography
                    color={"textSecondary"}
                    className={classes.info}
                    variant={"caption"}
                    style={{ marginRight: 10 }}
                  >
                    {`${releaseText} left to predict`}
                  </Typography>
                </div>
              </CardContent>
              <Prediction
                movie={movie}
                user={user}
                predictMovie={predictMovie}
              />
            </Card>
          );
        })}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    styles: state.styles,
    user: state.user.user,
    userStatus: state.user.status,
    upcomingMovies: state.movies.upcomingMovies,
    moviePredictionCutoffDate: state.movies.moviePredictionCutoffDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(Actions.movies.getMovies.request()),
    predictMovie: (movieId, userId, prediction) =>
      dispatch(Actions.user.predictMovie.request(movieId, userId, prediction))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upcoming);
