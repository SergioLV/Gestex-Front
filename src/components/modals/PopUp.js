import React from "react";

function PopUp({
  productoAdd,
  procesoAdd,
  personalAdd,
  ordenAdd,
  colorAdd,
  previsionAdd,
}) {
  console.log(previsionAdd);
  let display = "";
  if (productoAdd !== undefined) {
    display = productoAdd;
  }
  if (procesoAdd !== undefined) {
    display = procesoAdd[0];
  }
  if (personalAdd !== undefined) {
    display = personalAdd.nombre;
  }
  if (ordenAdd !== undefined) {
    display = ordenAdd.id_cliente;
  }
  if (colorAdd !== undefined) {
    display = colorAdd;
  }
  if (previsionAdd.nombre_afp !== undefined) {
    display = previsionAdd.nombre_afp;
  }
  if (previsionAdd.nombre_isapre !== undefined) {
    display = previsionAdd.nombre_isapre;
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
