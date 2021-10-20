import "./App.css";
import React, { useState } from "react";
import Login from "./pages/login";

import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Tickets from "./pages/tickets";
import Personal from "./pages/personal";
import Afp from "./pages/afp";
import Clientes from "./pages/clientes";
import Ordenes from "./pages/ordenes";
import Paquetes from "./pages/paquetes";
import Previsiones from "./pages/previsiones";
import Procesos from "./pages/procesos";
import Productos from "./pages/productos";

function App() {
  const [ventanaActiva, setVentanaActiva] = useState("");

  return (
    <div className="App">
      <Router>
        <Navbar ventanaActiva={ventanaActiva} />
        <Switch>
          <Route
            path="/login"
            exact
            component={Login}
            setVentanaActiva={setVentanaActiva}
            route={"Login"}
            
          />
          <PrivateRoute
            path="/"
            exact
            component={Home}
            setVentanaActiva={setVentanaActiva}
            route={"Inicio"}
          />
          <PrivateRoute
            path="/personal"
            component={Personal}
            setVentanaActiva={setVentanaActiva}
            route={"Personal"}
          />
          <PrivateRoute
            path="/afp"
            component={Afp}
            setVentanaActiva={setVentanaActiva}
            route={"Afp"}
          />
          <PrivateRoute
            path="/clientes"
            component={Clientes}
            setVentanaActiva={setVentanaActiva}
            route={"Clientes"}
          />
          <PrivateRoute
            path="/ordenes"
            component={Ordenes}
            setVentanaActiva={setVentanaActiva}
            route={"Órdenes"}
          />
          <PrivateRoute
            path="/paquetes"
            component={Paquetes}
            setVentanaActiva={setVentanaActiva}
            route={"Paquetes"}
          />
          <PrivateRoute
            path="/previsiones"
            component={Previsiones}
            setVentanaActiva={setVentanaActiva}
            route={"Previsiones"}
          />
          <PrivateRoute
            path="/procesos"
            component={Procesos}
            setVentanaActiva={setVentanaActiva}
            route={"Procesos"}
          />
          <PrivateRoute
            path="/productos"
            component={Productos}
            setVentanaActiva={setVentanaActiva}
            route={"Productos"}
          />
          <PrivateRoute
            path="/tickets"
            component={Tickets}
            setVentanaActiva={setVentanaActiva}
            route={"Tickets"}
          />
        </Switch>
      </Router>
      {/* <EmpleadosList /> */}
    </div>
  );
}

export default App;
