import React from "react";
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

function EditAfp({
  setOpenModal,
  previsiones,
  setPrevisiones,
  setOpenPopUp,
  setOpenEdit,
  setOpenPopUpEdit,
  setOpenPopUpEditError,
  previsionEdit,
  setPrevisionEdit,
}) {
  const classesForm = useStylesForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(openPopUpEdit)

    Axios.put(
      "https://gestex-backend.herokuapp.com/update/afp/",
      previsionEdit
    ).then((response) => {
      setOpenEdit(false);
      const aux = [...previsiones];
      if (!previsionEdit) {
        setOpenPopUpEditError(true);
        setTimeout(() => {
          setOpenPopUpEditError(false);
        }, 1999);
      } else {
        const objIndex = aux.findIndex(
          (obj) => obj.id_afp === previsionEdit.id_afp
        );
        aux[objIndex].nombre_afp = previsionEdit.nombre_afp;
        aux[objIndex].porcentaje_afp = previsionEdit.porcentaje_afp;
        setPrevisiones(aux);
        setOpenPopUpEdit(true);
        setTimeout(() => {
          setOpenPopUpEdit(false);
        }, 1999);
      }
    });
  };

  const handleDelete = () => {
    Axios.delete("https://gestex-backend.herokuapp.com/delete/afp", {
      params: previsionEdit,
    }).then((response) => {
      setOpenEdit(false);
      const aux = [...previsiones];
      const objIndex = aux.findIndex(
        (obj) => obj.id_afp === previsionEdit.id_afp
      );
      aux.splice(objIndex, 1);
      setPrevisiones(aux);
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
              <h1 className="producto-title">Editar</h1>
              <hr className="divisor" id="agregar-producto" />
              <TextField
                className="id_producto_edit"
                label="Id Prevision"
                defaultValue={previsionEdit.id_afp}
                disabled
              />

              <TextField
                label="Nombre Producto"
                defaultValue={previsionEdit.nombre_afp}
                onChange={(event) => {
                  const { value } = event.target;
                  setPrevisionEdit({ ...previsionEdit, nombre_afp: value });
                }}
              />
              <TextField
                label="Comision"
                defaultValue={previsionEdit.porcentaje_afp}
                onChange={(event) => {
                  const { value } = event.target;
                  setPrevisionEdit({ ...previsionEdit, porcentaje_afp: value });
                }}
              />
              <div className="accion">
                <ColorButton
                  className="boton-eliminar-producto-modal"
                  variant="contained"
                  onClick={handleDelete}
                >
                  Eliminar Afp
                </ColorButton>
                <ColorButton
                  className="boton-editar-producto-modal"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Editar Afp
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

export default EditAfp;
