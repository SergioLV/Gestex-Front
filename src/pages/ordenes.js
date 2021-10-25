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

  //State que almacena la peticion HTTP a la api y contiene una lista de objetos con los productos
  const [ordenes, setOrdenes] = useState([]);
  //State que almacena el producto al hacer click en el icono de edit
  const [ordenEdit, setOrdenEdit] = useState([]);
  //State que almacena le producto que se agrega en el modal de agregar y luego se pasa al popup de satisfaccion
  const [ordenAdd, setOrdenAdd] = useState("");

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

  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  //State para mostrar el producto que se edito
  const [beforeEdit, setBeforeEdit] = useState([]);

  //Funcion que llama a get/productos y almacena en productos una lista de objetos con todos los productos de la tabla productos
  
  const editarOrden = (orden) => {
    // setBeforeEdit(producto);
    setOrdenEdit(orden);
    setOpenEdit(true);
  };
  
  useEffect(() => {
    const getClientes = async () => {
      await Axios.get("http://localhost:3001/get/clientes").then((response) => {
        setClientes(response.data);
        console.log(ordenes)
      });
    };
    getClientes();
  }, []);
  useEffect(() => {
    const getProductos = async () => {
      await Axios.get("https://gestex-backend.herokuapp.com/get/productos").then((response) => {
        setProductos(response.data);
      });
    };
    getProductos();
  }, []);
  useEffect(() => {
    const getOrdenes = async () => {
      await Axios.get("http://localhost:3001/get/ordenes").then((response) => {
        setOrdenes(response.data);
        console.log(ordenes)
      });
    };
    getOrdenes();
  }, []);
  useEffect(() => {
    const getOrdenes = async () => {
      await Axios.get("http://localhost:3001/get/ordenes").then((response) => {
        setOrdenes(response.data);
        console.log(ordenes)
      });
    };
    getOrdenes();
  }, []);

  return (
    <div className="productos">
      {openEdit && (
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
      {openPopUpEdit && (
        <PopUpEdit ordenEdit={ordenEdit}  />
      )}
      {openPopUpEditError && (<PopUpEditError ordenEdit={ordenEdit}/>)}
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
            Añadir Orden
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
                    <TableCell className={classes.head}>Id Orden</TableCell>
                    <TableCell className={classes.head}>
                     Id Cliente
                    </TableCell>
                    <TableCell className={classes.head}>
                     Id Producto
                    </TableCell>
                    <TableCell className={classes.head}>
                     Comentario
                    </TableCell>
                    <TableCell className={classes.head}>
                     Fecha Entrega
                    </TableCell>
                    <TableCell className={classes.head}>
                     Cantidad
                    </TableCell>
                    <TableCell className={classes.head}> Modificar </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordenes.map((orden) => (
                    <TableRow hover="true" key={orden.id_orden}>
                      <TableCell component="th" scope="row">
                        {orden.id_ordenes_de_corte}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {orden.id_cliente}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {orden.id_producto}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {orden.comentario}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {orden.fecha_entrega}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {orden.cantidad}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                      <EditSharpIcon
                          className="editar"
                          onClick={() => {
                            editarOrden(orden);
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
