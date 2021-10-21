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

function EditPersonal({
  setOpenModal,
  personal,
  setPersonal,
  setOpenEdit,
  personalEdit,
  setPersonalEdit,
  setOpenPopUpEdit,
  setOpenPopUpEditError,
  openPopUpEdit,
}) {
  const classesForm = useStylesForm();
  //State para lo que se va a enviar con la request. Al modificar el estado de personalEdit, tira error de que no es una funcion
  const [updatedPersonal, setUpdatedPersonal] = useState();

  //Handler para almacenar la edicion del personal
  const handleChangeNombre = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      nombre_personal: e.target.value,
    });
    
  };
  const handleChangeRut = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      rut_personal: e.target.value,
    });
    
  };
  const handleChangeMail = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      correo_electronico_personal: e.target.value,
    });

  };
  const handleChangeDireccion = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      direccion_personal: e.target.value,
    });
    
  };
  const handleChangeComuna = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      comuna_personal: e.target.value,
    });
    
  };
  const handleChangeCiudad = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      ciudad_personal: e.target.value,
    });
    
  };
  const handleChangeTelefono = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      telefono_personal: e.target.value,
    });
    
  };
  const handleChangeFecha = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      fecha_ingreso: e.target.value,
    });
    
  };
  const handleChangeAFP = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      id_afp: e.target.value,
    });
    
  };
  const handleChangeIsapre = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      id_isapre: e.target.value,
    });
    
  };
  const handleChangeBanco = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      id_banco: e.target.value,
    });
  
  };
  const handleChangeCuenta = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      numero_cuenta: e.target.value,
    });
  };
  const handleChangeSueldo = (e) => {
    setUpdatedPersonal({
      id_personal: personalEdit.id_personal,
      sueldo_base: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(openPopUpEdit)
    
    Axios.put("http://localhost:3001/update/personal", updatedPersonal).then(
      (response) => {
        setOpenEdit(false);
        const aux = [...personal]
        if(!updatedPersonal){
          setOpenPopUpEditError(true);
          setTimeout(() => {setOpenPopUpEditError(false); }, 1999);
        }else{
          const objIndex = aux.findIndex(
            (obj) => obj.id_personal === updatedPersonal.id_personal
          );
          aux[objIndex].nombre_personal = updatedPersonal.nombre_personal;
          setPersonal(aux)
          setOpenPopUpEdit(true)
          setTimeout(() => {  setOpenPopUpEdit(false); }, 1999);
        }
      }
    );
  };

  const handleDelete = () => {
    console.log(personalEdit)
    Axios.delete("http://localhost:3001/delete/personal", {params: personalEdit}).then(
      (response) => {
        setOpenEdit(false);

        console.log(response)
        const aux = [...personal]
        const objIndex = aux.findIndex(
          (obj) => obj.id_personal === personalEdit.id_personal
        );
        aux.splice(objIndex,1);
         setPersonal(aux)
        setOpenPopUpEdit(true)
        console.log(updatedPersonal)
        console.log(personal)
        setTimeout(() => {  setOpenPopUpEdit(false); }, 1999);
      }
    );

  }

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
                className="boton-editar-producto-modal"
                variant="contained"
                color="primary"
                type="submit"
              >
                Editar Personal
              </ColorButton>
              <ColorButton
                className="boton-eliminar-producto-modal"
                variant="contained"
                onClick={handleDelete}
              >
                Eliminar Personal
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
