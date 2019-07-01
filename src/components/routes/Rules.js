import React from "react";
import AppHeader from "../nav/AppHeader";
import { Container } from "@material-ui/core";

const Rules = () => {
  const textStyle = {
    lineHeight: 1.4,
    color: "rgba(0,0,0,0.7)",
    margin: "15px 0px 15px 0px",
    fontSize: 16
  };
  return (
    <div>
      <AppHeader />
      <Container maxWidth={"lg"}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 600,
            padding: "50px 0px",
            margin: "auto"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: "20px 10px",
              width: "100%"
            }}
          >
            <p style={textStyle}>
              <strong>Objective:</strong> Predict the Rotten Tomatoes Scores of
              upcoming movies more accurately than your friends.
            </p>

            <p style={textStyle}>
              <strong>For each movie that you predict,</strong> you'll get a{" "}
              <strong>
                <i>Movie Medium Metric</i>
              </strong>.
            </p>

            <p style={textStyle}>
              <strong>Movie Medium Metric =</strong> how many percentage points
              off your prediction was from the actual RT Score.{" "}
            </p>

            <p style={textStyle}>
              <strong>For example,</strong> you predict 50%. The RT Score ends
              up being 70%. Your MM Metric for that movie is 20%.
            </p>

            <p style={textStyle}>
              <strong>
                The players in your group with the best MM Metrics
              </strong>{" "}
              for a movie get some points. 1st gets 30 points, 2nd gets 20
              points, 3rd gets 10 points.
            </p>

            <p style={textStyle}>
              <strong>Seasons are 5 movies long.</strong> Whoever has the most
              points after 5 movies wins the season.
            </p>

            <p style={textStyle}>
              <strong>Predictions are locked-in</strong> exactly two weeks
              before the release date of the movie.
            </p>

            <div style={textStyle}>
              <strong>
                {" "}
                All Movie Medium groups are linked to a GroupMe chat
              </strong>, where you...
              <div style={{ padding: "5px 5px 5px" }}>
                <span>...get movie and game-related updates</span>
                <br />
                <span>
                  ...predict RT Scores by sending a message like “Matrix 4 =
                  12%”
                </span>
                <br />
                <span>...stay in touch with the players in your group</span>
              </div>
            </div>

            <p style={textStyle}>
              <strong>
                Use the app at{" "}
                <a href="https://moviemedium.io">moviemedium.io</a>{" "}
              </strong>to manage predictions and see more detailed game info
              like past movie results and group rankings.
            </p>

            <p style={textStyle}>
              <strong>
                Invite more friends to play via your GroupMe chat at any time.
              </strong>
            </p>
            <p style={textStyle}>
              <strong>Mention Movie Medium (@Movie Medium) in GroupMe</strong>{" "}
              with any questions, ideas, bugs, stock recommendations, etc.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Rules;
