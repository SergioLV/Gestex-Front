import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

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

const StyledSelect = withStyles((theme) => ({
  root: {
    paddingRight: "0px",
  },
  select: {
    paddingTop: "1rem",
    "&&": {
      paddingRight: 0, // only way to override
    },
  },
}))(Select);

//Componente que despliega un modal cuando openModal == true
function AgregarProducto({
  procesoAdd,
  setProcesoAdd,
  procesos,
  setProcesos,
  setOpenModal,
  setOpenPopUp,
  productos,
}) {
  
  const [idProductoAsociado, setIdProductoAsociado] = useState(0);
  const [nombreProceso, setNombreProceso] = useState("");
  const [precio, setPrecio] = useState(0);
  console.log(idProductoAsociado,nombreProceso,precio)
  // console.log(productos);
  const classesForm = useStylesForm();
  // console.log(precio, nombreProceso, idProductoAsociado);
  //Handler para modificar el producto que se inserta y que se le pasa al PopUp de satisfaccion

  //En el input se muestra el nombre, pero se trabaja con el id del producto
  const handleChangeIdProductoAsociado = (e) => {
    setIdProductoAsociado(e.target.value);
    console.log(e.target.value);
  };
  const handleChangeNombreProceso = (e) => {
    setNombreProceso(e.target.value);
  };
  const handleChangePrecio = (e) => {
    setPrecio(e.target.value);
  };
  //En este caso hay 2 submit porque se envia el estado vacio por algun motivo
  const handleSubmit1 = (e) => {
    
    //Se previene el refresh automatico del form
    e.preventDefault();
    setProcesoAdd([nombreProceso,precio,idProductoAsociado])
    handleSubmit2(procesoAdd)
  }
  const handleSubmit2 = (proceso) => {

    //Se hace la peticion Post a add/producto del productoAdd
   
    Axios.post("http://localhost:3001/add/proceso", { proceso }).then(
      (response) => {
        console.log(response)
        console.log(procesoAdd)
        if (response.status === 201) {
          console.log(response)
          setOpenModal(false)
          // getProceso(procesoAdd);
        }
      }
    );
  };

  const getProceso = async (procesoAdd) => {
    const url = "http://localhost:3001/get/proceso/".concat(procesoAdd[0]);
    await Axios.get(url).then((response) => {
      console.log(response.data)
      //Response.data.rows[0] devuelve un Json con la fila de la consulta de productAdd a la bd
      // setProcesos([...procesos, response.data.rows[0]]);
      //Se cierra el modal de agregar
      setOpenModal(false);
      //Se abre el popup de satisfaccion
      setOpenPopUp(true);
      //Se cierra el popup despues de 2 seg
      setTimeout(() => {
        setOpenPopUp(false);
      }, 2000);
    });
  };
 
  return (
    <div>
      <div className="background-agregar">
        <div className="agregar">
          <div className="formulario-producto">
            <form
              className={classesForm.root}
              onSubmit={handleSubmit1}
              noValidate
              autoComplete="off"
            >
              <h1 className="producto-title">Agregar Proceso</h1>
              <hr className="divisor" id="agregar-producto" />

              <InputLabel htmlFor="age-native-simple">
                Producto asociado
              </InputLabel>

              <StyledSelect
                className="select-agregar-proceso"
                native
                //   value={state.age}
                onChange={handleChangeIdProductoAsociado}
                inputProps={{
                  name: "age",
                  id: "age-native-simple",
                }}
              >
                <option value=""></option>
                {productos.map((producto) => (
                  <option value={producto.id_producto}>
                    {producto.nombre_producto}
                  </option>
                ))}
              </StyledSelect>
              <TextField
                label="Nombre Proceso"
                onChange={handleChangeNombreProceso}
              />
              <TextField
              // type="number"
                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Precio $"
                onChange={handleChangePrecio}
              />
              
              <ColorButton
                className="boton-agregar-producto-modal"
                variant="contained"
                color="primary"
                type="submit"
              >
                Añadir Proceso
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

export default AgregarProducto;
