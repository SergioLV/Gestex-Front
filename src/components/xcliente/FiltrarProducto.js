import React from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
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

function FiltrarProducto({
    setOpenModal,
    setXcliente,
    setClienteAdd,
    clienteAdd,
    
    setOpenPopUp,

    clientes,
     
}) {
  const classesForm = useStylesForm();

  //Handler para modificar el producto que se inserta y que se le pasa al PopUp de satisfaccion
  const handleChangeCliente = (e) => {
    // setCliente(e.target.value);
    setClienteAdd(e.target.value)
  };
  
  //Handler para el boton de agregar producto
  const handleSubmit = (e) => {
    //Se previene el refresh automatico del form
    e.preventDefault();
    //Se hace la peticion Post a add/producto del productoAdd
    //Max id para asignarselo al nuevo
 
    Axios.get("https://gestex-backend.herokuapp.com/get/xcliente",{params:{clienteAdd}}).then((response) => {
        // console.log(response.data)
        if (response.status === 200) {
          setXcliente([])
        setXcliente(response.data)
        // setOrdenes([
        //   ...ordenes,
        //   {
        //     id_ordenes_de_corte: max_id + 1,
        //     id_cliente: cliente,
        //     id_producto: producto,
        //     cantidad: cantidad,
        //     fecha_entrega: fecha,
        //     comentario: comentario,
        //   },
        // ]);
        //Se cierra el modal de agregar
        setOpenModal(false);
        // //Se abre el popup de satisfaccion
        // setOpenPopUp(true);
        // //Se cierra el popup despues de 2 seg
        // setTimeout(() => {
        //   setOpenPopUp(false);
        // }, 2000);
      }
    });
  };
//   console.log(clientes)

  return (
    <div>
      <div className="background-agregar">
        <div className="agregar">
          <div className="formulario-ordenes">
          <form
              className={classesForm.root}
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <h1 className="producto-title">Filtrar Producto por Cliente</h1>
              <hr className="divisor" id="agregar-producto" />
              <InputLabel htmlFor="cliente">Cliente</InputLabel>

              <StyledSelect
                className="select-agregar-proceso"
                native
                //   value={state.age}
                onChange={handleChangeCliente}
                inputProps={{
                  name: "cliente",
                  id: "cliente",
                }}
              >
                <option value=""></option>
                {clientes.map((cliente) => (
                  <option value={cliente.id_cliente}>
                    {cliente.nombre_cliente}
                  </option>
                ))}
              </StyledSelect>
             
              <ColorButton
                className="boton-agregar-producto-modal"
                variant="contained"
                color="primary"
                type="submit"
              >
                Filtrar
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

export default FiltrarProducto;
