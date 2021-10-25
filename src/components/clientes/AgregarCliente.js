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

function AgregarCliente({
  setOpenModal,
  clienteAdd,
  setClienteAdd,
  clientes,
  setClientes,
  setOpenPopUp,
}) {
  const classesForm = useStylesForm();
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [mail, setMail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [comuna, setComuna] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");

  //Handlers para modificar los valores correspondientes a los datos del Personal
  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleChangeRut = (e) => {
    setRut(e.target.value);
  };
  const handleChangeMail = (e) => {
    setMail(e.target.value);
  };
  const handleChangeDireccion = (e) => {
    setDireccion(e.target.value);
  };
  const handleChangeComuna = (e) => {
    setComuna(e.target.value);
  };
  const handleChangeCiudad = (e) => {
    setCiudad(e.target.value);
  };
  const handleChangeTelefono = (e) => {
    setTelefono(e.target.value);
    setClienteAdd({
      nombre_cliente: nombre,
      rut_cliente: rut,
      correo_electronico_cliente: mail,
      direccion_cliente: direccion,
      comuna_cliente: comuna,
      ciudad_cliente: ciudad,
      telefono_cliente: telefono,
    });
  };

  //Handler para el boton de agregar producto
  const handleSubmit = (e) => {
    //Se previene el refresh automatico del form
    e.preventDefault();
    //Se hace la peticion Post a add/producto del productoAdd
    // console.log(personal);
    // //Max id para asignarselo al nuevo
    const max_id = clientes.reduce(
      (acc, cliente) =>
        (acc = acc > cliente.id_cliente ? acc : cliente.id_cliente),
      0
    );
    console.log(clienteAdd)
    //Ya que axios post
    Axios.post("http://localhost:3001/add/cliente", clienteAdd).then(
      (response) => {
        setOpenModal(false);
        if (response.status === 201) {
          setClientes([
            ...clientes,
            {
              id_cliente: max_id + 1,
              nombre_cliente: nombre,
              rut_cliente: rut,
              correo_electronico_cliente: mail,
              direccion_cliente: direccion,
              comuna_cliente: comuna,
              ciudad_cliente: ciudad,
              telefono_cliente: telefono,
            },
          ]);
          //Se cierra el modal de agregar
          //Se abre el popup de satisfaccion
          setOpenPopUp(true);
          //Se cierra el popup despues de 2 seg
          setTimeout(() => {
            setOpenPopUp(false);
          }, 2000);
        }
      }
    );
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
              <h1 className="producto-title">Agregar Cliente</h1>
              <hr className="divisor" id="agregar-producto" />

              <TextField label="Nombre Cliente" onChange={handleChangeNombre} />
              <TextField label="Rut" onChange={handleChangeRut} />
              <TextField label="Mail" onChange={handleChangeMail} />
              <TextField label="Direccioon" onChange={handleChangeDireccion} />
              <TextField label="Comuna" onChange={handleChangeComuna} />
              <TextField label="Ciudad" onChange={handleChangeCiudad} />
              <TextField label="Telefono" onChange={handleChangeTelefono} />

              <ColorButton
                className="boton-agregar-producto-modal"
                variant="contained"
                color="primary"
                type="submit"
              >
                Añadir Personal
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

export default AgregarCliente;
