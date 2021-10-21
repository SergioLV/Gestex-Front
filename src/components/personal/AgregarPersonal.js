import React,{useState} from "react";
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
  const [nombre,setNombre] = useState("");
  const [rut,setRut] = useState("");
  const [mail,setMail] = useState("");
  const [direccion,setDireccion] = useState("");
  const [comuna,setComuna] = useState("");
  const [ciudad,setCiudad] = useState("");
  const [telefono,setTelefono] = useState("");
  const [fecha,setFecha] = useState("");
  const [afp,setAFP] = useState(0);
  const [isapre,setIsapre] = useState(0);
  const [banco, setBanco] = useState(0);
  const [cuenta, setCuenta] = useState(0);
  const [sueldo,setSueldo] = useState(0);

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
  };

  //Handler para el boton de agregar producto
  const handleSubmit = (e) => {
    //Se previene el refresh automatico del form
    e.preventDefault();
    //Se hace la peticion Post a add/producto del productoAdd
    console.log(personal);
    //Max id para asignarselo al nuevo
    const max_id = personal.reduce(
      (acc, producto) =>
        (acc = acc > producto.id_producto ? acc : producto.id_producto),
      0
    );
    //Ya que axios post
    Axios.post("http://localhost:3001/add/personal", { personalAdd }).then(
      (response) => {
        if (response.status === 201) {
          // getProducto(productoAdd);
          setPersonal([
            ...personal,
            { id_personal: max_id + 1, nombre_personal: personalAdd },
          ]);
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
              <TextField label="Nombre Personal" onChange={handleChangeNombre} />
              <TextField label="Rut" onChange={handleChangeRut} />
              <TextField label="Mail" onChange={handleChangeMail} />
              <TextField label="Direccion" onChange={handleChangeDireccion} />
              <TextField label="Comuna" onChange={handleChangeComuna} />
              <TextField label="Ciudad" onChange={handleChangeCiudad} />
              <TextField label="Telefono" onChange={handleChangeTelefono} />
              <TextField label="Fecha de ingreso" onChange={handleChangeFecha} />
              <TextField label="Id AFP" onChange={handleChangeAFP} />
              <TextField label="Id Isapre" onChange={handleChangeIsapre} />
              <TextField label="Id Banco" onChange={handleChangeBanco} />
              <TextField label="Numero de cuenta" onChange={handleChangeCuenta} />
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
