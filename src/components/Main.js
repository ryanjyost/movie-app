import React from "react";
import { connect } from "react-redux";
import { Actions } from "../redux";
import { Route } from "react-router-dom";
import routes, { RouteWithSubRoutes } from "./routes";
import Storage from "store";
import { CssBaseline, Container } from "@material-ui/core";
import Loader from "../components/misc/Loader";
import Landing from "../components/routes/Landing";

class Main extends React.Component {
  state = { didMount: false };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.handleUserOnMount();
    this.setState({ didMount: true });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  handleUserOnMount() {
    if (this.props.userId) {
      this.props.getUser(this.props.userId);
    }
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    this.props.updateDimensions(windowWidth);
  }

  render() {
    if (
      !this.state.didMount ||
      (this.props.userId &&
        !this.props.user &&
        !this.props.userStatus.fetchedUser)
    ) {
      return <Loader />;
    }
    return (
      <div>
        <CssBaseline />
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        {/*<Route component={Landing} />*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    styles: state.styles,
    user: state.user.user,
    userId: state.user.userId,
    userStatus: state.user.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDimensions: width => dispatch(Actions.styles.updateDimensions(width)),
    getUser: userId => dispatch(Actions.user.getUser.request(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
