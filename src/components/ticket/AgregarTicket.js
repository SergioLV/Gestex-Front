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

function AgregarTicket({
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

  const [personal, setPersonal] = useState("");

  const [paquetes, setPaquetes] = useState([]);
  const [procesos, setProcesos] = useState([]);

  const [trabajador, setTrabajador] = useState("");
  const [fecha, setFecha] = useState("");
  const [total, setTotal] = useState(0);

  const getPersonal = async () => {
    await Axios.get("https://gestex-backend.herokuapp.com/get/personal").then(
      (response) => {
        setPersonal(response.data);
      }
    );
  };
  useEffect(() => {
    getPersonal();
  }, []);
  const getPaquetes = async () => {
    await Axios.get("https://gestex-backend.herokuapp.com/get/paquetes").then(
      (response) => {
        setPaquetes(response.data);
      }
    );
  };
  useEffect(() => {
    getPaquetes();
  }, []);
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

  //Handler para modificar el producto que se inserta y que se le pasa al PopUp de satisfaccion
  const handleChangeTrabajador = (e) => {
    setTrabajador(e.target.value);
  };

  const handleChangeFecha = (e) => {
    setFecha(e.target.value);
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
    // e.preventDefault();
    // //Se hace la peticion Post a add/producto del productoAdd
    // //Max id para asignarselo al nuevo
    // const max_id = ordenes.reduce(
    //   (acc, orden) =>
    //     (acc =
    //       acc > orden.id_ordenes_de_corte ? acc : orden.id_ordenes_de_corte),
    //   0
    // );
    // // console.log(paquetes);
    // Axios.post("https://gestex-backend.herokuapp.com/add/orden", {
    //   id_cliente: cliente,
    //   id_producto: producto,
    //   cantidad: cantidad,
    //   fecha_entrega: fecha,
    //   comentario: comentario,
    // }).then((response) => {
    //   if (response.status === 201) {
    //     // getProducto(productoAdd);
    //     setOrdenes([
    //       ...ordenes,
    //       {
    //         id_ordenes_de_corte: max_id + 1,
    //         id_cliente: cliente,
    //         id_producto: producto,
    //         cantidad: cantidad,
    //         fecha_entrega: fecha,
    //         comentario: comentario,
    //       },
    //     ]);
    //     setOrdenAdd({
    //       id_ordenes_de_corte: max_id + 1,
    //       id_cliente: cliente,
    //       id_producto: producto,
    //       cantidad: cantidad,
    //       fecha_entrega: fecha,
    //       comentario: comentario,
    //     });
    //     //Se cierra el modal de agregar
    //     setOpenModal(false);
    //     //Se abre el popup de satisfaccion
    //     setOpenPopUp(true);
    //     //Se cierra el popup despues de 2 seg
    //     setTimeout(() => {
    //       setOpenPopUp(false);
    //     }, 2000);
    //   }
    // });
    // Axios.post(
    //   "https://gestex-backend.herokuapp.com/add/paquete",
    //   paquetes
    // ).then((response) => {});
  };

  const [ticketsTrabajador, setTicketsTrabajador] = useState([
    {
      codigo: "",
      id_orden_de_corte: "",
      id_personal: "",
      id_paquete: "",
      id_producto: "",
      id_proceso: "",
      fecha_lectura: "",
      precio: "",
    },
  ]);

  const handleTickets = (e, index) => {
    const tick = [...ticketsTrabajador];
    const name = e.target.name;
    tick[index][name] = e.target.value;
    tick[index]["id_personal"] = parseInt(trabajador);
    tick[index]["fecha_lectura"] = fecha;
    tick[index]["id_orden_de_corte"] = parseInt(e.target.value.substring(0, 5));
    tick[index]["numero_paquete"] = parseInt(e.target.value.substring(6, 8));
    tick[index]["id_proceso"] = parseInt(e.target.value.substring(9, 11));
    tick[index]["id_producto"] = ordenes.find(
      (o) => o.id_ordenes_de_corte === parseInt(e.target.value.substring(0, 5))
    ).id_producto;
    tick[index]["id_paquete"] = paquetes.find(
      (p) =>
        p.id_orden_de_corte === parseInt(e.target.value.substring(0, 5)) &&
        p.numero_paquete === parseInt(e.target.value.substring(9, 11))
    ).id_paquete;

    tick[index]["precio"] =
      paquetes.find(
        (p) =>
          p.id_orden_de_corte === parseInt(e.target.value.substring(0, 5)) &&
          p.numero_paquete === parseInt(e.target.value.substring(9, 11))
      ).cantidad_paquete *
      procesos.find(
        (pro) => pro.id_proceso === parseInt(e.target.value.substring(9, 11))
      ).precio;

    setTicketsTrabajador(tick);
    console.log(tick);
    console.log(procesos);
  };

  const handleAdd = () => {
    setTicketsTrabajador([
      ...ticketsTrabajador,
      {
        codigo: "",
        id_orden_de_corte: "",
        id_personal: "",
        id_paquete: "",
        id_producto: "",
        id_proceso: "",
        fecha_lectura: "",
        precio: "",
      },
    ]);
  };
  const handleRemove = (index) => {
    const tick = [...ticketsTrabajador];
    tick.splice(index, 1);
    setTicketsTrabajador(tick);
  };
  function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
      r = "0" + r;
    }
    return r;
  }
  const aumentarTotal = (e) => {
    console.log("total: ", total);
    console.log(e.target.value);
    setTotal(total + parseInt(e.target.value));
  };
  const [price, setPrice] = useState(0);
  const calcularPrecio = (e, p) => {
    setPrice(price + p);
    setTotal(total + price);
  };

  //   const handleGenerar = () => {
  //     const proc_prod = [...procesos].filter((p) => p.id_producto == producto);

  //     paquetes.map((p) =>
  //       proc_prod.map((proc) =>
  //         celdasExcel.push({
  //           codigo:
  //             FormatNumberLength(id_orden, 5) +
  //             FormatNumberLength(p.numero_paquete, 3) +
  //             FormatNumberLength(proc.id_proceso, 3),
  //           orden_de_corte: id_orden,
  //           paquete: p.numero_paquete,
  //           producto: parseInt(producto),
  //           proceso: proc.nombre_proceso,
  //           cantidad: parseInt(p.cantidad),
  //           unitario: proc.precio,
  //           total: parseInt(p.cantidad) * proc.precio,
  //           talla: p.talla,
  //           color: p.color,
  //         })
  //       )
  //     );
  //   };

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
              <h1 className="producto-title">Lectura Tickets</h1>
              <hr className="divisor" id="agregar-orden-line" />
              <div className={classesGrid.root}>
                <Grid container style={{ gap: 70 }}>
                  <Grid item md={2}>
                    <InputLabel htmlFor="cliente">Trabajador</InputLabel>
                    <StyledSelect
                      className="select-agregar-proceso"
                      native
                      onChange={handleChangeTrabajador}
                      inputProps={{
                        name: "cliente",
                        id: "cliente",
                      }}
                      style={{ width: 145 }}
                    >
                      <option value=""></option>
                      {[...personal].map((personal) => (
                        <option value={personal.id_personal}>
                          {personal.nombre_personal}
                        </option>
                      ))}
                    </StyledSelect>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="date"
                      label="Fecha Lectura"
                      type="date"
                      defaultValue="2021-11-26"
                      onChange={handleChangeFecha}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ width: 140 }}
                    />
                  </Grid>
                </Grid>
              </div>

              <h1 className="producto-title ">Tickets</h1>
              <hr className="divisor" id="paquetes-line" />

              <div className="tickets-header">
                <div className="numero">
                  <h3>Codigo</h3>
                </div>
                <div className="cantidad">
                  <h3>Precio</h3>
                </div>

                <div className="color">
                  <h3>Alerta</h3>
                </div>
              </div>

              {ticketsTrabajador.map((ticket, i) => (
                <div className={classesGrid.root}>
                  <Grid
                    container
                    spacing={5}
                    style={{ gap: 63, marginLeft: "-1rem" }}
                  >
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Codigo"
                        type="number"
                        style={{ width: 120 }}
                        // variant="outlined"
                        // onBlur={(e) => calcularPrecio(e, 100)}
                        name="codigo"
                        value={ticketsTrabajador.codigo}
                        onBlur={(e) => handleTickets(e, i)}
                      />
                    </Grid>
                    {/* <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Precio"
                        type="number"
                        // disabled
                        // variant="outlined"
                        name="precio"
                        style={{ width: 100 }}
                        value={price}
                        onChange={(e) =>
                          setTotal(total + parseInt(e.target.value))
                        }
                      />
                    </Grid> */}

                    <Grid style={{ marginTop: "1.3rem" }}>
                      {ticketsTrabajador.length !== 1 && (
                        <RemoveIcon
                          className="removePaquete"
                          onClick={(e) => handleRemove(i)}
                        />
                      )}
                      {ticketsTrabajador.length - 1 === i && (
                        <AddIcon
                          className="addPaquete"
                          onClick={(e) => handleAdd(e, i)}
                        />
                      )}
                    </Grid>
                  </Grid>
                </div>
              ))}
              <h1 className="producto-title" style={{ marginTop: "2rem" }}>
                Total: {total}
              </h1>
              <hr className="divisor" id="agregar-orden-line" />
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
                  //   onClick={handleGenerar}
                >
                  Añadir Tickets
                </ColorButton>
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

export default AgregarTicket;
