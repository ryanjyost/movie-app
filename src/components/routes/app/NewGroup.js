import React from "react";
import AppHeader from "../../nav/AppHeader";
import { Typography, Container } from "@material-ui/core";

const NewGroup = () => {
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
          src={
            "https://s3.amazonaws.com/moviemedium.io/images/memes/great-success.jpg"
          }
          width={300}
        />

        <Typography variant={"h5"} align={"center"} style={{ marginTop: 20 }}>
          <strong>You've got a new group</strong>
        </Typography>
        <Typography align={"center"}>
          Check your GroupMe, there's a new chat that's ready for action. Start
          inviting people to the GroupMe chat and they'll be ready to start
          losing to you.
        </Typography>
      </Container>
    </div>
  );
};

export default NewGroup;
