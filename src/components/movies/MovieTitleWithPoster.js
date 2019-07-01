import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Link
} from "@material-ui/core";
import moment from "moment-timezone";
import { makeStyles } from "@material-ui/core/styles/index";

const useStyles = makeStyles({
  card: {
    width: "100%",
    maxWidth: 500,
    margin: "auto",
    marginBottom: 50
  },
  imgContainer: {
    width: 80,
    height: 110
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
});

const MovieTitleWithPoster = ({ movie }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #f2f2f2"
      }}
    >
      {movie.poster && (
        <div className={classes.imgContainer}>
          <CardMedia
            className={classes.img}
            component="img"
            alt={movie.title}
            image={`https://s3.amazonaws.com/moviemedium.io/images/movies/${
              movie.poster
            }`}
          />
        </div>
      )}
      <Link
        variant={"subtitle1"}
        href={movie.rtLink}
        className={classes.title}
        color="textPrimary"
        style={{ padding: 10 }}
      >
        <strong>{movie.title}</strong>{" "}
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
            {`${moment.unix(movie.releaseDate).format("MMMM d, YYYY")}`}
          </Typography>
        </div>
      </Link>
    </div>
  );
};

export default MovieTitleWithPoster;
