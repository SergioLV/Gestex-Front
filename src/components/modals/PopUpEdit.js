import React from "react";

function PopUpEdit({ productoEdit }) {

  return (
    <div>
      <div className="pop-up">
        <div className="card">
          <div className="formulario-producto">
            <h1 className="producto-title">{productoEdit.nombre_producto}</h1>
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
