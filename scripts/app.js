//MAIN
//SHORTCUTS
const d = document;
const w = window;
const form = d.querySelector("#formulario");
const email = d.querySelector("#email");
const fecha = d.querySelector("#fecha");
const horario = d.querySelector("#horario");
const submit = d.querySelector("#submit");
const print = d.querySelector("#request-list");
const tipo = d.querySelector("#tipo");

//EVENTOS

//AL CARGAR EL DOM
document.addEventListener("DOMContentLoaded", () => {
  peticion();
  minActual();
  hamburgerMenu(".btn-hmb", ".aside-btn");
  let listaTurnos;

  if (localStorage.getItem("turnos") != null) {
    listaTurnos = JSON.parse(localStorage.getItem("turnos"));

    listaTurnos.forEach((element) => {
      addPrint(element);
    });
  }
});

//EVENTO SUBMIT

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailTurno = email.value;
  const fechaTurno = fecha.value;
  const horarioTurno = horario.value;
  const tipoTurno = tipo.value;

  if (
    emailTurno === "" ||
    fechaTurno === "" ||
    horarioTurno === "" ||
    tipoTurno === ""
  ) {
    return addAlert("Completa los Campos, Por Favor", "danger");
  } else {
    const turnoId = getIdTurno();
    const turno = new Turno(
      turnoId,
      emailTurno,
      fechaTurno,
      horarioTurno,
      tipoTurno
    );

    addPrint(turno);

    storage(turno);

    addAlert(
      `Has pedido el turno correctamente para el ${fechaTurno} a las ${horarioTurno}`,
      "success"
    );
  }
});

//EVENTO CLICK SOBRE BUTTON DELETE.

d.addEventListener("click", (e) => {
  removeTurno(e.target);
});
