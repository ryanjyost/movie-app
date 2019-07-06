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
      let accessToken = window.location.search.replace("?access_token=", "");
      this.props.userLogin(accessToken, this.props.flags.startCreatingGroup);
    }

    this.setState({ didMount: true });
  }

  render() {
    const { user, flags, status } = this.props;
    const { didMount } = this.state;

    if (status && status.error) {
      return <Redirect to={"/"} />;
    }

    if (!didMount) {
      return <Loader text={"Authenticating..."} />;
    }

    if (!didMount || flags.startCreatingGroup) {
      return <Loader text={"Creating group..."} />;
    }

    if (user && !user.groups.length) {
      return <Redirect to={"/create-group"} />;
    }

    if (user) {
      if (flags.createGroup) {
        return <Redirect to={"/app/new-group"} />;
      }

      if (user.isNew) {
        return <Redirect to={"/app/new-user"} />;
      }

      return <Redirect to={"/app"} />;
    }

    return <Loader text={"Authenticating..."} />;
  }
}

const mapStateToProps = state => {
  return {
    styles: state.styles,
    user: state.user.user,
    status: state.user.status,
    flags: state.user.flags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (accessToken, startCreatingGroup) =>
      dispatch(Actions.user.userLogin.request(accessToken, startCreatingGroup))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRedirect);
