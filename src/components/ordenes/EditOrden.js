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

function EditOrden({
  setOpenModal,
  ordenes,
  setOrdenes,
  setOpenEdit,
  ordenEdit,
  setOpenPopUpEdit,
  openPopUpEdit,
}) {
  const classesForm = useStylesForm();
  const classesGrid = useStylesGrid();

  const [paquetes, setPaquetes] = useState([]);
  const [procesos, setProcesos] = useState([]);
  //   const [cliente, setCliente] = useState("");
  let celdasExcel = [];

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  useEffect(() => {
    const getPaquetes = async () => {
      await Axios.get(
        "https://gestex-backend.herokuapp.com/get/paquete/".concat(
          ordenEdit.id_ordenes_de_corte
        )
      ).then((response) => {
        setPaquetes(response.data.rows);
      });
    };
    getPaquetes();
  }, []);
  useEffect(() => {
    const getProcesos = async () => {
      await Axios.get(
        "https://gestex-backend.herokuapp.com/get/proceso/".concat(
          ordenEdit.id_producto
        )
      ).then((response) => {
        setProcesos(response.data.rows);
      });
    };
    getProcesos();
  }, []);

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

  const handleDelete = () => {
    Axios.delete("https://gestex-backend.herokuapp.com/delete/orden", {
      params: { id_orden: ordenEdit.id_ordenes_de_corte },
    }).then((response) => {
      Axios.delete("https://gestex-backend.herokuapp.com/delete/paquete", {
        params: { id_orden: ordenEdit.id_ordenes_de_corte },
      }).then((response) => {
        setOpenEdit(false);

        const aux = [...ordenes];
        const objIndex = aux.findIndex(
          (obj) => obj.id_ordenes_de_corte === ordenEdit.id_ordenes_de_corte
        );
        aux.splice(objIndex, 1);
        setOrdenes(aux);
        setOpenPopUpEdit(true);

        setTimeout(() => {
          setOpenPopUpEdit(false);
        }, 1999);
      });
    });
  };
  function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
      r = "0" + r;
    }
    return r;
  }

  const handleGenerar = () => {
    paquetes.map((p) =>
      procesos.map((proc) =>
        celdasExcel.push({
          codigo:
            FormatNumberLength(p.id_orden_de_corte, 5) +
            FormatNumberLength(p.numero_paquete, 3) +
            FormatNumberLength(proc.id_proceso, 3),
          orden_de_corte: id_orden,
          paquete: p.numero_paquete,
          producto: parseInt(proc.id_producto),
          proceso: proc.nombre_proceso,
          cantidad: parseInt(p.cantidad),
          unitario: proc.precio,
          total: parseInt(p.cantidad) * proc.precio,
          talla: p.talla,
          color: p.id_color,
        })
      )
    );
    console.log(paquetes);
  };

  return (
    <div>
      <div className="background-agregar">
        <div className="agregar-orden">
          <div className="formulario-ordenes">
            <form className={classesForm.root} noValidate autoComplete="off">
              <h1 className="producto-title">
                Editar Orden #{ordenEdit.id_ordenes_de_corte}
              </h1>
              <hr className="divisor" id="agregar-orden-line" />
              <div className={classesGrid.root}>
                <Grid container spacing={0} style={{ gap: 40 }}>
                  <Grid item md={2}>
                    <TextField
                      label="Cliente"
                      defaultValue={ordenEdit.cliente}
                      disabled
                    />
                  </Grid>
                  <Grid item md={2}>
                    <TextField
                      label="Producto"
                      defaultValue={ordenEdit.producto}
                      style={{ width: "7.5rem" }}
                      disabled
                    />
                  </Grid>
                  <Grid item md={2}>
                    {" "}
                    <TextField
                      label="Cantidad"
                      defaultValue={ordenEdit.cantidad}
                      style={{ marginLeft: "1rem" }}
                      disabled
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
                      label="Fecha Entrega"
                      type="date"
                      defaultValue={ordenEdit.fecha_entrega}
                      style={{ width: "8.6rem" }}
                      disabled
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Detalle"
                      defaultValue={ordenEdit.comentario}
                      style={{ width: "13rem" }}
                      disabled
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

              {[...paquetes].map((paquete, i) => (
                <div className={classesGrid.root}>
                  <Grid container spacing={5} style={{ gap: 63 }}>
                    <Grid style={{ marginTop: "1.4rem" }}>
                      {paquete.numero_paquete}
                    </Grid>
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Cantidad"
                        tyoe="number"
                        style={{ width: 80 }}
                        disabled
                        name="cantidad"
                        value={paquete.cantidad_paquete}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Talla"
                        disabled
                        name="talla"
                        style={{ width: 100 }}
                        value={paquete.talla}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        id="outlined-basic"
                        label="Color"
                        disabled
                        name="color"
                        style={{ width: 100 }}
                        value={paquete.id_color}
                      />
                    </Grid>
                  </Grid>
                </div>
              ))}
              <div className="accion">
                <ColorButton
                  className="boton-eliminar-producto-modal"
                  variant="contained"
                  color="primary"
                  onClick={handleDelete}
                >
                  Eliminar Orden
                </ColorButton>
                <ExcelFile
                  filename={"tickets"}
                  element={
                    <ColorButton
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
                setOpenEdit(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrden;
