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

function EditProductos({
  setOpenModal,
  productos,
  setProductos,
  setOpenEdit,
  productoEdit,
  setProductoEdit,
  setOpenPopUpEdit,
  setOpenPopUpEditError,
  openPopUpEdit,
}) {
  const classesForm = useStylesForm();
  //State para lo que se va a enviar con la request. Al modificar el estado de productoEdit, tira error de que no es una funcion
  const [updatedProducto, setUpdatedProducto] = useState();

  //Handler para almacenar la edicion del producto
  const handleChange = (e) => {
    setUpdatedProducto({
      id_producto: productoEdit.id_producto,
      nombre_producto: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(openPopUpEdit)
    
    Axios.put("http://localhost:3001/update/producto/", updatedProducto).then(
      (response) => {
        setOpenEdit(false);
        const aux = [...productos]
        if(!updatedProducto){
          setOpenPopUpEditError(true);
          setTimeout(() => {setOpenPopUpEditError(false); }, 1999);
        }else{
          const objIndex = aux.findIndex(
            (obj) => obj.id_producto === updatedProducto.id_producto
          );
          aux[objIndex].nombre_producto = updatedProducto.nombre_producto;
          setProductos(aux)
          setOpenPopUpEdit(true)
          // console.log(updatedProducto)
          // console.log(productos)
          setTimeout(() => {  setOpenPopUpEdit(false); }, 1999);
        }
      }
    );
  };

  const handleDelete = () => {
    console.log(productoEdit)
    Axios.delete("http://localhost:3001/delete/producto", {params: productoEdit}).then(
      (response) => {
        setOpenEdit(false);

        console.log(response)
        const aux = [...productos]
        const objIndex = aux.findIndex(
          (obj) => obj.id_producto === productoEdit.id_producto
        );
        aux.splice(objIndex,1);
         setProductos(aux)
        setOpenPopUpEdit(true)
        console.log(updatedProducto)
        console.log(productos)
        setTimeout(() => {  setOpenPopUpEdit(false); }, 1999);
      }
    );

    // console.log(productoEdit)

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
                className="id_producto_edit"
                label="Id Producto"
                defaultValue={productoEdit.id_producto}
                onChange={handleChange}
                disabled
              />
              <TextField
                label="Nombre Producto"
                defaultValue={productoEdit.nombre_producto}
                onChange={handleChange}
              />
          <div className="accion">

              <ColorButton
                className="boton-editar-producto-modal"
                variant="contained"
                color="primary"
                type="submit"
              >
                Editar Producto
              </ColorButton>
              <ColorButton
                className="boton-eliminar-producto-modal"
                variant="contained"
                onClick={handleDelete}
              >
                Eliminar Producto
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

export default EditProductos;
