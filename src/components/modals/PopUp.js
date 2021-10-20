import React from "react";

function PopUp({ productoAdd }) {
  return (
    <div>
      <div className="pop-up">
        <div className="card">
          <div className="formulario-producto">
            <h1 className="producto-title">{productoAdd}</h1>
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
