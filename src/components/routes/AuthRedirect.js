import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux";
import { Redirect } from "react-router-dom";
import Loader from "../misc/Loader";

class AuthRedirect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      didMount: false
    };
  }

  componentDidMount() {
    if (window.location.search) {
      if (window.location.search.includes("error")) {
        return;
      }

      if (window.location.search.includes("access_token")) {
        // groupme
        let accessToken = window.location.search.replace("?access_token=", "");
        this.props.userLogin(accessToken, "groupme");
      } else if (window.location.search.includes("code")) {
        // Slack
        let code = window.location.search.replace("?code=", "").split("&")[0];
        if (window.location.search.includes("mmSignIn")) {
          this.props.userLogin(code, "slack");
        }

        // if (this.props.flags.startCreatingGroup) {
        //   this.props.createSlackChannel(code);
        // } else {
        // this.props.userLogin(code, "slack");
        // }
      }
    }

    this.setState({ didMount: true });
  }

  render() {
    const { user, status } = this.props;
    const { didMount } = this.state;
    //
    // if (!didMount || !user) {
    //   return <Loader text={"Doing stuff..."} />;
    // }

    if (status && status.error) {
      return <Redirect to={"/"} />;
    }

    // if (user && !user.groups.length) {
    //   return <Redirect to={"/create-group"} />;
    // }

    if (user) {
      if (user.isNew) {
        return <Redirect to={"/app/new-user"} />;
      } else if (user.madeNewGroup) {
        return <Redirect to={"/app/new-group"} />;
      }

      return <Redirect to={"/app"} />;
    }

    return <Loader text={"Doing stuff..."} />;
  }
}

const mapStateToProps = state => {
  return {
    styles: state.styles,
    user: state.user.user,
    status: state.user.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (accessToken, platform) =>
      dispatch(Actions.user.userLogin.request(accessToken, platform)),
    createSlackChannel: code =>
      dispatch(Actions.user.createSlackChannel.request(code))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRedirect);
