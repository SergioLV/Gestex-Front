import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ReactExport from "react-data-export";

import Grid from "@material-ui/core/Grid";
const useStylesGrid = makeStyles((theme) => ({
  root: {
    // alignItems: "space-between",
    flexGrow: 1,
    paddingTop: "2rem",
    paddingLeft: "1rem",
    paddingBottom: "1rem",
    maxWidth: "70rem",
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
const StyledSelectColor = withStyles((theme) => ({
  root: {
    paddingRight: "0px",
    width: "8rem",
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
  celdasExcel,
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
  const [procesos, setProcesos] = useState([]);
  const [colores, setColores] = useState([]);
  // let celdasExcel = [];

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const getProcesos = async () => {
    await Axios.get("https://gestex-backend.herokuapp.com/get/procesos").then(
      (response) => {
        setProcesos(response.data);
      }
    );
  };
  useEffect(() => {
    getProcesos();
  }, []);
  const getColores = async () => {
    await Axios.get("https://gestex-backend.herokuapp.com/get/colores").then(
      (response) => {
        setColores(response.data);
      }
    );
  };
  useEffect(() => {
    getColores();
  }, []);

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
  };
  const max_id = () => {
    const max_id = ordenes.reduce(
      (acc, orden) =>
        (acc =
          acc > orden.id_ordenes_de_corte ? acc : orden.id_ordenes_de_corte),
      0
    );
    return max_id;
  };

  const id_orden = max_id() + 1;

  //Handler para el boton de agregar producto

  const handleSubmit = (e) => {
    //Se previene el refresh automatico del form
    // console.log("front");
    e.preventDefault();
    //Se hace la peticion Post a add/producto del productoAdd
    //Max id para asignarselo al nuevo
    const max_id = ordenes.reduce(
      (acc, orden) =>
        (acc =
          acc > orden.id_ordenes_de_corte ? acc : orden.id_ordenes_de_corte),
      0
    );
    // console.log(paquetes);

    Axios.post("https://gestex-backend.herokuapp.com/add/orden", {
      id_cliente: cliente,
      id_producto: producto,
      cantidad: cantidad,
      fecha_entrega: fecha,
      comentario: comentario,
    }).then((response) => {
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
        setOrdenAdd({
          id_ordenes_de_corte: max_id + 1,
          id_cliente: cliente,
          id_producto: producto,
          cantidad: cantidad,
          fecha_entrega: fecha,
          comentario: comentario,
        });
        //Se cierra el modal de agregar
        setOpenModal(false);
        //Se abre el popup de satisfaccion
        setOpenPopUp(true);
        //Se cierra el popup despues de 2 seg
        setTimeout(() => {
          setOpenPopUp(false);
        }, 2000);
      }
    });
    Axios.post(
      "https://gestex-backend.herokuapp.com/add/paquete",
      paquetes
    ).then((response) => {});
  };

  const [paquetes, setPaquetes] = useState([
    {
      orden_de_corte: id_orden,
      numero_paquete: "",
      cantidad: "",
      talla: "",
      color: "",
    },
  ]);

  const handlePaquetes = (e, index) => {
    const paq = [...paquetes];
    const name = e.target.name;
    if (name == "color") {
      colores.map((c) => {
        if (c.nombre_color == e.target.value) {
          paq[index]["id_color"] = c.id_color;
        }
      });
    }
    paq[index][name] = e.target.value;
    paq[index]["numero_paquete"] = index + 1;
    setPaquetes(paq);
  };

  const handleAdd = () => {
    setPaquetes([
      ...paquetes,
      {
        orden_de_corte: id_orden,
        numero_paquete: "",
        cantidad: "",
        talla: "",
        color: "",
      },
    ]);
  };
  const handleRemove = (index) => {
    const paq = [...paquetes];
    paq.splice(index, 1);
    setPaquetes(paq);
  };
  function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
      r = "0" + r;
    }
    return r;
  }

  const handleGenerar = () => {
    const proc_prod = [...procesos].filter((p) => p.id_producto == producto);

    paquetes.map((p) =>
      proc_prod.map((proc) =>
        celdasExcel.push({
          codigo:
            FormatNumberLength(id_orden, 5) +
            FormatNumberLength(p.numero_paquete, 3) +
            FormatNumberLength(proc.id_proceso, 3),
          orden_de_corte: id_orden,
          paquete: p.numero_paquete,
          producto: parseInt(producto),
          proceso: proc.nombre_proceso,
          cantidad: parseInt(p.cantidad),
          unitario: proc.precio,
          total: parseInt(p.cantidad) * proc.precio,
          talla: p.talla,
          color: p.color,
        })
      )
    );
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
              <h1 className="producto-title">Agregar Orden #{id_orden}</h1>
              <hr className="divisor" id="agregar-orden-line" />
              <div className={classesGrid.root}>
                <Grid container spacing={13} style={{ gap: 70 }}>
                  <Grid item md={2}>
                    <InputLabel htmlFor="cliente">Cliente</InputLabel>
                    <StyledSelect
                      className="select-agregar-proceso"
                      native
                      onChange={handleChangeCliente}
                      inputProps={{
                        name: "cliente",
                        id: "cliente",
                      }}
                      style={{ width: 145 }}
                    >
                      <option value=""></option>
                      {clientes.map((cliente) => (
                        <option value={cliente.id_cliente}>
                          {cliente.nombre_cliente}
                        </option>
                      ))}
                    </StyledSelect>
                  </Grid>
                  <Grid item md={2}>
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
                      style={{ width: 150 }}
                    >
                      <option value=""></option>
                      {productos.map((producto) => (
                        <option value={producto.id_producto}>
                          {producto.nombre_producto}
                        </option>
                      ))}
                    </StyledSelect>
                  </Grid>
                  <Grid item md={2}>
                    {" "}
                    <TextField
                      label="Cantidad"
                      type="number"
                      onChange={handleChangeCantidad}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: "0.6rem", gap: 15 }}
                >
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
                      label="Detalle"
                      onChange={handleChangeComentario}
                    />
                  </Grid>
                </Grid>
              </div>

              <h1 className="producto-title ">Paquetes</h1>
              <hr className="divisor" id="paquetes-line" />

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

              {paquetes.map((paquete, i) => (
                <div className={classesGrid.root}>
                  <Grid container spacing={5} style={{ gap: 63 }}>
                    <Grid style={{ marginTop: "1.4rem" }}>{i + 1}</Grid>
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Cantidad"
                        tyoe="number"
                        style={{ width: 80 }}
                        // variant="outlined"
                        name="cantidad"
                        value={paquete.cantidad}
                        onChange={(e) => handlePaquetes(e, i)}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Talla"
                        // variant="outlined"
                        name="talla"
                        style={{ width: 100 }}
                        value={paquete.talla}
                        onChange={(e) => handlePaquetes(e, i)}
                      />
                    </Grid>
                    <Grid>
                      <InputLabel htmlFor="color">Color</InputLabel>
                      <StyledSelectColor
                        className="select-agregar-proceso"
                        native
                        // variant="outlined"
                        //   value={state.age}
                        onChange={(e) => handlePaquetes(e, i)}
                        inputProps={{
                          name: "color",
                          id: "color",
                        }}
                      >
                        <option value=""></option>
                        {colores.map((color) => (
                          <option value={color.nombre_color}>
                            {color.nombre_color}
                          </option>
                        ))}
                      </StyledSelectColor>
                    </Grid>

                    <Grid>
                      {paquetes.length !== 1 && (
                        <RemoveIcon
                          className="removePaquete"
                          onClick={(e) => handleRemove(i)}
                        />
                      )}
                      {paquetes.length - 1 === i && (
                        <AddIcon
                          className="addPaquete"
                          onClick={(e) => handleAdd(e, i)}
                        />
                      )}
                    </Grid>
                  </Grid>
                </div>
              ))}
              <div className="accion">
                <ColorButton
                  style={{
                    paddingLeft: "0.8rem",
                    paddingRight: "0.7rem",
                    paddingTop: "0.2rem",
                    paddingBottom: "0.2rem",
                  }}
                  className="boton-agregar-producto-modal"
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleGenerar}
                >
                  Añadir Orden
                </ColorButton>
                <ExcelFile
                  filename={"tickets"}
                  element={
                    <ColorButton
                      style={{
                        paddingLeft: "0.8rem",
                        paddingRight: "0.7rem",
                        paddingTop: "0.2rem",
                        paddingBottom: "0.2rem",
                      }}
                      className="boton-agregar-producto-modal"
                      variant="contained"
                      color="primary"
                      // type="submit"
                      onClick={handleGenerar}
                    >
                      Generar Tickets
                    </ColorButton>
                  }
                >
                  <ExcelSheet data={celdasExcel} name="Employees">
                    <ExcelColumn label="CODIGO" value="codigo" />
                    <ExcelColumn label="ORDCOR" value="orden_de_corte" />
                    <ExcelColumn label="PAQUETE" value="paquete" />
                    <ExcelColumn label="PRODUCTO" value="producto" />
                    <ExcelColumn label="PROCESO" value="proceso" />
                    <ExcelColumn label="CANTIDAD" value="cantidad" />
                    <ExcelColumn label="UNITARIO" value="unitario" />
                    <ExcelColumn label="TOTAL" value="total" />
                    <ExcelColumn label="TALLA" value="talla" />
                    <ExcelColumn label="COLOR" value="color" />
                  </ExcelSheet>
                </ExcelFile>
              </div>
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
