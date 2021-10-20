import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  setVentanaActiva: setVentanaActiva,
  ...rest
}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  setVentanaActiva(rest.route);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated || isLoading ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
