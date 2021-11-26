import React from "react";

function PopUp({
  productoAdd,
  procesoAdd,
  personalAdd,
  ordenAdd,
  colorAdd,
  previsionAdd,
  bancoAdd,
}) {
  console.log(previsionAdd);
  let display = "";
  if (productoAdd !== undefined) {
    display = productoAdd;
  }
  if (procesoAdd !== undefined) {
    display = procesoAdd.nombre_proceso;
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
  if (previsionAdd !== undefined && previsionAdd.nombre_isapre !== "null") {
    display = previsionAdd.nombre_isapre;
  }

  if (previsionAdd !== undefined && previsionAdd.nombre_afp !== "null") {
    display = previsionAdd.nombre_afp;
  }
  if (bancoAdd !== undefined) {
    display = bancoAdd.nombre_banco;
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
