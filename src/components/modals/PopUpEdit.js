import React from "react";

function PopUpEdit({ productoEdit, procesoEdit }) {
  console.log(productoEdit);
  let display = "";
  if (productoEdit !== undefined) {
    display = productoEdit.nombre_producto;
  }
  if (procesoEdit !== undefined) {
    display = procesoEdit.nombre_proceso;
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
