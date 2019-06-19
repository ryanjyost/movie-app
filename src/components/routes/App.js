import React from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux/index";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import Storage from "store";

// PAGES
import AuthRedirect from "./AuthRedirect";

class App extends React.Component {
  state = {};

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.handleUserOnMount();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  handleUserOnMount() {
    if (Storage.get("userId")) {
      // get prev auth user
      let userId = Storage.get("userId");
      // this.props.userLogin(userId);
    }
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    this.props.updateDimensions(windowWidth);
  }

  render() {
    return <div>hey</div>;
  }
}

const mapStateToProps = state => {
  return {
    styles: state.styles,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDimensions: width => dispatch(Actions.styles.updateDimensions(width)),
    userLogin: userId => dispatch(Actions.user.userLogin.request(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
