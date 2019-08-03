import React from "react";
import { Route } from "react-router-dom";

// Top level routes
import Landing from "./Landing";
import LandingSlack from "./LandingSlack";
import AuthRedirect from "./AuthRedirect";
import Admin from "./Admin";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
import Rules from "./Rules";
import CreateGroup from "./CreateGroup";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

// App
import App from "./App";
import Home from "./app/Home";
import Upcoming from "./app/Upcoming";
import Purgatory from "./app/Purgatory";
import Past from "./app/Past";
import Seasons from "./app/Seasons";
import Overall from "./app/Overall";
import NewUser from "./app/NewUser";
import NewGroup from "./app/NewGroup";

const appRoutes = [
  {
    path: "/app",
    exact: true,
    title: "Home",
    component: Home
  },

  {
    path: "/app/predictions/upcoming",
    component: Upcoming,
    title: "Predictions"
  },
  {
    path: "/app/predictions/purgatory",
    component: Purgatory,
    title: "Predictions"
  },
  {
    path: "/app/predictions/past",
    component: Past,
    title: "Predictions"
  },
  {
    path: "/app/new-group",
    component: NewGroup,
    title: "Group Created"
  },
  {
    path: "/app/new-user",
    component: NewUser,
    title: "Welcome"
  },
  {
    path: "/app/leaderboard/seasons",
    component: Seasons,
    title: "Leaderboard"
  },
  {
    path: "/app/leaderboard/overall",
    component: Overall,
    title: "Leaderboard"
  }
];

const routes = [
  {
    path: "/",
    exact: true,
    component: Landing
  },
  {
    path: "/slack",
    exact: true,
    component: LandingSlack
  },
  {
    path: "/sign-in",
    title: "Sign In",
    component: SignIn
  },
  {
    path: "/sign-up",
    title: "Sign Up",
    component: SignUp
  },
  {
    path: "/create-group",
    title: "Create a group",
    component: CreateGroup
  },
  {
    path: "/terms",
    title: "Terms of Use",
    component: TermsOfService
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    component: PrivacyPolicy
  },
  {
    path: "/rules",
    title: "How To Play",
    component: Rules
  },
  {
    path: "/admin",
    component: Admin
  },
  {
    path: "/auth-redirect",
    component: AuthRedirect
  },
  {
    path: "/app",
    component: ({ routes }) => {
      return (
        <App>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </App>
      );
    },
    routes: appRoutes
  }
];

export const allRoutes = [...routes, ...appRoutes].map(config => {
  let copy = { ...config };
  delete copy.component;
  return copy;
});

export default routes;

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
