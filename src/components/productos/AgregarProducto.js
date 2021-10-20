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

function AgregarProducto({
  productoAdd,
  setProductoAdd,
  productos,
  setProductos,
  setOpenModal,
  setOpenPopUp,
}) {
  const classesForm = useStylesForm();

  //Handler para modificar el producto que se inserta y que se le pasa al PopUp de satisfaccion
  const handleChange = (e) => {
    setProductoAdd(e.target.value);
    // console.log(productoAdd)
  };
  //Handler para el boton de agregar producto
  const handleSubmit = (e) => {
    //Se previene el refresh automatico del form
    e.preventDefault();
    //Se hace la peticion Post a add/producto del productoAdd
    //Ya que axios post
    Axios.post("https://gestex-backend.herokuapp.com/add/producto", { productoAdd }).then(
      (response) => {
        if (response.status === 201) {
          getProducto(productoAdd);
        }
      }
    );
  };

  const getProducto = async (productoAdd) => {
    const url = "https://gestex-backend.herokuapp.com/get/producto/".concat(productoAdd);
    await Axios.get(url).then((response) => {
      //Response.data.rows[0] devuelve un Json con la fila de la consulta de productAdd a la bd
      setProductos([...productos, response.data.rows[0]]);
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
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <h1 className="producto-title">Agregar Producto</h1>
              <hr className="divisor" id="agregar-producto" />
              <TextField label="Nombre Producto" onChange={handleChange} />
              <ColorButton
                className="boton-agregar-producto-modal"
                variant="contained"
                color="primary"
                type="submit"
              >
                Añadir Producto
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