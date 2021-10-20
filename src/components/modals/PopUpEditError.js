import React from "react";

function PopUpEditError({ productoEdit }) {

  return (
    <div>
      <div className="pop-up">
        <div className="card">
          <div className="formulario-producto">
            <h1 className="producto-title">{productoEdit.nombre_producto}</h1>
            <hr className="divisor-popup" id="agregar-producto" />
            <p>Ha ocurrido un error al editar este producto!</p>
          </div>
          <div className="borde"></div>
        </div>
      </div>
    </div>
  );
}

export default PopUpEditError;
