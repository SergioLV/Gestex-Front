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

function EditPersonal({
  setOpenModal,
  personal,
  setPersonal,
  setOpenEdit,
  personalEdit,
  setPersonalEdit,
  setOpenPopUpEdit,
  setOpenPopUpEditError,
}) {
  const classesForm = useStylesForm();
  //State para lo que se va a enviar con la request. Al modificar el estado de personalEdit, tira error de que no es una funcion
  //Handler para almacenar la edicion del personal
  const handleChangeNombre = (e) => {
    setPersonalEdit({
      ...personalEdit,
      nombre_personal: e.target.value,
    });
  };
  const handleChangeRut = (e) => {
    setPersonalEdit({
      ...personalEdit,
      rut_personal: e.target.value,
    });
  };
  const handleChangeMail = (e) => {
    setPersonalEdit({
      ...personalEdit,
      correo_electronico_personal: e.target.value,
    });
  };
  const handleChangeDireccion = (e) => {
    setPersonalEdit({
      ...personalEdit,
      direccion_personal: e.target.value,
    });
  };
  const handleChangeComuna = (e) => {
    setPersonalEdit({
      ...personalEdit,
      comuna_personal: e.target.value,
    });
  };
  const handleChangeCiudad = (e) => {
    setPersonalEdit({
      ...personalEdit,
      ciudad_personal: e.target.value,
    });
  };
  const handleChangeTelefono = (e) => {
    setPersonalEdit({
      ...personalEdit,
      telefono_personal: e.target.value,
    });
  };
  const handleChangeFecha = (e) => {
    setPersonalEdit({
      ...personalEdit,
      fecha_ingreso: e.target.value,
    });
  };
  const handleChangeAFP = (e) => {
    setPersonalEdit({
      ...personalEdit,
      id_afp: e.target.value,
    });
  };
  const handleChangeIsapre = (e) => {
    setPersonalEdit({
      ...personalEdit,
      id_isapre: e.target.value,
    });
  };
  const handleChangeBanco = (e) => {
    setPersonalEdit({
      ...personalEdit,
      id_banco: e.target.value,
    });
  };
  const handleChangeCuenta = (e) => {
    setPersonalEdit({
      ...personalEdit,
      numero_cuenta: e.target.value,
    });
  };
  const handleChangeSueldo = (e) => {
    setPersonalEdit({
      ...personalEdit,
      sueldo_base: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(openPopUpEdit)

    Axios.put("https://gestex-backend.herokuapp.com/update/personal", personalEdit).then(
      (response) => {
        setOpenEdit(false);
        const aux = [...personal];
        console.log("aux",aux)
        if (!personalEdit) {
          setOpenPopUpEditError(true);
          setTimeout(() => {
            setOpenPopUpEditError(false);
          }, 1999);
        } else {
          const objIndex = aux.findIndex(
            (obj) => obj.id_personal === personalEdit.id_personal
          );
          aux[objIndex].nombre_personal = personalEdit.nombre_personal;
          setPersonal(aux);
          setOpenPopUpEdit(true);
          setTimeout(() => {
            setOpenPopUpEdit(false);
          }, 1999);
        }
      }
    );
  };

  const handleDelete = () => {
    console.log(personalEdit);
    Axios.delete("https://gestex-backend.herokuapp.com/delete/personal", {
      params: personalEdit,
    }).then((response) => {
      setOpenEdit(false);

      const aux = [...personal];
      const objIndex = aux.findIndex(
        (obj) => obj.id_personal === personalEdit.id_personal
      );
      aux.splice(objIndex, 1);
      setPersonal(aux);
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
                label="Nombre"
                defaultValue={personalEdit.id_personal}
                onChange={handleChangeNombre}
                disabled
              />
              <TextField
                label="Nombre"
                defaultValue={personalEdit.nombre_personal}
                onChange={handleChangeNombre}
              />
              <TextField
                label="Rut"
                defaultValue={personalEdit.rut_personal}
                onChange={handleChangeRut}
              />
              <TextField
                label="Mail"
                defaultValue={personalEdit.correo_electronico_personal}
                onChange={handleChangeMail}
              />
              <TextField
                label="Direccion"
                defaultValue={personalEdit.direccion_personal}
                onChange={handleChangeDireccion}
              />
              <TextField
                label="Comuna"
                defaultValue={personalEdit.comuna_personal}
                onChange={handleChangeComuna}
              />
              <TextField
                label="Ciudad"
                defaultValue={personalEdit.ciudad_personal}
                onChange={handleChangeCiudad}
              />
              <TextField
                label="Telefono"
                defaultValue={personalEdit.telefono_personal}
                onChange={handleChangeTelefono}
              />
              <TextField
                label="Fecha de ingreso"
                defaultValue={personalEdit.fecha_ingreso}
                onChange={handleChangeFecha}
              />
              <TextField
                label="Id AFP"
                defaultValue={personalEdit.id_afp}
                onChange={handleChangeAFP}
              />
              <TextField
                label="Id Isapre"
                defaultValue={personalEdit.id_isapre}
                onChange={handleChangeIsapre}
              />
              <TextField
                label="Id Banco"
                defaultValue={personalEdit.id_banco}
                onChange={handleChangeBanco}
              />
              <TextField
                label="Numero de cuenta"
                defaultValue={personalEdit.numero_cuenta}
                onChange={handleChangeCuenta}
              />
              <TextField
                label="Sueldo Base"
                defaultValue={personalEdit.sueldo_base}
                onChange={handleChangeSueldo}
              />

              <div className="accion">
                <ColorButton
                  className="boton-eliminar-producto-modal"
                  variant="contained"
                  onClick={handleDelete}
                >
                  Eliminar Personal
                </ColorButton>

                <ColorButton
                  className="boton-editar-producto-modal"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Editar Personal
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

export default EditPersonal;
