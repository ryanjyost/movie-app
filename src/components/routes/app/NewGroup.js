import React from "react";
import AppHeader from "../../nav/AppHeader";
import { Typography, Container, Link } from "@material-ui/core";
import { connect } from "react-redux";
import { Actions } from "../../../redux";

const NewGroup = ({ group }) => {
  return (
    <div>
      <AppHeader />
      <Container
        maxWidth={"sm"}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <img
          style={{ borderRadius: 5 }}
          src={"https://moviemedium-assets.s3.amazonaws.com/great_success.jpg"}
          width={300}
        />

        <Typography variant={"h5"} align={"center"} style={{ marginTop: 20 }}>
          <strong>You've got a new group</strong>
        </Typography>
        {group ? (
          group.platform === "slack" ? (
            <Link
              variant={"h6"}
              align={"center"}
              href={`https://slack.com/app_redirect?channel=${group.slackId}`}
            >
              Click here to go to your new #moviemedium Slack channel
            </Link>
          ) : (
            <Typography align={"center"}>
              Check your GroupMe, there's a new chat that's ready for action.
              Start inviting people to the GroupMe chat and they'll be ready to
              start losing to you.
            </Typography>
          )
        ) : null}
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    group: state.user.group
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGroup);
