import React from "react";

function PopUpEdit({ productoEdit, procesoEdit, personalEdit, colorEdit }) {
  console.log(colorEdit);
  let display = "";
  if (productoEdit !== undefined) {
    display = productoEdit.nombre_producto;
  }
  if (procesoEdit !== undefined) {
    display = procesoEdit.nombre_proceso;
  }
  if (personalEdit !== undefined) {
    display = personalEdit.nombre_personal;
  }
  return (
    <div>
      <div className="pop-up">
        <div className="card">
          <div className="formulario-producto">
            <h1 className="producto-title">{display}</h1>
            <hr className="divisor-popup" id="agregar-producto" />
            <p>Ha sido editado con Éxito!</p>
          </div>
          <div className="borde"></div>
        </div>
      </div>
    </div>
  );
}

export default PopUpEdit;
