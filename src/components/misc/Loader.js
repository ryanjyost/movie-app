import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const Loader = ({ text }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <div style={{ position: "relative", marginBottom: 20 }}>
        <img
          style={{ position: "absolute", top: "30%", left: "29%" }}
          src={"/mm_logo_red_transparent.png"}
          width={80}
        />
        <CircularProgress
          className={classes.progress}
          color="secondary"
          size={160}
          thickness={1.5}
        />
      </div>
      {text && (
        <Typography
          variant={"h6"}
          style={{ color: "rgba(0,0,0,0.4)", fontWeight: "normal" }}
        >
          {text}
        </Typography>
      )}
    </div>
  );
};

export default Loader;
