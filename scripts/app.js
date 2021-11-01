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

//JQUERY
const div2 = $(".jquery-event")[0];
const btn = $("#btn-query");

const h2 = $("#h2-query");
console.log(div2, btn);
$("body").append('<button class="borrar">borrar holas</button>');

btn.click(() => {
  $("body").append(
    '<h2 class="h2-query" style="position: relative; left: -100%; opacity: 0;">Hola</h2>'
  );
  $(".h2-query").animate(
    {
      left: "0",
      opacity: "1",
    },
    "slow",
    () => {
      console.log("fin");
    }
  );
});

$(".borrar").click(() => {
  $(".h2-query").fadeOut(300).delay(500).fadeIn(300);
});

//EVENTOS

//AL CARGAR EL DOM
document.addEventListener("DOMContentLoaded", () => {
  minActual();
  hamburgerMenu(".btn-hmb", ".aside-btn");
  let listaTurnos;
  //VALIDO SI HAY UNA CLAVE EN STORAGE
  if (localStorage.getItem("turnos") != null) {
    //SI LA HAY ME TRAIGO SU VALOR Y LO PARSEO
    listaTurnos = JSON.parse(localStorage.getItem("turnos"));
    //RECORRO LA LISTA Y LE HAGO EL PRINT
    listaTurnos.forEach((element) => {
      //LLAMO A MI FUNCION QUE CREA LOS PRINTS
      addPrint(element);
    });
  }
});

//EVENTO SUBMIT

form.addEventListener("submit", (e) => {
  //CANCELO EL ENVIO AL SERVIDOR
  e.preventDefault();
  //LE ASIGNO UNA VARIABLE AL VALOR DE CADA INPUT
  const emailTurno = email.value;
  const fechaTurno = fecha.value;
  const horarioTurno = horario.value;
  //VALIDO QUE LOS INPUTS NO ESTEN VACIOS
  if (emailTurno === "" || fechaTurno === "" || horarioTurno === "") {
    //SÍ ESTAN VACIOS ENVIO UNA ALERTA AL DOM
    return addAlert("Completa los Campos, Por Favor", "danger");
  } else {
    //SÍ NO ESTAN VACIOS
    //CREO EL ID Y EL OBJETO DE CADA TURNO
    const turnoId = getIdTurno();
    const turno = new Turno(turnoId, emailTurno, fechaTurno, horarioTurno);
    //HAGO EL PRINT DEL OBJETO QUE CREE
    addPrint(turno);
    //GUARDO EN STORAGE EL OBJETO
    storage(turno);
    //LE CONFIRMO AL USUARIO QUE SE GUARDO SU TURNO
    addAlert(
      `Has pedido el turno correctamente para el ${fechaTurno} a las ${horarioTurno}`,
      "success"
    );
  }
});

//EVENTO CLICK SOBRE BUTTON DELETE.

d.addEventListener("click", (e) => {
  //USO EL METODO TARGET PARA VER SI AL HACER CLICK
  //EL USUARIO SELECCIONA MI BOTON DELETE
  //AL SELECCIONAR LO VALIDA Y BORRA LA MINI CARD
  removeTurno(e.target);
});

//JQUERY EVENT
