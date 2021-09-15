import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) return <Redirect to={{ pathname: "/welcome" }} />;
        return <Component {...props} />;
      }}
    ></Route>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(PrivateRoute);
