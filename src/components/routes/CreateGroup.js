import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux/index";
import AppHeader from "../nav/AppHeader";
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => {
  return {
    main: {
      minHeight: "100vh",
      width: "100%"
    },
    centerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "90vh",
      padding: "0px 40px",
      textAlign: "center"
    }
  };
});

const CreateGroup = ({ startCreatingGroup }) => {
  const classes = useStyles();

  useEffect(() => {
    startCreatingGroup();
  }, []);

  return (
    <div className={classes.main}>
      <AppHeader />
      <Container
        maxWidth={"sm"}
        className={classes.centerContainer}
        style={{ paddingTop: 100 }}
      >
        <Typography variant={"h5"} gutterBottom>
          Predict Rotten Tomatoes score with friends
        </Typography>
        <Typography variant={"subtitle2"} gutterBottom />

        <Button
          variant="contained"
          color="secondary"
          size={"large"}
          href={process.env.REACT_APP_GROUPME_AUTH}
        >
          <strong>Create my group</strong>
        </Button>

        <Typography
          variant={"caption"}
          style={{ marginTop: 20, color: "#a4a4a4" }}
        >
          By creating your new Movie Medium Group and the linked GroupMe chat,
          you agree to our <Link to={"/terms"}>Terms of Service</Link> and{" "}
          <Link to={"/privacy"}>Privacy Policy</Link>.
        </Typography>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    accessToken: state.user.accessToken,
    flags: state.user.flags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startCreatingGroup: () => dispatch(Actions.user.createGroup.request())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroup);
