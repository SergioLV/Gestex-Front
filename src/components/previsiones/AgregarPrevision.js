import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStylesForm = makeStyles((theme) => ({
  root: {
    "& > *": {
      //   margin: theme.spacing(1),
      width: "14rem",
      display: "block",
    },
    "& label.Mui-focused": {
      color: "#F55D3E",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#F55D3E",
    },
  },
}));
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

function AgregarPrevision({
  previsionAdd,
  setPrevisionAdd,
  previsiones,
  setPrevisiones,
  setOpenModal,
  setOpenPopUp,
}) {
  const classesForm = useStylesForm();
  const [nombre, setNombre] = useState("");
  const [comision, setComision] = useState("");
  //Handler para modificar el producto que se inserta y que se le pasa al PopUp de satisfaccion

  //Handler para el boton de agregar producto
  const handleSubmit = (e) => {
    //Se previene el refresh automatico del form
    e.preventDefault();
    // setPrevisionAdd({ nombre: nombre, comision: comision });
    // console.log(previsionAdd);
    //Se hace la peticion Post a add/producto del productoAdd
    //Max id para asignarselo al nuevo
    const max_id = previsiones.reduce(
      (acc, prevision) =>
        (acc = acc > previsiones.id_isapre ? acc : prevision.id_isapre),
      0
    );
    //Ya que axios post
    Axios.post("https://gestex-backend.herokuapp.com/add/isapre", {
      nombre: nombre,
      comision: comision,
    }).then((response) => {
      if (response.status === 201) {
        // getProducto(productoAdd);
        setPrevisiones([
          ...previsiones,
          {
            id_isapre: max_id + 1,
            nombre_isapre: nombre,
            porcentaje_isapre: comision,
          },
        ]);
        setPrevisionAdd({
          id_isapre: max_id + 1,
          nombre_isapre: nombre,
          porcentaje_isapre: comision,
          nombre_afp: "null",
        });
        //Se cierra el modal de agregar
        setOpenModal(false);
        //Se abre el popup de satisfaccion
        setOpenPopUp(true);
        //Se cierra el popup despues de 2 seg
        setTimeout(() => {
          setOpenPopUp(false);
        }, 2000);
      }
    });
  };

  return (
    <div>
      <div className="background-agregar">
        <div className="agregar">
          <div className="formulario-producto">
            <form
              className={classesForm.root}
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <h1 className="producto-title">Agregar Previsi??n</h1>
              <hr className="divisor" id="agregar-producto" />
              <TextField
                label="Nombre Previsi??n"
                onChange={(event) => {
                  const { value } = event.target;
                  setNombre(value);
                }}
              />
              <TextField
                label="Comisi??n (%)"
                onChange={(event) => {
                  const { value } = event.target;
                  setComision(value);
                }}
              />
              <ColorButton
                className="boton-agregar-producto-modal"
                variant="contained"
                color="primary"
                type="submit"
              >
                A??adir Previsi??n
              </ColorButton>
            </form>
          </div>
          <div className="borde">
            <CloseIcon
              className="close"
              onClick={() => {
                setOpenModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgregarPrevision;
