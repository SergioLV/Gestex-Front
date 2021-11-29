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

import FiltrarTicket from "../components/xtrabajador/FiltrarTicket";

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
  const [trabajadorAdd, setTrabajadorAdd] = useState([]);
  //State que almacena la peticion HTTP a la api y contiene una lista de objetos con los productos
  const [xTrabajador, setXtrabajador] = useState([]);
  const [personal, setPersonal] = useState([]);
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
    const getPersonal = async () => {
      await Axios.get("https://gestex-backend.herokuapp.com/get/personal").then(
        (response) => {
          setPersonal(response.data);
        }
      );
    };
    getPersonal();
  }, []);

  return (
    <div className="productos">
      {/* {openPopUp && <PopUp setXcliente={setXcliente} />}

      {openPopUpEditError && <PopUpEditError setXcliente={setXcliente} />} */}
      {openModal && (
        <FiltrarTicket
          setOpenModal={setOpenModal}
          setXtrabajador={setXtrabajador}
          setTrabajadorAdd={setTrabajadorAdd}
          trabajadorAdd={trabajadorAdd}
          setOpenPopUp={setOpenPopUp}
          personal={personal}
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
                    <TableCell className={classes.head}>
                      Nombre Personal
                    </TableCell>
                    <TableCell className={classes.head}>ID Ticket</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {xTrabajador.map((x) => (
                    <TableRow hover="true" key={x.nombre_personal}>
                      <TableCell component="th" scope="row">
                        {x.nombre_personal}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {x.id_ticket}
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
