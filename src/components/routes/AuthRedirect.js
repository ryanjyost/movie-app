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
      this.props.userLogin(accessToken, this.props.status.startCreatingGroup);
    }

    this.setState({ didMount: true });
  }

  render() {
    const { user, status } = this.props;
    const { didMount } = this.state;

    if (!didMount) {
      return <Loader text={"Authenticating..."} />;
    }

    if (!didMount || status.startCreatingGroup) {
      return <Loader text={""} />;
    }

    if (user) {
      if (status.createGroup) {
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
    status: state.user.status
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
