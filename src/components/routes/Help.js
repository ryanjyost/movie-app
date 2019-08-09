import React from "react";
import AppHeader from "../nav/AppHeader";
import { Container } from "@material-ui/core";

const Help = () => {
  return (
    <div>
      <AppHeader />
      <Container maxWidth={"lg"}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: "100vh",
            margin: "auto"
          }}
        >
          <h2>Question? Issue? Request?</h2>
          <a
            style={{ fontSize: 20 }}
            href={`mailto:ryanjyost@gmail.com?subject=Movie Medium`}
          >
            <strong>Email me (Ryan) at ryanjyost@gmail.com</strong>
          </a>
          <p>
            <i>I WILL respond!</i>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Help;
