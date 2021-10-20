import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/styles";

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#000",
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#DCDCDC",
    },
    borderRadius: "25px",
  },
}))(Button);

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <ColorButton
        variant="contained"
        color="primary"
        onClick={() => loginWithRedirect()}
      >
        Ingresar
      </ColorButton>
      
    </div>
  );
};
