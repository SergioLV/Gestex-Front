import React, { useState, useEffect, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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
  setOpenModal,

  ordenes,

  setOpenPopUp,

  tickets,
  setTicketsAdd,
}) {
  const classesForm = useStylesForm();
  const classesGrid = useStylesGrid();
  const duplicated = useRef();

  const [personal, setPersonal] = useState("");
  const [isDuplicated, setIsDuplicated] = useState(false);

  const [paquetes, setPaquetes] = useState([]);
  const [procesos, setProcesos] = useState([]);

  const [trabajador, setTrabajador] = useState("");
  const [fecha, setFecha] = useState("");
  const [total, setTotal] = useState(0);

  const [codigo, setCodigo] = useState("");

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

  //Handler para el boton de agregar producto

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(add);

    //Se hace la peticion Post a add/producto del productoAdd
    // //Max id para asignarselo al nuevo
    // const max_id = ordenes.reduce(
    //   (acc, orden) =>
    //     (acc =
    //       acc > orden.id_ordenes_de_corte ? acc : orden.id_ordenes_de_corte),
    //   0
    // );
    // // console.log(paquetes);
    console.log("response");
    Axios.post(
      "https://gestex-backend.herokuapp.com/add/tickets",
      ticketsTrabajador
    ).then((response) => {});
    setTicketsAdd({ num_tickets: ticketsTrabajador.length });
    setOpenModal(false);
    //Se abre el popup de satisfaccion
    setOpenPopUp(true);
    //Se cierra el popup despues de 2 seg
    setTimeout(() => {
      setOpenPopUp(false);
    }, 2000);
  };

  const [ticketsTrabajador, setTicketsTrabajador] = useState([
    // {
    //   codigo: "",
    //   id_orden_de_corte: "",
    //   id_personal: "",
    //   id_paquete: "",
    //   id_producto: "",
    //   id_proceso: "",
    //   fecha_lectura: "",
    //   precio: "",
    // },
  ]);

  const handleTickets = (e) => {
    setCodigo(e.target.value);
    const tick = [...ticketsTrabajador];
    const index = tick.length - 1;
    const name = e.target.name;
    // tick[index][name] = e.target.value;
    // tick[index]["id_personal"] = parseInt(trabajador);
    // tick[index]["fecha_lectura"] = fecha;
    // tick[index]["id_orden_de_corte"] = parseInt(e.target.value.substring(0, 5));
    // tick[index]["numero_paquete"] = parseInt(e.target.value.substring(6, 8));
    // tick[index]["id_proceso"] = parseInt(e.target.value.substring(9, 11));
    // tick[index]["id_producto"] = ordenes.find(
    //   (o) => o.id_ordenes_de_corte === parseInt(e.target.value.substring(0, 5))
    // ).id_producto;
    // tick[index]["id_paquete"] = paquetes.find(
    //   (p) =>
    //     p.id_orden_de_corte === parseInt(e.target.value.substring(0, 5)) &&
    //     p.numero_paquete === parseInt(e.target.value.substring(9, 11))
    // ).id_paquete;

    // tick[index]["precio"] =
    //   paquetes.find(
    //     (p) =>
    //       p.id_orden_de_corte === parseInt(e.target.value.substring(0, 5)) &&
    //       p.numero_paquete === parseInt(e.target.value.substring(9, 11))
    //   ).cantidad_paquete *
    //   procesos.find(
    //     (pro) => pro.id_proceso === parseInt(e.target.value.substring(9, 11))
    //   ).precio;

    // console.log(tick)
    // setTicketsTrabajador(tick);
  };

  const handleAdd = () => {
    const ticket = {
      codigo: codigo,
      id_personal: parseInt(trabajador),
      fecha_lectura: fecha,
      id_orden_de_corte: parseInt(codigo.substring(0, 5)),
      numero_paquete: parseInt(codigo.substring(6, 8)),
      id_proceso: parseInt(codigo.substring(9, 11)),
      id_producto: ordenes.find(
        (o) => o.id_ordenes_de_corte === parseInt(codigo.substring(0, 5))
      ).id_producto,
      id_paquete: paquetes.find(
        (p) =>
          p.id_orden_de_corte === parseInt(codigo.substring(0, 5)) &&
          p.numero_paquete === parseInt(codigo.substring(6, 8))
      ).id_paquete,
      precio:
        paquetes.find(
          (p) =>
            p.id_orden_de_corte === parseInt(codigo.substring(0, 5)) &&
            p.numero_paquete === parseInt(codigo.substring(6, 8))
        ).cantidad_paquete *
        procesos.find(
          (pro) => pro.id_proceso === parseInt(codigo.substring(9, 11))
        ).precio,
    };
    tickets.map((t) => {
      if (
        t.id_orden_de_corte == ticket.id_orden_de_corte &&
        t.id_paquete == ticket.id_paquete
      ) {
        setIsDuplicated(true);
      }
    });
    setTicketsTrabajador([...ticketsTrabajador, ticket]);
    setTotal(
      total +
        paquetes.find(
          (p) =>
            p.id_orden_de_corte === parseInt(codigo.substring(0, 5)) &&
            p.numero_paquete === parseInt(codigo.substring(6, 8))
        ).cantidad_paquete *
          procesos.find(
            (pro) => pro.id_proceso === parseInt(codigo.substring(9, 11))
          ).precio
    );
  };
  const handleRemove = (index) => {
    try {
      if (duplicated.current.textContent == "Ticket Duplicado!") {
        setIsDuplicated(false);
      }
    } catch (e) {
      console.log("xd");
    }
    const tick = [...ticketsTrabajador];
    tick.splice(index, 1);
    let intersection = [...ticketsTrabajador].filter((x) => !tick.includes(x));
    setTicketsTrabajador(tick);
    setTotal(total - parseInt(intersection[0].precio));
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
              <h1 className="producto-title">Lectura Tickets</h1>
              <hr className="divisor" id="agregar-orden-line" />
              <div className={classesGrid.root}>
                <Grid container style={{ gap: 100 }}>
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
                      style={{ width: 160 }}
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
                      // ref={input}
                      // value={ticketsTrabajador.codigo}
                      onBlur={(e) => handleTickets(e)}
                    />
                  </Grid>

                  <Grid style={{ marginTop: "1.3rem" }}>
                    {/* {ticketsTrabajador.length !== 1 && (
                      <RemoveIcon
                      className="removePaquete"
                      onClick={(e) => handleRemove(i)}
                      />
                    )} */}
                    {
                      <AddIcon
                        className="addPaquete"
                        onClick={(e) => handleAdd()}
                      />
                    }
                  </Grid>
                </Grid>
              </div>

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

              {[...ticketsTrabajador].length >= 0
                ? ticketsTrabajador.map((ticket, i) => (
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
                            disabled
                            // variant="outlined"
                            // onBlur={(e) => calcularPrecio(e, 100)}
                            name="codigo"
                            value={[...ticketsTrabajador][i].codigo}
                            // onBlur={(e) => handleTickets(e, i)}
                          />
                        </Grid>
                        <Grid>
                          <TextField
                            id="outlined-basic"
                            label="Precio"
                            type="number"
                            disabled
                            // variant="outlined"
                            name="precio"
                            style={{ width: 100 }}
                            value={[...ticketsTrabajador][i].precio}
                          />
                        </Grid>

                        <Grid style={{ marginTop: "1.3rem" }}>
                          {
                            <RemoveIcon
                              className="removePaquete"
                              onClick={(e) => handleRemove(i)}
                            />
                          }
                          {/* {ticketsTrabajador.length - 1 === i && (
                        <AddIcon
                          className="addPaquete"
                          onClick={(e) => handleAdd(e, i)}
                        />
                      )} */}
                        </Grid>
                        {/* {isDuplicated && ticketsTrabajador.length - 1 === i && (
                          <Grid
                            style={{
                              marginLeft: "0.2rem",
                              marginTop: "1.1rem",
                              color: "red",
                            }}
                          >
                            <p ref={duplicated}>Ticket Duplicado!</p>
                          </Grid>
                        )} */}

                        <Grid
                          style={{
                            marginLeft: "0.2rem",
                            marginTop: "1.1rem",
                            color: "red",
                          }}
                        >
                          <p ref={duplicated}>
                            {isDuplicated &&
                              ticketsTrabajador.length - 1 === i &&
                              "Ticket Duplicado!"}
                          </p>
                        </Grid>
                      </Grid>
                    </div>
                  ))
                : "0"}
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
