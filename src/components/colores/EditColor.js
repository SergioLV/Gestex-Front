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

function EditProductos({
  setOpenModal,
  colores,
  setColores,
  setOpenEdit,
  colorEdit,
  setColorEdit,
  setOpenPopUpEdit,
  setOpenPopUpEditError,
  openPopUpEdit,
}) {
  const classesForm = useStylesForm();
  //State para lo que se va a enviar con la request. Al modificar el estado de productoEdit, tira error de que no es una funcion

  //Handler para almacenar la edicion del producto

  const handleSubmit = (e) => {
    console.log(colorEdit);
    e.preventDefault();
    // console.log(openPopUpEdit)

    Axios.put(
      "https://gestex-backend.herokuapp.com/update/color/",
      colorEdit
    ).then((response) => {
      setOpenEdit(false);
      const aux = [...colores];
      if (!colorEdit) {
        setOpenPopUpEditError(true);
        setTimeout(() => {
          setOpenPopUpEditError(false);
        }, 1999);
      } else {
        const objIndex = aux.findIndex(
          (obj) => obj.id_color === colorEdit.id_color
        );
        aux[objIndex].nombre_color = colorEdit.nombre_color;
        setColores(aux);
        setOpenPopUpEdit(true);
        // console.log(updatedProducto)
        // console.log(productos)
        setTimeout(() => {
          setOpenPopUpEdit(false);
        }, 1999);
      }
    });
  };

  const handleDelete = () => {
    Axios.delete("https://gestex-backend.herokuapp.com/delete/color", {
      params: colorEdit,
    }).then((response) => {
      setOpenEdit(false);

      const aux = [...colores];
      const objIndex = aux.findIndex(
        (obj) => obj.id_color === colorEdit.id_color
      );
      aux.splice(objIndex, 1);
      setColores(aux);
      setOpenPopUpEdit(true);
      setTimeout(() => {
        setOpenPopUpEdit(false);
      }, 1999);
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
              <h1 className="producto-title">Editar </h1>
              <hr className="divisor" id="agregar-producto" />
              <TextField
                className="id_producto_edit"
                label="Id Color"
                defaultValue={colorEdit.id_color}
                disabled
              />
              <TextField
                label="Color"
                defaultValue={colorEdit.nombre_color}
                onChange={(event) => {
                  const { value } = event.target;
                  setColorEdit({ ...colorEdit, nombre_color: value });
                }}
              />
              <div className="accion">
                <ColorButton
                  className="boton-eliminar-producto-modal"
                  variant="contained"
                  onClick={handleDelete}
                >
                  Eliminar Color
                </ColorButton>
                <ColorButton
                  className="boton-editar-producto-modal"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Editar Color
                </ColorButton>
              </div>
            </form>
          </div>
          <div className="borde">
            <CloseIcon
              className="close"
              onClick={() => {
                setOpenEdit(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductos;
