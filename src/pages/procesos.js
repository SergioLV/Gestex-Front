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

import Button from "@material-ui/core/Button";

import PopUp from "../components/modals/PopUp";
import PopUpEdit from "../components/modals/PopUpEdit";
import AgregarProceso from "../components/procesos/AgregarProceso";
import EditProceso from "../components/procesos/EditProceso";

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

export default function Procesos() {
  const classes = useStyles();

  //State que almacena la peticion HTTP a la api y contiene una lista de objetos con los procesos
  const [procesos, setProcesos] = useState([]);
  //State que almacena la peticion HTTP a la api y contiene una lista de objetos con los productos
  const [productos, setProductos] = useState([]);
  //State que almacena el producto al hacer click en el icono de edit
  const [procesoEdit, setProcesoEdit] = useState([]);

  //State que almacena le producto que se agrega en el modal de agregar y luego se pasa al popup de satisfaccion
  const [procesoAdd, setProcesoAdd] = useState({});
  //State del
  const [openEdit, setOpenEdit] = useState(false);
  //Estado del modal para agregar y editar producto
  const [openModal, setOpenModal] = useState(false);
  //State del popup para el feedback de producto agregado satisfactoriamente
  const [openPopUp, setOpenPopUp] = useState(false);
  //State del popup para el feedback de producto editado satisfactoriamente
  const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
  const [openPopUpEditError, setOpenPopUpEditError] = useState(false);

  //State para mostrar el producto que se edito
  const [beforeEdit, setBeforeEdit] = useState([]);

  //Funcion que llama a get/productos y almacena en productos una lista de objetos con todos los productos de la tabla productos
  const getProcesos = async () => {
    await Axios.get("https://gestex-backend.herokuapp.com/get/procesos").then((response) => {
      setProcesos(response.data);
    });
  };
  const getProductos = async () => {
    await Axios.get("https://gestex-backend.herokuapp.com/get/productos").then((response) => {
      setProductos(response.data);
    });
  };

  const editarProceso = (proceso) => {
    // setBeforeEdit(producto);
    setProcesoEdit(proceso);
    setOpenEdit(true);
  };
  useEffect(() => {
    getProcesos();
  }, []);
  useEffect(() => {
    getProductos();
  }, []);
  return (
    <div className="procesos">
      {openEdit && (
        <EditProceso
        setOpenModal={setOpenModal}
        procesoAdd={procesoAdd}
        setProcesoAdd={setProcesoAdd}
        procesos={procesos}
        setProcesos={setProcesos}
        setOpenPopUp={setOpenPopUp}
        productos={productos}
        setOpenEdit={setOpenEdit}
        setOpenPopUpEdit={setOpenPopUpEdit}
        setOpenPopUpEditError={setOpenPopUpEditError}
        procesoEdit={procesoEdit}
        setProcesoEdit={setProcesoEdit}
        />
      )}
      {openPopUp && <PopUp procesoAdd={procesoAdd} />}
      {openPopUpEdit && (
        <PopUpEdit procesoEdit={procesoEdit}  />
      )}
      {openModal && (
        <AgregarProceso
        setOpenModal={setOpenModal}
        procesoAdd={procesoAdd}
        setProcesoAdd={setProcesoAdd}
        procesos={procesos}
        setProcesos={setProcesos}
        setOpenPopUp={setOpenPopUp}
        productos={productos}
        />
      )}
      <div className="content">
        <div className="boton">
          <ColorButton
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Añadir Proceso
          </ColorButton>
        </div>

        <div className="tabla-personal">
          <div className="productos-list">
            <TableContainer component={Paper}>
              <Table
                // className={classes.table}
                aria-label="simple table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.head}>Id Proceso</TableCell>
                    <TableCell className={classes.head}>
                      Nombre Proceso
                    </TableCell>
                    <TableCell className={classes.head}>
                      Precio
                    </TableCell>
                    <TableCell className={classes.head}>
                      Id Producto
                    </TableCell>
                    <TableCell className={classes.head}> Modificar </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {procesos.map((proceso) => (
                    <TableRow hover="true" key={proceso.id_proceso}>
                      <TableCell component="th" scope="row">
                        {proceso.id_proceso}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {proceso.nombre_proceso}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {proceso.precio}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {proceso.id_producto}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <EditSharpIcon
                          className="editar"
                          onClick={() => {
                            editarProceso(proceso);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
