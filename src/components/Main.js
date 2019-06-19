import React from "react";
import { connect } from "react-redux";
import { Actions } from "../redux";
import { Route } from "react-router-dom";
import routes, { RouteWithSubRoutes } from "./routes";
import Storage from "store";

import { CssBaseline, Container } from "@material-ui/core";

class Main extends React.Component {
  state = {};

  componentDidMount() {
    // this.updateDimensions();
    // window.addEventListener("resize", this.updateDimensions.bind(this));
    // this.handleUserOnMount();
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
    return (
      <div>
        <CssBaseline />

        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </div>
    );
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
)(Main);
