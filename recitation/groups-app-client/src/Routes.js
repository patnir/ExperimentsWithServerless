import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import NewGroup from "./containers/NewGroup";
import AppliedRoute from "./components/AppliedRoute";
import Sentiment from "./containers/Sentiment";
import Groups from "./containers/Groups";

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute
      path="/groups/new"
      exact
      component={NewGroup}
      props={childProps}
    />
    <AppliedRoute
      path="/detectingsentiment"
      exact
      component={Sentiment}
      props={childProps}
    />
    <AppliedRoute
      path="/groups/:id"
      exact
      component={Groups}
      props={childProps}
    />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
