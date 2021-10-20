import React from "react";
import { LoginButton } from "../components/Login";

export default function Login() {
  return (
    <div className="login">
      <div className="login-content">
        <div className="orange-bar">
          <div className="title-header">
            <h1 className="login-title">GesTex</h1>
            <hr className="login-hr" />
            <p className='inicio-sesion'>Inicio de Sesión</p>
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
}
