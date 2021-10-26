import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../styles/navbar.css";
import { IconContext } from "react-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./Login";
import { LogoutButton } from "./Logout";

export default function Navbar({ ventanaActiva }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading || isAuthenticated) {
    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <h3 className="title">Sistema de Gestión de Personal</h3>
            <h3 className="breadcrumb">{ventanaActiva}</h3>
          </div>
          <nav className="nav-menu active">
            <ul className="nav-menu-items">
              <li className="navbar-toggle">
                <div className="fenix-title">
                  <h2 className="fenix"> Covemil</h2>
                  <hr
                    style={{
                      color: "#000000",
                      backgroundColor: "#000000",
                      height: 0.5,
                      borderColor: "#000000",
                      marginLeft: "60px",
                      marginTop: "10px",
                    }}
                  />
                </div>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      <span
                        className="tablas-navbar"
                        style={
                          ventanaActiva === item.title
                            ? { color: "#FFFFFF" }
                            : { color: "#662316" }
                        }
                      >
                        {item.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
              <LogoutButton />
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  } else {
    return LoginButton;
  }
}
