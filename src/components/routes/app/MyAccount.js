import React from "react";
import AppHeader from "../../nav/AppHeader";
import { Container, Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Actions } from "../../../redux/index";

const PrivacyPolicy = ({ user, history, deleteUser }) => {
  function downloadObjectAsJson(exportObj, exportName) {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportObj));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const dataToDownload = { ...user };
  dataToDownload.groups = [...user.groups].map(group => group._id);

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
            maxWidth: 500,
            padding: "100px 0px",
            margin: "auto"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Button
              color={"primary"}
              variant={"contained"}
              style={{ marginBottom: 20 }}
              onClick={() => downloadObjectAsJson(dataToDownload, "my-data")}
            >
              Download My Data
            </Button>
            <Button
              color={"secondary"}
              variant={"contained"}
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete your account? This can't be undone!`
                  )
                ) {
                  deleteUser(user._id);
                }
              }}
            >
              Delete My Account
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: userId => dispatch(Actions.user.deleteUser.request(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrivacyPolicy));
