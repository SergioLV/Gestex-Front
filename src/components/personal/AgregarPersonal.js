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

function AgregarPersonal({
  personalAdd,
  setPersonalAdd,
  personal,
  setPersonal,
  setOpenModal,
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
  const [fecha, setFecha] = useState("");
  const [afp, setAFP] = useState("");
  const [isapre, setIsapre] = useState("");
  const [banco, setBanco] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [sueldo, setSueldo] = useState("");

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
  };
  const handleChangeFecha = (e) => {
    setFecha(e.target.value);
  };
  const handleChangeAFP = (e) => {
    setAFP(e.target.value);
  };
  const handleChangeIsapre = (e) => {
    setIsapre(e.target.value);
  };
  const handleChangeBanco = (e) => {
    setBanco(e.target.value);
  };
  const handleChangeCuenta = (e) => {
    setCuenta(e.target.value);
  };
  const handleChangeSueldo = (e) => {
    setSueldo(e.target.value);
    setPersonalAdd({
      nombre,
      rut,
      mail,
      direccion,
      comuna,
      ciudad,
      telefono,
      fecha,
      afp,
      isapre,
      banco,
      cuenta,
      sueldo,
    });
    // setPersonalAdd(
    //   {
    //     nombre_personal: nombre,
    //     rut_personal: rut,
    //     correo_electronico_personal: mail,
    //     direccion_personal: direccion,
    //     comuna_personal: comuna,
    //     ciudad_personal: ciudad,
    //     telefono_personal: telefono,
    //     fecha_ingreso: fecha,
    //     id_afp: afp,
    //     id_isapre: isapre,
    //     id_banco: banco,
    //     numero_cuenta: cuenta,
    //     sueldo_base: sueldo
    //    },
    // );
  };

  //Handler para el boton de agregar producto
  const handleSubmit = (e) => {

    //Se previene el refresh automatico del form
    e.preventDefault();
    //alert("Feature en desarrollo")
    //Se hace la peticion Post a add/producto del productoAdd
    //console.log(personal);
    // //Max id para asignarselo al nuevo
    const max_id = personal.reduce(
      (acc, personal) =>
        (acc = acc > personal.id_personal ? acc : personal.id_personal),
      0
    );
    // //Ya que axios post
    Axios.post("http://localhost:3001/add/personal", personalAdd).then(
      (response) => {
        console.log(response.status)
        if (response.status === 200) {
          
          // getProducto(productoAdd);
          setPersonal([
            ...personal,
            { id_personal: max_id + 1,
              nombre_personal: personalAdd.nombre,
              rut_personal: personalAdd.rut,
              correo_electronico_personal: personalAdd.mail,
              direccion_personal: personalAdd.direccion,
              comuna_personal: personalAdd.comuna,
              ciudad_personal: personalAdd.ciudad,
              telefono_personal: personalAdd.telefono,
              fecha_ingreso: personalAdd.fecha,
              id_afp: personalAdd.afp,
              id_isapre: personalAdd.isapre,
              id_banco: personalAdd.banco,
              numero_cuenta: personalAdd.cuenta,
              sueldo_base: personalAdd.sueldo
             },
          ]);
          console.log("jeje")
          console.log(personal)
          //Se cierra el modal de agregar
          setOpenModal(false);
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
              <h1 className="producto-title">Agregar Personal</h1>
              <hr className="divisor" id="agregar-producto" />
              <TextField
                label="Nombre Personal"
                onChange={handleChangeNombre}
              />
              <TextField label="Rut" onChange={handleChangeRut} />
              <TextField label="Mail" onChange={handleChangeMail} />
              <TextField label="Direccion" onChange={handleChangeDireccion} />
              <TextField label="Comuna" onChange={handleChangeComuna} />
              <TextField label="Ciudad" onChange={handleChangeCiudad} />
              <TextField label="Telefono" onChange={handleChangeTelefono} />
              
              <TextField
                id="date"
                label="Fecha Ingreso"
                type="date"
                defaultValue="2021-05-24"
                onChange={handleChangeFecha}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField label="Id AFP" onChange={handleChangeAFP} />
              <TextField label="Id Isapre" onChange={handleChangeIsapre} />
              <TextField label="Id Banco" onChange={handleChangeBanco} />
              <TextField
                label="Numero de cuenta"
                onChange={handleChangeCuenta}
              />
              <TextField label="Sueldo base" onChange={handleChangeSueldo} />
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

export default AgregarPersonal;
