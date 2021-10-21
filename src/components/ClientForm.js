import Axios from "axios";
import { Button, Paper } from "@material-ui/core";
import { validate } from "rut.js";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import * as Yup from "yup";
import CustomizedDialogs from "./dialog";

const ClientForm = ({ clientesList, setClientesList }) => {
  const url = "http://localhost:3001/add/cliente";
  const formik = useFormik({
    initialValues: {
      name: "",
      rut: "",
      email: "",
      direccion: "",
      comuna: "",
      ciudad: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      rut: Yup.string()
        .test("validar_rut", "Rut no valido", function (value) {
          return validate(value);
        })
        .required("El Rut es obligatorio"),
      email: Yup.string()
        .email("No es un email valido")
        .required("El email es obligatorio"),
      direccion: Yup.string().required("El direccion es obligatorio"),
      comuna: Yup.string().required("El comuna es obligatorio"),
      ciudad: Yup.string().required("El ciudad es obligatorio"),
      telefono: Yup.string().required("El telefono es obligatorio"),
    }),
    onSubmit: (formdata) => {
      Axios.post(url, {
        name: formdata.name,
        rut: formdata.rut,
        email: formdata.email,
        direccion: formdata.direccion,
        comuna: formdata.comuna,
        ciudad: formdata.ciudad,
        telefono: formdata.telefono,
      }).then((res) => {
        const cliente = {
          id_cliente:
          clientesList[
            Object.keys(clientesList)[Object.keys(clientesList).length - 1]
          ].id_cliente + 1,
          nombre_cliente: formdata.name,
          rut_cliente: formdata.rut,
          correo_electronico_cliente: formdata.email,
          direccion_cliente: formdata.direccion,
          comuna_cliente: formdata.comuna,
          ciudad_cliente: formdata.ciudad,
          telefono_cliente: formdata.telefono,
        };

        setClientesList([...clientesList,cliente]);

        // alert("Cliente añadido");
        formik.handleReset();
      });
    },
  });

  return (
    <CustomizedDialogs title="Agregar nuevo cliente">
      <Paper elevation={0}>
        <Form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
          <Form.Input
            type="text"
            placeholder="Nombre y Apellidos"
            name="name"
            onChange={formik.handleChange}
            error={formik.errors.name}
            value={formik.values.name}
          />
          <Form.Input
            type="text"
            placeholder="Rut"
            name="rut"
            onChange={formik.handleChange}
            error={formik.errors.rut}
            value={formik.values.rut}
          />
          <Form.Input
            type="text"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            error={formik.errors.email}
            value={formik.values.email}
          />
          <Form.Input
            type="text"
            placeholder="Direccion"
            name="direccion"
            onChange={formik.handleChange}
            error={formik.errors.direccion}
            value={formik.values.direccion}
          />
          <Form.Input
            type="text"
            placeholder="Comuna"
            name="comuna"
            onChange={formik.handleChange}
            error={formik.errors.comuna}
            value={formik.values.comuna}
          />
          <Form.Input
            type="text"
            placeholder="Ciudad"
            name="ciudad"
            onChange={formik.handleChange}
            error={formik.errors.ciudad}
            value={formik.values.ciudad}
          />
          <Form.Input
            type="text"
            placeholder="Telefono"
            name="telefono"
            onChange={formik.handleChange}
            error={formik.errors.telefono}
            value={formik.values.telefono}
          />
          <Button type="submit">Enviar</Button>
          <Button type="button" onClick={formik.handleReset}>
            Limpiar formulario
          </Button>
        </Form>
      </Paper>
    </CustomizedDialogs>
  );
};

export default ClientForm;
