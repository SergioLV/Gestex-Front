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
import AgregarProducto from "../components/productos/AgregarProducto";
import EditProductos from "../components/productos/EditProductos";

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
  const [productos, setProductos] = useState([]);
  //State que almacena el producto al hacer click en el icono de edit
  const [productoEdit, setProductoEdit] = useState([]);

  //State que almacena le producto que se agrega en el modal de agregar y luego se pasa al popup de satisfaccion
  const [productoAdd, setProductoAdd] = useState("");
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
  const [beforeEdit, setBeforeEdit] = useState([]);

  //Funcion que llama a get/productos y almacena en productos una lista de objetos con todos los productos de la tabla productos
  const getProductos = async () => {
    await Axios.get("https://gestex-backend.herokuapp.com/get/productos").then((response) => {
      setProductos(response.data);
    });
  };

  const editarProducto = (producto) => {
    // setBeforeEdit(producto);
    setProductoEdit(producto);
    setOpenEdit(true);
  };
  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="productos">
      {openEdit && (
        <EditProductos
          setOpenModal={setOpenModal}
          productos={productos}
          setProductos={setProductos}
          setOpenEdit={setOpenEdit}
          productoEdit={productoEdit}
          setOpenPopUpEdit={setOpenPopUpEdit}
          setOpenPopUpEditError={setOpenPopUpEditError}
          openPopUpEdit={openPopUpEdit}
          // setBeforeEdit={setBeforeEdit}
        />
      )}
      {openPopUp && <PopUp productoAdd={productoAdd} />}
      {openPopUpEdit && (
        <PopUpEdit productoEdit={productoEdit}  />
      )}
      {openPopUpEditError && (<PopUpEditError productoEdit={productoEdit}/>)}
      {openModal && (
        <AgregarProducto
          setOpenModal={setOpenModal}
          productoAdd={productoAdd}
          setProductoAdd={setProductoAdd}
          productos={productos}
          setProductos={setProductos}
          setOpenPopUp={setOpenPopUp}
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
            Añadir Producto
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
                    <TableCell className={classes.head}>Id Producto</TableCell>
                    <TableCell className={classes.head}>
                      Nombre Producto
                    </TableCell>
                    <TableCell className={classes.head}> Modificar </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productos.map((producto) => (
                    <TableRow hover="true" key={producto.id_producto}>
                      <TableCell component="th" scope="row">
                        {producto.id_producto}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {producto.nombre_producto}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <EditSharpIcon
                          className="editar"
                          onClick={() => {
                            editarProducto(producto);
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
