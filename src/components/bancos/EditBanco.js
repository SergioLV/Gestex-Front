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

function EditBanco({
  setOpenModal,
  bancos,
  setBancos,
  setOpenEdit,
  bancoEdit,
  setBancoEdit,
  setOpenPopUpEdit,
  setOpenPopUpEditError,
  openPopUpEdit,
}) {
  const classesForm = useStylesForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(openPopUpEdit)

    Axios.put(
      "https://gestex-backend.herokuapp.com/update/banco/",
      bancoEdit
    ).then((response) => {
      setOpenEdit(false);
      const aux = [...bancos];
      if (!bancoEdit) {
        setOpenPopUpEditError(true);
        setTimeout(() => {
          setOpenPopUpEditError(false);
        }, 1999);
      } else {
        const objIndex = aux.findIndex(
          (obj) => obj.id_banco === bancoEdit.id_banco
        );
        aux[objIndex].nombre_banco = bancoEdit.nombre_banco;

        setBancos(aux);
        setOpenPopUpEdit(true);
        setTimeout(() => {
          setOpenPopUpEdit(false);
        }, 1999);
      }
    });
  };

  const handleDelete = () => {
    Axios.delete("https://gestex-backend.herokuapp.com/delete/banco", {
      params: bancoEdit,
    }).then((response) => {
      setOpenEdit(false);
      const aux = [...bancos];
      const objIndex = aux.findIndex(
        (obj) => obj.id_banco === bancoEdit.id_banco
      );
      aux.splice(objIndex, 1);
      setBancos(aux);
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
                defaultValue={bancoEdit.id_banco}
                disabled
              />

              <TextField
                label="Nombre Banco"
                defaultValue={bancoEdit.nombre_banco}
                onChange={(event) => {
                  const { value } = event.target;
                  setBancoEdit({
                    ...bancoEdit,
                    nombre_banco: value,
                  });
                }}
              />

              <div className="accion">
                <ColorButton
                  className="boton-eliminar-producto-modal"
                  variant="contained"
                  onClick={handleDelete}
                >
                  Eliminar Banco
                </ColorButton>
                <ColorButton
                  className="boton-editar-producto-modal"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Editar Banco
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

export default EditBanco;
