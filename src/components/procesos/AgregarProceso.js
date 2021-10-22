import React, { useState, useEffect } from "react";
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
  const [precio, setPrecio] = useState("");
  // console.log("Producto Asociado: ", idProductoAsociado,nombreProceso,precio)
  // console.log(productos);
  const classesForm = useStylesForm();
  // console.log(precio, nombreProceso, idProductoAsociado);
  //Handler para modificar el producto que se inserta y que se le pasa al PopUp de satisfaccion

  //En el input se muestra el nombre, pero se trabaja con el id del producto
  const handleChangeIdProductoAsociado = (e) => {
    setIdProductoAsociado(e.target.value);
  };
  const handleChangeNombreProceso = (e) => {
    setNombreProceso(e.target.value);
  };
  const handleChangePrecio = (e) => {
    setPrecio(e.target.value);
    setProcesoAdd([nombreProceso, precio, idProductoAsociado]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const max_id = procesos.reduce(
      (acc, proceso) =>
        (acc = acc > proceso.id_proceso ? acc : proceso.id_proceso),
      0
    );
    //Se hace la peticion Post a add/producto del productoAdd
    Axios.post("http://localhost:3001/add/proceso", { procesoAdd }).then(
      (response) => {
        // console.log(response)
        // console.log("procesoAdd: ",procesoAdd)
        if (response.status === 201) {
          setProcesos([
            ...procesos,
            {
              id_proceso: max_id + 1,
              nombre_proceso: procesoAdd[0],
              precio: procesoAdd[1],
              id_producto: procesoAdd[2],
            },
          ]);
          // getProceso()
          console.log(procesos);
          console.log(max_id);
          console.log(procesoAdd);
          setOpenModal(false);
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
                type="text"
                label="Precio"
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
