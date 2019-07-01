import React, { useState } from "react";
import YouTube from "react-youtube";
import CircularProgress from "@material-ui/core/CircularProgress";

const youtubeParser = url => {
  const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : false;
};

const MovieTrailer = ({ movie, windowWidth }) => {
  const [videoReady, setVideoReady] = React.useState(false);
  const video = youtubeParser(movie.trailer);
  const videoWidth = Math.min(500, windowWidth - 32);
  const opts = {
    height: videoWidth * (390 / 640),
    width: videoWidth
  };
  return (
    <div
      style={{
        maxHeight: "100%",
        height: videoWidth * (390 / 640),
        width: videoWidth,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.05)"
      }}
    >
      <YouTube
        videoId={typeof video === "string" ? video : ""}
        opts={opts}
        onReady={() => setVideoReady(true)}
      />

      {!videoReady && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
};

export default MovieTrailer;
