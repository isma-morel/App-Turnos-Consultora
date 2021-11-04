//FUNCION PONER MIN ACTUAL AL INPUT FECHA

const minActual = () => {
  const fechaInput = document.querySelector("#fecha");

  const fechaActual = new Date();

  const year = fechaActual.getFullYear();

  const month = fechaActual.getMonth() + 1;
  const day = fechaActual.getDate() + 1;

  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let fechaDeshabilitar;

  if (number.includes(month)) {
    //LO ORDENO DE LA MANERA CORRECTA PARA HTML
    fechaDeshabilitar = `${year}-0${month}-${day}`;
    if (number.includes(day)) {
      //LO ORDENO DE LA MANERA CORRECTA PARA HTML
      fechaDeshabilitar = `${year}-${month}-0${day}`;
    }
  } else {
    //VERIFICO SI TIENE NUMEROS DE LA LISTA
    if (number.includes(day)) {
      //LO ORDENO DE LA MANERA CORRECTA PARA HTML
      fechaDeshabilitar = `${year}-${month}-0${day}`;
    } else {
      //LO ORDENO DE LA MANERA CORRECTA PARA HTML
      fechaDeshabilitar = `${year}-${month}-${day}`;
    }
  }
  //LO AGREGO AL MIN DEL INPUT
  fechaInput.min = fechaDeshabilitar;
};

//AGREGANDO TURNO A STORAGE

const storage = (turno) => {
  let listaTurnos;
  if (localStorage.getItem("turnos") == null) {
    listaTurnos = [];

    listaTurnos.push(turno);

    localStorage.setItem("turnos", JSON.stringify(listaTurnos));
  } else {
    listaTurnos = JSON.parse(localStorage.getItem("turnos"));

    listaTurnos.push(turno);

    localStorage.setItem("turnos", JSON.stringify(listaTurnos));
  }
};

//HACIENDO PRINT

const addPrint = (turno) => {
  const requestList = document.querySelector("#request-list");

  const div1 = document.createElement("div");
  div1.setAttribute("class", "container-div");

  div1.innerHTML = `
            <div class="card text-center card-custom mb-4 alerta">
                <div class="card-body card-1" id="${turno.turnoId}">
                    <img src=${turno.src} alt="tipo de turno"/>
                    <span>ID:</span> ${turno.turnoId}
                    <span>Para: ${turno.tipo}</span>
                    <span>Username:</span> ${turno.username}
                    <span>Fecha de turno:</span> ${turno.fecha}
                    <span>Horario de turno:</span> ${turno.horario}
                    <button class="btn-btn-danger" name="delete" id="btn-delete">Delete</button>
                </div>
            </div>
        `;
  //LO AGREGO COMO HIJO DEL DIV QUE CREE
  requestList.appendChild(div1);
  //RESETEO EL FORMULARIO AL AGREGAR ELEMENTO
  document.querySelector("#formulario").reset();
};

//ALERTA 'TURNO AGREGADO CORRECTAMENTE'

const addAlert = (message, cssClass) => {
  //CREO Y AGREGO ATRIBUTOS AL ELEMENTO
  const div = document.createElement("div");
  div.setAttribute("class", `alert alerta alert-${cssClass}`);
  div.appendChild(document.createTextNode(message));
  //MUESTRO EN DOCUMENT
  const container = document.querySelector(".seccion-turnos");
  const div2 = document.querySelector("#insertAlert");
  container.insertBefore(div, div2);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 1500);
};

//REMOVER TURNO DEL DOM

const removeTurno = (element) => {
  if (element.name === "delete") {
    element.parentElement.parentElement.parentElement.remove();

    addAlert("Turno removido correctamente!", "info");

    storageRemove(element);
  }
};

//TOMANDO VALOR DE ID

const getIdTurno = () => {
  let lista = JSON.parse(localStorage.getItem("turnos"));

  let newId;

  if (lista == null || lista.length == 0) {
    let idTurno = 0;

    newId = idTurno + 1;

    return newId;
  } else {
    let newId = lista[lista.length - 1].turnoId + 1;

    return newId;
  }
};

//REMOVIENDO TURNO DE LA LISTA

const storageRemove = (element) => {
  let elemento = element;

  lista = JSON.parse(localStorage.getItem("turnos"));

  lista = lista.filter((e) => {
    if ("turnoId" in e && e.turnoId != elemento.parentElement.id) {
      return true;
    } else {
      return false;
    }
  });

  localStorage.setItem("turnos", JSON.stringify(lista));

  console.log(lista);
};

//Hamburger

const hamburgerMenu = (asideBtn, aside) => {
  const d = document;
  d.addEventListener("click", (e) => {
    if (e.target.matches(asideBtn) || e.target.matches(`${asideBtn} *`)) {
      d.querySelector(aside).classList.toggle("is-active");
      d.querySelector(asideBtn).classList.toggle("is-active");
    }
  });
};

//AJAX
const setData = [];

const getData = async () => {
  await fetch("../mock/data.json")
    .then((response) => response.json())
    .then((data) => setData.push(data));
  console.log(setData);
};

getData();
