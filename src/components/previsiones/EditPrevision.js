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

function EditProceso({
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
      "https://gestex-backend.herokuapp.com/update/isapre",
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
          (obj) => obj.id_isapre === previsionEdit.id_isapre
        );
        aux[objIndex].nombre_isapre = previsionEdit.nombre_isapre;
        aux[objIndex].porcentaje_isapre = previsionEdit.porcentaje_isapre;
        setPrevisiones(aux);
        setOpenPopUpEdit(true);
        setTimeout(() => {
          setOpenPopUpEdit(false);
        }, 1999);
      }
    });
  };

  const handleDelete = () => {
    Axios.delete("https://gestex-backend.herokuapp.com/delete/isapre", {
      params: previsionEdit,
    }).then((response) => {
      setOpenEdit(false);
      const aux = [...previsiones];
      const objIndex = aux.findIndex(
        (obj) => obj.id_isapre === previsionEdit.id_isapre
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
                defaultValue={previsionEdit.id_isapre}
                disabled
              />

              <TextField
                label="Nombre Producto"
                defaultValue={previsionEdit.nombre_isapre}
                onChange={(event) => {
                  const { value } = event.target;
                  setPrevisionEdit({
                    ...previsionEdit,
                    nombre_isapre: value,
                    nombre_afp: "null",
                  });
                }}
              />
              <TextField
                label="Comision"
                defaultValue={previsionEdit.porcentaje_isapre}
                onChange={(event) => {
                  const { value } = event.target;
                  setPrevisionEdit({
                    ...previsionEdit,
                    porcentaje_isapre: value,
                    nombre_afp: "null",
                  });
                }}
              />
              <div className="accion">
                <ColorButton
                  className="boton-eliminar-producto-modal"
                  variant="contained"
                  onClick={handleDelete}
                >
                  Eliminar Previsi??n
                </ColorButton>
                <ColorButton
                  className="boton-editar-producto-modal"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Editar Previsi??n
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
