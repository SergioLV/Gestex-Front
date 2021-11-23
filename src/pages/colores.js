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

import EditSharpIcon from "@material-ui/icons/EditSharp";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";

import PopUp from "../components/modals/PopUp";
import PopUpEdit from "../components/modals/PopUpEdit";
import PopUpEditError from "../components/modals/PopUpEditError";
import AgregarColor from "../components/colores/AgregarColor";
import EditColor from "../components/colores/EditColor";

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
    fontWeight: "700",
  },
});

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
  const classesT = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles();
  const classesSkeleton = useStylesSkeleton();
  const [loadingProductos, setLoadingProductos] = useState(false);

  //State que almacena la peticion HTTP a la api y contiene una lista de objetos con los productos

  const [colores, setColores] = useState([]);
  //Su usa de esta manera el emptyRows para que el skeleton de la tabla cuando se esta cargando
  //Se ajuste a 5 filas.

  //Hay que arreglar los problemas cuando se eligen mas 5 filas por pagina
  const emptyRows =
    [...colores].length === 0
      ? rowsPerPage - Math.min(rowsPerPage, 5 - page * rowsPerPage)
      : rowsPerPage -
        Math.min(rowsPerPage, [...colores].length - page * rowsPerPage);

  //State que almacena el producto al hacer click en el icono de edit
  const [colorEdit, setColorEdit] = useState([]);
  //State que almacena le producto que se agrega en el modal de agregar y luego se pasa al popup de satisfaccion
  const [colorAdd, setColorAdd] = useState("");

  //State del
  const [openEdit, setOpenEdit] = useState(false);
  //Estado del modal para agregar y editar producto
  const [openModal, setOpenModal] = useState(false);
  //State del popup para el feedback de producto agregado satisfactoriamente
  const [openPopUp, setOpenPopUp] = useState(false);
  //State del popup para el feedback de producto editado satisfactoriamente
  const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
  //State del popup para el feedback de producto editado ha producido un error
  const [openPopUpEditError, setOpenPopUpEditError] = useState(false);

  //State para mostrar el producto que se edito

  //Funcion que llama a get/productos y almacena en productos una lista de objetos con todos los productos de la tabla productos

  const editarColor = (color) => {
    // setBeforeEdit(producto);
    setColorEdit(color);
    setOpenEdit(true);
  };

  useEffect(() => {
    const getColores = async () => {
      await Axios.get("https://gestex-backend.herokuapp.com/get/colores").then(
        (response) => {
          setLoadingProductos(true);
          setColores(response.data);
        }
      );
    };
    getColores();
  }, []);

  return (
    <div className="productos">
      {openEdit && (
        <EditColor
          setOpenModal={setOpenModal}
          colores={colores}
          setColores={setColores}
          setOpenEdit={setOpenEdit}
          colorEdit={colorEdit}
          setOpenPopUpEdit={setOpenPopUpEdit}
          setOpenPopUpEditError={setOpenPopUpEditError}
          openPopUpEdit={openPopUpEdit}
          // setBeforeEdit={setBeforeEdit}
        />
      )}
      {openPopUp && <PopUp colorAdd={colorAdd} />}
      {openPopUpEdit && <PopUpEdit productoEdit={colorEdit} />}
      {openPopUpEditError && <PopUpEditError productoEdit={colorEdit} />}
      {openModal && (
        <AgregarColor
          setOpenModal={setOpenModal}
          colorAdd={colorAdd}
          setColorAdd={setColorAdd}
          colores={colores}
          setColores={setColores}
          setOpenPopUp={setOpenPopUp}
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
            Añadir Color
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
                    <TableCell align="right" className={classes.head}>
                      Id Color
                    </TableCell>
                    <TableCell align="left" className={classes.head}>
                      Color
                    </TableCell>
                    <TableCell className={classes.head}> Modificar </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingProductos
                    ? (rowsPerPage > 0
                        ? colores.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : colores
                      ).map((color) => (
                        <TableRow hover="true" key={color.id_color}>
                          <TableCell
                            align="right"
                            style={{ width: 130 }}
                            component="th"
                            scope="row"
                          >
                            {color.id_color}
                          </TableCell>
                          <TableCell style={{ width: 280 }} align="left">
                            {color.nombre_color}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <EditSharpIcon
                              className="editar"
                              onClick={() => {
                                editarColor(color);
                              }}
                            />
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
                      count={[...colores].length}
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
