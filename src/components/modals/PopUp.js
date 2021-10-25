import React from "react";

function PopUp({ productoAdd,procesoAdd,personalAdd }) {
  let display = "";
  if (productoAdd !== undefined) {
    display = productoAdd.nombre_producto;
  }
  if (procesoAdd !== undefined) {
    display = procesoAdd.nombre_proceso;
  }
  if (personalAdd !== undefined) {
    display = personalAdd.nombre;
  }
  return (
    <div>
      <div className="pop-up">
        <div className="card">
          <div className="formulario-producto">
            <h1 className="producto-title">{display}</h1>
            <hr className="divisor-popup" id="agregar-producto" />
            <p>Ha sido agregado con Éxito!</p>
          </div>
          <div className="borde"></div>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
