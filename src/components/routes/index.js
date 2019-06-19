import React from "react";
import { Route } from "react-router-dom";
import AuthRedirect from "./AuthRedirect";
import Admin from "./Admin";

const appRoutes = [
  {
    path: "/app",
    exact: true,
    component: () => <h1>Dashboard</h1>
  },
  {
    path: "/app/upcoming",
    component: () => <h1>upcoming</h1>
  },
  {
    path: "/app/purgatory",
    component: () => <h1>purgatory</h1>
  },
  {
    path: "/app/past",
    component: () => <h1>past</h1>
  }
];

const routes = [
  {
    path: "/",
    exact: true,
    component: () => (
      <div>
        skoosh <a href={process.env.REACT_APP_GROUPME_AUTH}>Sign in</a>
      </div>
    )
  },
  {
    path: "/create-group",
    component: () => <h1>create group</h1>
  },
  {
    path: "/terms",
    component: () => <h1>terms</h1>
  },
  {
    path: "/privacy",
    component: () => <h1>privacy</h1>
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
        <div>
          <h1>App</h1>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </div>
      );
    },
    routes: appRoutes
  }
];

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
