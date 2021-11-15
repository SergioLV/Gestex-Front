import React, { useState, useEffect } from "react";
import Axios from "axios";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import EditSharpIcon from "@material-ui/icons/EditSharp";
import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "@material-ui/core/Button";

import PopUp from "../components/modals/PopUp";
import PopUpEdit from "../components/modals/PopUpEdit";
import PopUpEditError from "../components/modals/PopUpEditError";
import AgregarOrden from "../components/ordenes/AgregarOrden";
import EditOrden from "../components/ordenes/EditOrden";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    width: 300,
    "& .MuiTableCell-root": {
      borderBottom: "1px solid rgba(244, 77, 62, 1)",
    },
  },
  head: {
    backgroundColor: "#F55D3E",
    color: "white",
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#f55d3e",
    "&:hover": {
      backgroundColor: "#fe6e51",
    },
    borderRadius: "25px",
  },
}))(Button);

export default function Productos() {
  const classes = useStyles();
  const [loadingClientes, setLoadingClientes] = useState(false);

  //State que almacena la peticion HTTP a la api y contiene una lista de objetos con los productos
  const [clientes, setClientes] = useState([]);
  //State que almacena el producto al hacer click en el icono de edit
  const [clientesEdit, setClientesEdit] = useState([]);
  //State que almacena le producto que se agrega en el modal de agregar y luego se pasa al popup de satisfaccion
  const [clienteAdd, setClienteAdd] = useState("");

  //State del
  const [openEdit, setOpenEdit] = useState(false);
  //Estado del modal para agregar y editar producto
  const [openModal, setOpenModal] = useState(false);
  //State del popup para el feedback de producto agregado satisfactoriamente
  const [openPopUp, setOpenPopUp] = useState(false);
  //State del popup para el feedback de producto editado satisfactoriamente
  const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
  //State del popup para el feedback de producto editado ha producido un error
  const [openPopUpEditError, setOpenPopUpEditError] = useState(false);

  //State para mostrar el producto que se edito

  //Funcion que llama a get/productos y almacena en productos una lista de objetos con todos los productos de la tabla productos

  useEffect(() => {
    const getClientes = async () => {
      await Axios.get("https://gestex-backend.herokuapp.com/get/clientes").then(
        (response) => {
          setLoadingClientes(true);
          setClientes(response.data);
        }
      );
    };
    getClientes();
  }, []);

  return (
    <div className="productos">
      {/* {openEdit && (
        <EditOrden
          setOpenModal={setOpenModal}
          ordenes={ordenes}
          setOrdenes={setOrdenes}
          setOpenEdit={setOpenEdit}
          ordenEdit={ordenEdit}
          setOpenPopUpEdit={setOpenPopUpEdit}
          setOpenPopUpEditError={setOpenPopUpEditError}
          openPopUpEdit={openPopUpEdit}
          // setBeforeEdit={setBeforeEdit}
        />
      )}
      {openPopUp && <PopUp ordenAdd={ordenAdd} />}
      {openPopUpEdit && <PopUpEdit ordenEdit={ordenEdit} />}
      {openPopUpEditError && <PopUpEditError ordenEdit={ordenEdit} />}
      {openModal && (
        <AgregarOrden
          setOpenModal={setOpenModal}
          ordenAdd={ordenAdd}
          setOrdenAdd={setOrdenAdd}
          ordenes={ordenes}
          setOrdenes={setOrdenes}
          setOpenPopUp={setOpenPopUp}
          productos={productos}
          clientes={clientes}
        />
      )} */}
      <div className="content">
        <div className="boton">
          <ColorButton
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Añadir Cliente
          </ColorButton>
        </div>

        <div className="tabla-personal">
          <div className="productos-list">
            <TableContainer component={Paper}>
              <Table
                // className={classes.table}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.head}>Id</TableCell>
                    <TableCell className={classes.head}>Nombre</TableCell>
                    <TableCell className={classes.head} align="center">
                      Rut
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
                  {loadingClientes ? (
                    clientes.map((cliente) => (
                      <TableRow hover="true" key={cliente.id_cliente}>
                        <TableCell component="th" scope="row">
                          {cliente.id_cliente}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {cliente.nombre_cliente}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {cliente.rut_cliente}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {cliente.telefono_cliente}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          <EditSharpIcon
                            className="editar"
                            // onClick={() => {
                            //   editarOrden(orden);
                            // }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>
                        {" "}
                        <div className="loading">
                          <CircularProgress />
                          {/* {"  "} <p>Cargando productos</p>{" "} */}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
