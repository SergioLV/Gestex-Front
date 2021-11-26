import React, { useState, useEffect } from "react";
import Axios from "axios";

import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import Button from "@material-ui/core/Button";

import PopUp from "../components/modals/PopUp";
import PopUpEdit from "../components/modals/PopUpEdit";
import PopUpEditError from "../components/modals/PopUpEditError";
import AgregarOrden from "../components/ordenes/AgregarOrden";
import EditOrden from "../components/ordenes/EditOrden";
import AgregarTicket from "../components/ticket/AgregarTicket";
import Skeleton from "@material-ui/lab/Skeleton";
import PropTypes from "prop-types";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="inicio"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="atras"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="siguiente"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="final"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
const useStylesSkeleton = makeStyles({
  id: {
    width: "3rem",
  },
  nombre: {
    width: "7rem",
  },
  edit: {
    width: "3rem",
  },
});

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    width: 300,
    "& .MuiTableCell-root": {
      borderBottom: "1px solid rgba(244, 77, 62, 1)",
    },
  },
  head: {
    backgroundColor: "#F55D3E",
    color: "white",
  },
});

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

export default function Productos() {
  const min_prod = [1, 2, 3, 4, 5];
  let celdasExcel = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classesSkeleton = useStylesSkeleton();

  const classes = useStyles();
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

  //State que almacena la peticion HTTP a la api y contiene una lista de objetos con los productos
  const [ordenes, setOrdenes] = useState([]);
  //State que almacena el producto al hacer click en el icono de edit
  const emptyRows =
    [...ordenes].length === 0
      ? rowsPerPage - Math.min(rowsPerPage, 5 - page * rowsPerPage)
      : rowsPerPage -
        Math.min(rowsPerPage, [...ordenes].length - page * rowsPerPage);
  const [ordenEdit, setOrdenEdit] = useState([]);
  //State que almacena le producto que se agrega en el modal de agregar y luego se pasa al popup de satisfaccion
  const [ordenAdd, setOrdenAdd] = useState("");

  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  //State del
  const [openEdit, setOpenEdit] = useState(false);
  //Estado del modal para agregar y editar producto
  const [openModal, setOpenModal] = useState(false);
  //State del popup para el feedback de producto agregado satisfactoriamente
  const [openPopUp, setOpenPopUp] = useState(false);
  //State del popup para el feedback de producto editado satisfactoriamente
  const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
  //State del popup para el feedback de producto editado ha producido un error

  //State para mostrar el producto que se edito

  //Funcion que llama a get/productos y almacena en productos una lista de objetos con todos los productos de la tabla productos

  useEffect(() => {
    const getTickets = async () => {
      await Axios.get("http://localhost:3001/get/tickets").then((response) => {
        setTickets(response.data);
        setLoadingTickets(true);
        console.log(response.data);
      });
    };
    getTickets();
  }, []);
  useEffect(() => {
    const getClientes = async () => {
      await Axios.get("https://gestex-backend.herokuapp.com/get/clientes").then(
        (response) => {
          setClientes(response.data);
        }
      );
    };
    getClientes();
  }, []);
  useEffect(() => {
    const getProductos = async () => {
      await Axios.get(
        "https://gestex-backend.herokuapp.com/get/productos"
      ).then((response) => {
        setProductos(response.data);
      });
    };
    getProductos();
  }, []);
  useEffect(() => {
    const getOrdenes = async () => {
      await Axios.get("https://gestex-backend.herokuapp.com/get/ordenes").then(
        (response) => {
          setOrdenes(response.data);
        }
      );
    };
    getOrdenes();
  }, []);

  const mostrarCliente = (orden) => {
    let nombre = "";
    try {
      nombre = [...clientes].find(
        (cliente) => cliente.id_cliente === orden.id_cliente
      ).nombre_cliente;
    } catch (e) {
      nombre = orden.id_cliente;
      [...clientes].map((p) => {
        if (p.id_cliente == orden.id_cliente) {
          nombre = p.nombre_cliente;
        }
      });
    }
    return nombre;
  };
  const mostrarProducto = (orden) => {
    let nombre = "";
    try {
      nombre = [...productos].find(
        (producto) => producto.id_producto === orden.id_producto
      ).nombre_producto;
    } catch (e) {
      nombre = orden.id_producto;
      [...productos].map((p) => {
        if (p.id_producto == orden.id_producto) {
          nombre = p.nombre_producto;
        }
      });
    }
    return nombre;
  };

  return (
    <div className="productos">
      {/* {openEdit && (
        <EditOrden
          setOpenModal={setOpenModal}
          ordenes={ordenes}
          setOrdenes={setOrdenes}
          setOpenEdit={setOpenEdit}
          ordenEdit={ordenEdit}
          setOpenPopUpEdit={setOpenPopUpEdit}
          openPopUpEdit={openPopUpEdit}
        />
      )}
      {openPopUpEdit && <PopUpEdit ordenEdit={ordenEdit} />} */}
      {openPopUp && <PopUp ordenAdd={ordenAdd} />}

      {openModal && (
        <AgregarTicket
          celdasExcel={celdasExcel}
          setOpenModal={setOpenModal}
          ordenAdd={ordenAdd}
          setOrdenAdd={setOrdenAdd}
          ordenes={ordenes}
          setOrdenes={setOrdenes}
          setOpenPopUp={setOpenPopUp}
          productos={productos}
          clientes={clientes}
        />
      )}
      <div className="content">
        <div className="boton">
          <ColorButton
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Lectura Tickets
          </ColorButton>
        </div>

        <div className="tabla-personal">
          <div className="productos-list">
            <TableContainer component={Paper}>
              <Table
                // className={classes.table}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.head}>Id Ticket</TableCell>
                    <TableCell className={classes.head}>Id Personal</TableCell>
                    <TableCell className={classes.head}>
                      Orden de Corte
                    </TableCell>
                    <TableCell className={classes.head}>
                      Fecha Lectura
                    </TableCell>
                    <TableCell className={classes.head}>Id Paquete</TableCell>

                    <TableCell className={classes.head}>Id Proceso</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingTickets
                    ? (rowsPerPage > 0
                        ? tickets.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : tickets
                      ).map((ticket) => (
                        <TableRow hover="true">
                          <TableCell component="th" scope="row">
                            {ticket.ticket}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {/* {[...clientes].length > 0
                              ? mostrarCliente(orden)
                              : orden.id_cliente} */}
                            {ticket.id_personal}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {/* {[...productos].length > 0
                              ? mostrarProducto(orden)
                              : orden.id_producto} */}
                            {ticket.id_orden_de_corte}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {ticket.fecha_lectura}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {ticket.id_paquete}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {ticket.id_proceso}
                          </TableCell>
                        </TableRow>
                      ))
                    : min_prod.map((num) => (
                        <TableRow>
                          <TableCell>
                            {" "}
                            <div className={classesSkeleton.root}>
                              <Skeleton animation="wave" />
                            </div>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <div className={classesSkeleton.root}>
                              <Skeleton animation="wave" />
                            </div>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <div className={classesSkeleton.root}>
                              <Skeleton animation="wave" />
                            </div>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <div className={classesSkeleton.root}>
                              <Skeleton animation="wave" />
                            </div>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <div className={classesSkeleton.root}>
                              <Skeleton animation="wave" />
                            </div>
                          </TableCell>
                          <TableCell>
                            {" "}
                            <div className={classesSkeleton.root}>
                              <Skeleton animation="wave" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 59 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={[...tickets].length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      labelRowsPerPage={"Filas por paginas"}
                      SelectProps={{
                        inputProps: { "aria-label": "Rows per page" },

                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
