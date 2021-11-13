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
import AgregarPersonal from "../components/personal/AgregarPersonal";
import EditPersonal from "../components/personal/EditPersonal";

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

export default function Personal() {
  const classes = useStyles();
  const [loadingPersonal, setLoadingPersonal] = useState(false);

  //State que almacena la peticion HTTP a la api y contiene una lista de objetos con los personal
  const [personal, setPersonal] = useState([]);
  //State que almacena el personal al hacer click en el icono de edit
  const [personalEdit, setPersonalEdit] = useState([]);

  //State que almacena le personal que se agrega en el modal de agregar y luego se pasa al popup de satisfaccion
  const [personalAdd, setPersonalAdd] = useState("");
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

  const editarPersonal = (personal) => {
    // setBeforeEdit(producto);
    setPersonalEdit(personal);
    setOpenEdit(true);
  };

  useEffect(() => {
    const getPersonal = async () => {
      await Axios.get("https://gestex-backend.herokuapp.com/get/personal").then(
        (response) => {
          setLoadingPersonal(true);
          setPersonal(response.data);
        }
      );
    };
    getPersonal();
  }, []);

  return (
    <div className="productos">
      {openEdit && (
        <EditPersonal
          setOpenModal={setOpenModal}
          personal={personal}
          setPersonal={setPersonal}
          setOpenEdit={setOpenEdit}
          setPersonalEdit={setPersonalEdit}
          personalEdit={personalEdit}
          setOpenPopUpEdit={setOpenPopUpEdit}
          setOpenPopUpEditError={setOpenPopUpEditError}
          openPopUpEdit={openPopUpEdit}
          // setBeforeEdit={setBeforeEdit}
        />
      )}
      {openPopUp && <PopUp personalAdd={personalAdd} />}
      {openPopUpEdit && <PopUpEdit personalEdit={personalEdit} />}
      {openPopUpEditError && <PopUpEditError personalEdit={personalEdit} />}
      {openModal && (
        <AgregarPersonal
          setOpenModal={setOpenModal}
          personalAdd={personalAdd}
          setPersonalAdd={setPersonalAdd}
          personal={personal}
          setPersonal={setPersonal}
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
            Añadir Personal
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
                    <TableCell className={classes.head}>Rut</TableCell>

                    <TableCell className={classes.head}>
                      Fecha de ingreso
                    </TableCell>

                    <TableCell className={classes.head}>Sueldo Base</TableCell>
                    <TableCell className={classes.head}> Modificar </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingPersonal ? (
                    personal.map((persona) => (
                      <TableRow hover="true" key={persona.id_personal}>
                        <TableCell component="th" scope="row">
                          {persona.id_personal}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {persona.nombre_personal}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {persona.rut_personal}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {persona.fecha_ingreso}
                        </TableCell>

                        <TableCell component="th" scope="row">
                          {persona.sueldo_base}
                        </TableCell>

                        <TableCell component="th" scope="row" align="center">
                          <EditSharpIcon
                            className="editar"
                            onClick={() => {
                              editarPersonal(persona);
                            }}
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
