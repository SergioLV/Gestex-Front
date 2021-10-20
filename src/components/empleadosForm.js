import React from "react";
import "../App.css";
import Axios from "axios";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import {
  TextField,
  makeStyles,
} from "@material-ui/core";
import { validate } from "rut.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "8ch",
    },
    "& label.Mui-focused": {
      color: "#F55D3E",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#F55D3E",
    },
  },
}));
const validationSchema = yup.object({
  nombre: yup.string("Enter your nombre").required("nombre is required"),
  sueldo: yup.string("Enter your sueldo").required("sueldo is required"),
});

export default function Empleados() {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      sueldo: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      await Axios.post("http://localhost:3001/add/empleado", values).then(
        (response) => {
          console.log(response);
        }
      );
      //console.log(values)
    },
  });
 
  const validarRut = () => {
    console.log(validate("18.972.631-7"));
  };
  const classes = useStyles();
  return (
    <div className="formulario">
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <div className="datos-personales">
          <h1 className="nombre-seccion">Datos Personales</h1>
          <hr
            style={{
              color: "#000000",
              backgroundColor: "#000000",
              height: 0,
              borderColor: "#000000",
              marginLeft: "15px",
              marginRight: "120px",
              marginTop: "10px",
            }}
          />
          <TextField id="standard-basic" label="Nombre" />
          <TextField id="standard-basic" label="Apellido Paterno" />
          <TextField id="standard-basic" label="Apellido Materno" />
          <TextField id="rut" label="Rut" onInput={validarRut} />
        </div>

        {/* <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button> */}
      </form>
      <Formik
        initialValues={{ name: "jared" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <TextField id="standard-basic" label="Name" />
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              name="name"
            />
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <button type="submit">Enviar</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
