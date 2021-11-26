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
  setClienteEdit,
}) {
  const classesForm = useStylesForm();
  //State para lo que se va a enviar con la request. Al modificar el estado de clienteEdit, tira error de que no es una funcion
  const [updatedCliente, setUpdatedCliente] = useState();

  //Handler para almacenar la edicion del personal
  const handleChangeId = (e) => {
    setClienteEdit({
      ...clienteEdit,
      id_cliente: e.target.value,
    });
  };
  const handleChangeNombre = (e) => {
    setClienteEdit({
      ...clienteEdit,
      nombre_cliente: e.target.value,
    });
  };
  const handleChangeRut = (e) => {
    setClienteEdit({
      ...clienteEdit,
      rut_cliente: e.target.value,
    });
  };
  const handleChangeCorreo = (e) => {
    setClienteEdit({
      ...clienteEdit,
      correo_electronico_cliente: e.target.value,
    });
  };
  const handleChangeDireccion = (e) => {
    setClienteEdit({
      ...clienteEdit,
      direccion_cliente: e.target.value,
    });
  };
  const handleChangeComuna = (e) => {
    setClienteEdit({
      ...clienteEdit,
      comuna_cliente: e.target.value,
    });
  };
  const handleChangeCiudad = (e) => {
    setClienteEdit({
      ...clienteEdit,
      ciudad_cliente: e.target.value,
    });
  };
  const handleChangeTelefono = (e) => {
    setClienteEdit({
      ...clienteEdit,
      telefono_cliente: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    console.log(clienteEdit);
    e.preventDefault();
    // console.log(openPopUpEdit)

    Axios.put("http://localhost:3001/update/cliente", clienteEdit).then(
      (response) => {
        setOpenEdit(false);
        const aux = [...clientes];
        if (!clienteEdit) {
          setOpenPopUpEditError(true);
          setTimeout(() => {
            setOpenPopUpEditError(false);
          }, 1999);
        } else {
          const objIndex = aux.findIndex(
            (obj) => obj.id_cliente === clienteEdit.id_cliente
          );
          aux[objIndex].nombre_cliente = clienteEdit.nombre_cliente;
          aux[objIndex].rut_cliente = clienteEdit.rut_cliente;
          aux[objIndex].correo_electronico_cliente =
            clienteEdit.correo_electronico_cliente;
          aux[objIndex].direccion_cliente = clienteEdit.direccion_cliente;
          aux[objIndex].comuna_cliente = clienteEdit.comuna_cliente;
          aux[objIndex].ciudad_cliente = clienteEdit.ciudad_cliente;
          aux[objIndex].telefono_cliente = clienteEdit.telefono_cliente;
          setClientes(aux);
          setOpenPopUpEdit(true);
          setTimeout(() => {
            setOpenPopUpEdit(false);
          }, 1999);
        }
      }
    );
  };

  const handleDelete = () => {
    Axios.delete("https://gestex-backend.herokuapp.com/delete/cliente", {
      params: clienteEdit,
    }).then((response) => {
      setOpenEdit(false);
      const aux = [...clientes];
      const objIndex = aux.findIndex(
        (obj) => obj.id_cliente === clienteEdit.id_cliente
      );
      aux.splice(objIndex, 1);
      setClientes(aux);
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
                label="Id cliente"
                disabled
                defaultValue={clienteEdit.id_cliente}
                onChange={handleChangeId}
              />
              <TextField
                label="Nombre cliente"
                defaultValue={clienteEdit.nombre_cliente}
                onChange={handleChangeNombre}
              />
              <TextField
                label="Rut cliente"
                defaultValue={clienteEdit.rut_cliente}
                onChange={handleChangeRut}
              />

              <TextField
                label="Correo cliente"
                defaultValue={clienteEdit.correo_electronico_cliente}
                onChange={handleChangeCorreo}
              />
              <TextField
                label="Direccion cliente"
                defaultValue={clienteEdit.direccion_cliente}
                onChange={handleChangeDireccion}
              />
              <TextField
                label="Comuna cliente"
                defaultValue={clienteEdit.comuna_cliente}
                onChange={handleChangeComuna}
              />
              <TextField
                label="Ciudad cliente"
                defaultValue={clienteEdit.ciudad_cliente}
                onChange={handleChangeCiudad}
              />
              <TextField
                label="Telefono cliente"
                defaultValue={clienteEdit.telefono_cliente}
                onChange={handleChangeTelefono}
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
