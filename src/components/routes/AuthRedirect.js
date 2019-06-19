import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux";
import { Redirect } from "react-router-dom";

class AuthRedirect extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("mount auth");
    if (window.location.search) {
      let accessToken = window.location.search.replace("?access_token=", "");
      this.props.userLogin(accessToken);
    }
  }
  render() {
    const { user } = this.props;
    if (user) {
      return <Redirect to={"/app"} />;
    }
    return <div>Auth Redirect in progress</div>;
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
    userLogin: userId => dispatch(Actions.user.userLogin.request(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRedirect);
