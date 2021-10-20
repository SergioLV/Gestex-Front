import React, { useState, useEffect } from "react";
import "../App.css";
import ClientForm from "./ClientForm";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles({
  table: {
    minWidth: 1200,
    width: 1200,
    "& .MuiTableCell-root": {
      borderBottom: "1px solid rgba(244, 77, 62, 1)",
    },
  },
  head: {
    backgroundColor: "#F55D3E",
    color: "white",
  },
});

export default function ClientesList() {
  const classes = useStyles();
  const [clientesList, setClientesList] = useState([]);

  const getCliente = async () => {
    await Axios.get("https://gestex-backend.herokuapp.com/get/productos/clientes").then((response) => {
      // console.log(response);
      setClientesList(response.data);
      console.log(response.data)
    });
  };

  useEffect(() => {
    getCliente();
  }, []);

  return (
    <div className="clientes-list">
      <ClientForm clientesList={clientesList} setClientesList={setClientesList}/>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
            <TableCell className={classes.head}>Id</TableCell>
            <TableCell className={classes.head}>Nombre</TableCell>
              <TableCell className={classes.head} align="center">
                Rut
              </TableCell>
              <TableCell className={classes.head} align="center">
                Email
              </TableCell>
              <TableCell className={classes.head} align="center">
                Direccion
              </TableCell>
              <TableCell className={classes.head} align="center">
                Comuna
              </TableCell>
              <TableCell className={classes.head} align="center">
                Ciudad
              </TableCell>
              <TableCell className={classes.head} align="center">
                Telefono
              </TableCell>
              <TableCell className={classes.head} align="center">
                Modificar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientesList.map((row) => (
              
              <TableRow hover="true" key={row.id_cliente}>
                <TableCell component="th" scope="row">
                  {row.id_cliente}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.nombre_cliente}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.rut_cliente}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.correo_electronico_cliente}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.direccion_cliente}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.comuna_cliente}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.ciudad_cliente}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.telefono_cliente}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}