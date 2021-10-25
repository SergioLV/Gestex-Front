import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { Auth0Context } from "@auth0/auth0-react";
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

function EditProceso({
  setOpenModal,
  procesos,
  setProcesos,
  setOpenPopUp,
  setOpenEdit,
  setOpenPopUpEdit,
  setOpenPopUpEditError,
  procesoEdit,
  setProcesoEdit,
}) {
  const classesForm = useStylesForm();
  //State para lo que se va a enviar con la request. Al modificar el estado de productoEdit, tira error de que no es una funcion

  //Handler para almacenar la edicion del producto
  const handleChangeNombre = (e) => {
    setProcesoEdit({ ...procesoEdit, nombre_proceso: e.target.value });
  };
  const handleChangePrecio = (e) => {
    setProcesoEdit({ ...procesoEdit, precio: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(openPopUpEdit)

    Axios.put(
      "https://gestex-backend.herokuapp.com/update/proceso/",
      procesoEdit
    ).then((response) => {
      setOpenEdit(false);
      const aux = [...procesos];
      if (!procesoEdit) {
        setOpenPopUpEditError(true);
        setTimeout(() => {
          setOpenPopUpEditError(false);
        }, 1999);
      } else {
        const objIndex = aux.findIndex(
          (obj) => obj.id_proceso === procesoEdit.id_proceso
        );
        aux[objIndex].nombre_proceso = procesoEdit.nombre_proceso;
        aux[objIndex].precio = procesoEdit.precio;
        setProcesos(aux);
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
    console.log(procesoEdit);
    Axios.delete("https://gestex-backend.herokuapp.com/delete/proceso", {
      params: procesoEdit,
    }).then((response) => {
      setOpenEdit(false);
      const aux = [...procesos];
      const objIndex = aux.findIndex(
        (obj) => obj.id_proceso === procesoEdit.id_proceso
      );
      aux.splice(objIndex, 1);
      setProcesos(aux);
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
                label="Id Proceso"
                defaultValue={procesoEdit.id_proceso}
                disabled
              />
              <TextField
                className="id_producto_edit"
                label="Id Producto"
                defaultValue={procesoEdit.id_producto}
                disabled
              />
              <TextField
                label="Nombre Producto"
                defaultValue={procesoEdit.nombre_proceso}
                onChange={handleChangeNombre}
              />
              <TextField
                label="Precio"
                defaultValue={procesoEdit.precio}
                onChange={handleChangePrecio}
              />
              <div className="accion">
                <ColorButton
                  className="boton-eliminar-producto-modal"
                  variant="contained"
                  onClick={handleDelete}
                >
                  Eliminar Proceso
                </ColorButton>
                <ColorButton
                  className="boton-editar-producto-modal"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Editar Proceso
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

export default EditProceso;
