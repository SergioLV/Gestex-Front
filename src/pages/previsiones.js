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
import Skeleton from "@material-ui/lab/Skeleton";

import PopUp from "../components/modals/PopUp";
import PopUpEdit from "../components/modals/PopUpEdit";
import PopUpEditError from "../components/modals/PopUpEditError";
import AgregarPrevision from "../components/previsiones/AgregarPrevision";
import EditPrevision from "../components/previsiones/EditPrevision";

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
  const [loadingPrevisiones, setLoadingPrevisiones] = useState(false);

  //State que almacena la peticion HTTP a la api y contiene una lista de objetos con los productos

  const [previsiones, setPrevisiones] = useState([]);
  //Su usa de esta manera el emptyRows para que el skeleton de la tabla cuando se esta cargando
  //Se ajuste a 5 filas.

  //Hay que arreglar los problemas cuando se eligen mas 5 filas por pagina
  const emptyRows =
    [...previsiones].length === 0
      ? rowsPerPage - Math.min(rowsPerPage, 5 - page * rowsPerPage)
      : rowsPerPage -
        Math.min(rowsPerPage, [...previsiones].length - page * rowsPerPage);

  //State que almacena el producto al hacer click en el icono de edit
  const [previsionEdit, setPrevisionEdit] = useState([]);
  //State que almacena le producto que se agrega en el modal de agregar y luego se pasa al popup de satisfaccion
  const [previsionAdd, setPrevisionAdd] = useState("");

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

  const editarPrevision = (prevision) => {
    // setBeforeEdit(producto);
    setPrevisionEdit(prevision);
    setOpenEdit(true);
  };

  useEffect(() => {
    const getPrevisiones = async () => {
      await Axios.get("https://gestex-backend.herokuapp.com/get/isapre").then(
        (response) => {
          setLoadingPrevisiones(true);
          setPrevisiones(response.data);
        }
      );
    };
    getPrevisiones();
  }, []);

  return (
    <div className="productos">
      {openEdit && (
        <EditPrevision
          setOpenModal={setOpenModal}
          previsiones={previsiones}
          setPrevisiones={setPrevisiones}
          setOpenEdit={setOpenEdit}
          previsionEdit={previsionEdit}
          setPrevisionEdit={setPrevisionEdit}
          setOpenPopUpEdit={setOpenPopUpEdit}
          setOpenPopUpEditError={setOpenPopUpEditError}
          openPopUpEdit={openPopUpEdit}
        />
      )}
      {openPopUp && <PopUp previsionAdd={previsionAdd} />}
      {openPopUpEdit && <PopUpEdit previsionEdit={previsionEdit} />}
      {openPopUpEditError && <PopUpEditError previsionEdit={previsionEdit} />}
      {openModal && (
        <AgregarPrevision
          setOpenModal={setOpenModal}
          previsionAdd={previsionAdd}
          setPrevisionAdd={setPrevisionAdd}
          previsiones={previsiones}
          setPrevisiones={setPrevisiones}
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
            A??adir Previsi??n
          </ColorButton>
        </div>

        <div className="tabla-personal">
          <div className="productos-list">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right" className={classes.head}>
                      Id Prevision
                    </TableCell>
                    <TableCell align="left" className={classes.head}>
                      Nombre Prevision
                    </TableCell>
                    <TableCell align="left" className={classes.head}>
                      Comisi??n (%)
                    </TableCell>
                    <TableCell className={classes.head}> Modificar </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingPrevisiones
                    ? (rowsPerPage > 0
                        ? previsiones.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : previsiones
                      ).map((prevision) => (
                        <TableRow hover="true" key={prevision.id_isapre}>
                          <TableCell
                            align="right"
                            style={{ width: 130 }}
                            component="th"
                            scope="row"
                          >
                            {prevision.id_isapre}
                          </TableCell>
                          <TableCell style={{ width: 200 }} align="left">
                            {prevision.nombre_isapre}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            {prevision.porcentaje_isapre}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <EditSharpIcon
                              className="editar"
                              onClick={() => {
                                editarPrevision(prevision);
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
                      count={[...previsiones].length}
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
