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

function EditCliente({
    setOpenModal,
    clientes,
    setClientes,
    setOpenEdit,
    clienteEdit,
    setOpenPopUpEdit,
    setOpenPopUpEditError,
    openPopUpEdit,
}) {
  const classesForm = useStylesForm();
  //State para lo que se va a enviar con la request. Al modificar el estado de personalEdit, tira error de que no es una funcion
  const [updatedCliente, setUpdatedCliente] = useState();

  //Handler para almacenar la edicion del personal
  const handleChangeNombre = (e) => {
    setUpdatedCliente({
      id_personal: clienteEdit.id_cliente,
      nombre_personal: e.target.value,
    });
    
  };
 
  const handleSubmit = (e) => {
    console.log(clienteEdit)
    e.preventDefault();
    // console.log(openPopUpEdit)
    
    // Axios.put("http://localhost:3001/update/personal", updatedPersonal).then(
    //   (response) => {
    //     setOpenEdit(false);
    //     const aux = [...personal]
    //     if(!updatedPersonal){
    //       setOpenPopUpEditError(true);
    //       setTimeout(() => {setOpenPopUpEditError(false); }, 1999);
    //     }else{
    //       const objIndex = aux.findIndex(
    //         (obj) => obj.id_personal === updatedPersonal.id_personal
    //       );
    //       aux[objIndex].nombre_personal = updatedPersonal.nombre_personal;
    //       setPersonal(aux)
    //       setOpenPopUpEdit(true)
    //       setTimeout(() => {  setOpenPopUpEdit(false); }, 1999);
    //     }
    //   }
    // );
  };

  const handleDelete = () => {
    // Axios.delete("https://gestex-backend.herokuapp.com/delete/personal", {params: personalEdit}).then(
    //   (response) => {
    //     setOpenEdit(false);

    //     console.log(response)
    //     const aux = [...personal]
    //     const objIndex = aux.findIndex(
    //       (obj) => obj.id_personal === personalEdit.id_personal
    //     );
    //     aux.splice(objIndex,1);
    //      setPersonal(aux)
    //     setOpenPopUpEdit(true)
    //     console.log(updatedPersonal)
    //     console.log(personal)
    //     setTimeout(() => {  setOpenPopUpEdit(false); }, 1999);
    //   }
    // );

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
                label="Id cliente"
                disabled
                defaultValue={clienteEdit.id_cliente}
                onChange={handleChangeNombre}
              />
              <TextField
                label="Nombre"
                disabled
                defaultValue={clienteEdit.nombre_cliente}
                onChange={handleChangeNombre}
              />
              <TextField
                label="Nombre"
                disabled
                defaultValue={clienteEdit.rut_cliente}
                onChange={handleChangeNombre}
              />
               
              
          <div className="accion">

              <ColorButton
                className="boton-eliminar-producto-modal"
                variant="contained"
                onClick={handleDelete}
              >
                Eliminar Cliente
              </ColorButton>
              <ColorButton
                className="boton-editar-producto-modal"
                variant="contained"
                color="primary"
                type="submit"
              >
                Editar Cliente
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

export default EditCliente;
