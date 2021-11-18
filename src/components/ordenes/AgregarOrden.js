import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";

import Grid from "@material-ui/core/Grid";

const useStylesGrid = makeStyles((theme) => ({
  root: {
    // alignItems: "space-between",
    flexGrow: 1,
    paddingTop: "2rem",
    paddingLeft: "1rem",
    paddingBottom: "1rem",
  },
}));

const useStylesForm = makeStyles((theme) => ({
  root: {
    "& > *": {
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
    padding: "0",
    // width: "5rem",
  },
}))(Button);
const StyledSelect = withStyles((theme) => ({
  root: {
    paddingRight: "0px",
    // width: "100%",
    // display: "in-line",
  },
  select: {
    // paddingTop: "1rem",
    "&&": {
      paddingRight: 0, // only way to override
    },
  },
}))(Select);

function AgregarProducto({
  setOpenModal,
  ordenAdd,
  setOrdenAdd,
  ordenes,
  setOrdenes,
  setOpenPopUp,
  clientes,
  productos,
}) {
  const classesForm = useStylesForm();
  const classesGrid = useStylesGrid();

  const [cliente, setCliente] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");

  const [paquetes, setPaquetes] = useState([" "]);
  const [cantidadPaquete, setCantidadPaquete] = useState(0);
  const [tallaPaquete, setTallaPaquete] = useState("");
  const [colorPaquete, setColorPaquete] = useState("");
  const [numeroPaquete, setNumeroPaquete] = useState(1);

  //Handler para modificar el producto que se inserta y que se le pasa al PopUp de satisfaccion
  const handleChangeCliente = (e) => {
    setCliente(e.target.value);
  };
  const handleChangeProducto = (e) => {
    setProducto(e.target.value);
  };
  const handleChangeCantidad = (e) => {
    setCantidad(e.target.value);
  };
  const handleChangeFecha = (e) => {
    setFecha(e.target.value);
    setOrdenAdd({
      id_cliente: cliente,
      id_producto: producto,
      cantidad: cantidad,
      fecha_entrega: fecha,
      comentario: comentario,
    });
  };
  const handleChangeComentario = (e) => {
    setComentario(e.target.value);
    setOrdenAdd({
      id_cliente: cliente,
      id_producto: producto,
      cantidad: cantidad,
      fecha_entrega: fecha,
      comentario: comentario,
    });
  };
  //Handler para el boton de agregar producto
  const handleSubmit = (e) => {
    //Se previene el refresh automatico del form
    e.preventDefault();
    //Se hace la peticion Post a add/producto del productoAdd
    //Max id para asignarselo al nuevo
    const max_id = ordenes.reduce(
      (acc, orden) =>
        (acc =
          acc > orden.id_ordenes_de_corte ? acc : orden.id_ordenes_de_corte),
      0
    );

    Axios.post("https://gestex-backend.herokuapp.com/add/orden", ordenAdd).then(
      (response) => {
        if (response.status === 201) {
          // getProducto(productoAdd);
          setOrdenes([
            ...ordenes,
            {
              id_ordenes_de_corte: max_id + 1,
              id_cliente: cliente,
              id_producto: producto,
              cantidad: cantidad,
              fecha_entrega: fecha,
              comentario: comentario,
            },
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

  const handleAddPaquete = () => {
    setNumeroPaquete(numeroPaquete + 1);
    setPaquetes([
      ...paquetes,
      { cantidad: cantidadPaquete, talla: tallaPaquete, color: colorPaquete },
    ]);
  };

  const handleCantidadPaquete = (e) => {
    setCantidadPaquete(e.target.value);
  };
  const handleTallaPaquete = (e) => {
    setTallaPaquete(e.target.value);
  };
  const handleColorPaquete = (e) => {
    setColorPaquete(e.target.value);
  };

  return (
    <div>
      <div className="background-agregar">
        <div className="agregar-orden">
          <div className="formulario-ordenes">
            <form
              className={classesForm.root}
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <h1 className="producto-title">Agregar Orden</h1>
              <hr className="divisor" id="agregar-producto" />
              <div className={classesGrid.root}>
                <Grid container spacing={2}>
                  <Grid item>
                    <InputLabel htmlFor="cliente">Cliente</InputLabel>
                    <StyledSelect
                      className="select-agregar-proceso"
                      native
                      onChange={handleChangeCliente}
                      inputProps={{
                        name: "cliente",
                        id: "cliente",
                      }}
                      style={{ width: 120 }}
                    >
                      <option value=""></option>
                      {clientes.map((cliente) => (
                        <option value={cliente.id_cliente}>
                          {cliente.nombre_cliente}
                        </option>
                      ))}
                    </StyledSelect>
                  </Grid>
                  <Grid item>
                    <InputLabel htmlFor="producto">Producto</InputLabel>

                    <StyledSelect
                      className="select-agregar-proceso"
                      native
                      //   value={state.age}
                      onChange={handleChangeProducto}
                      inputProps={{
                        name: "producto",
                        id: "producto",
                      }}
                      // style={{ width: 150 }}
                    >
                      <option value=""></option>
                      {productos.map((producto) => (
                        <option value={producto.id_producto}>
                          {producto.nombre_producto}
                        </option>
                      ))}
                    </StyledSelect>
                  </Grid>
                  <Grid item>
                    {" "}
                    <TextField
                      label="Cantidad"
                      type="number"
                      onChange={handleChangeCantidad}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="date"
                      label="Fecha Entrega"
                      type="date"
                      defaultValue="2021-05-24"
                      onChange={handleChangeFecha}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ width: 140 }}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Comentario"
                      onChange={handleChangeComentario}
                    />
                  </Grid>
                </Grid>
              </div>

              <h1 className="producto-title ">Paquetes</h1>
              <hr className="divisor" id="agregar-producto" />

              <div className="orden-header">
                <div className="numero">
                  <h3>Nº</h3>
                </div>
                <div className="cantidad">
                  <h3>Cantidad</h3>
                </div>
                <div className="talla">
                  <h3>Talla</h3>
                </div>
                <div className="color">
                  <h3>Color</h3>
                </div>
              </div>
              {/* <hr className="divisor" id="agregar-producto" /> */}
              {paquetes.map((paquete, index) => (
                <div className={classesGrid.root}>
                  <Grid container spacing={5} style={{ gap: 10 }}>
                    <Grid>{index + 1}</Grid>
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Cantidad"
                        variant="outlined"
                        onChange={handleCantidadPaquete}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Talla"
                        variant="outlined"
                        onChange={handleTallaPaquete}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Color"
                        variant="outlined"
                        onChange={handleColorPaquete}
                      />
                    </Grid>
                    <Grid>
                      <AddIcon
                        className="addPaquete"
                        onClick={handleAddPaquete}
                      />
                    </Grid>
                  </Grid>
                </div>
              ))}

              <ColorButton
                className="boton-agregar-producto-modal"
                variant="contained"
                color="primary"
                type="submit"
              >
                Generar Tickets
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
