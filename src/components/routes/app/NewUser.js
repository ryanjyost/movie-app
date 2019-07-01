import React from "react";
import AppHeader from "../../nav/AppHeader";
import { Typography, Container } from "@material-ui/core";

const NewUser = () => {
  return (
    <div>
      <AppHeader />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <img
          style={{ borderRadius: 5 }}
          src={
            "https://s3.amazonaws.com/moviemedium.io/images/memes/hello-clarice.jpg"
          }
          width={300}
        />

        <Typography variant={"h5"} align={"center"} style={{ marginTop: 20 }}>
          <strong>Welcome to Movie Medium!</strong>
        </Typography>
        <Typography align={"center"}>
          You're ready to start predicting movies and show off your film critic
          prowess. Get started here or in GroupMe.
        </Typography>
      </Container>
    </div>
  );
};

export default NewUser;
