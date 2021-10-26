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


import Button from "@material-ui/core/Button";

import PopUp from "../components/modals/PopUp";
import PopUpEditError from "../components/modals/PopUpEditError";
import FiltrarProducto from "../components/xcliente/FiltrarProducto";

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
const [clienteAdd, setClienteAdd] = useState([]);
  //State que almacena la peticion HTTP a la api y contiene una lista de objetos con los productos
  const [xCliente, setXcliente] = useState([]);
  //State que almacena el producto al hacer click en el icono de edit
  
  //State del
  //Estado del modal para agregar y editar producto
  const [openModal, setOpenModal] = useState(false);
  //State del popup para el feedback de producto agregado satisfactoriamente
  const [openPopUp, setOpenPopUp] = useState(false);
  //State del popup para el feedback de producto editado satisfactoriamente
  //State del popup para el feedback de producto editado ha producido un error
  const [openPopUpEditError, setOpenPopUpEditError] = useState(false);

  const [clientes, setClientes] = useState([]);
 

  //State para mostrar el producto que se edito

  //Funcion que llama a get/productos y almacena en productos una lista de objetos con todos los productos de la tabla productos

  
  useEffect(() => {
    const getClientes = async () => {
      await Axios.get("https://gestex-backend.herokuapp.com/get/clientes").then((response) => {
        setClientes(response.data);
      });
    };
    getClientes()
  }, []);
//   useEffect(() => {
//     const getXClientes = async () => {
//       await Axios.get("http://localhost:3001/get/xcliente",{params:{cliente:cliente}}).then((response) => {
//         setClientes(response.data);
//       });
//     };
//     getXClientes();
//   }, []);

  return (
    <div className="productos">
      
      {openPopUp && <PopUp setXcliente={setXcliente} />}
     
      {openPopUpEditError && (<PopUpEditError setXcliente={setXcliente}/>)}
      {openModal && (
        <FiltrarProducto
        setOpenModal={setOpenModal}
        setXcliente={setXcliente}
        setClienteAdd={setClienteAdd}
        clienteAdd={clienteAdd}
        
        setOpenPopUp={setOpenPopUp}
    
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
            Filtrar
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
                    <TableCell className={classes.head}>Nombre Cliente</TableCell>
                    <TableCell className={classes.head}>
                     Producto
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {xCliente.map((producto) => (
                    <TableRow hover="true" key={producto.nombre_cliente}>
                      <TableCell component="th" scope="row">
                        {producto.nombre_cliente}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {producto.nombre_producto}
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
