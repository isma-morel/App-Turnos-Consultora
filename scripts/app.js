//MAIN
//SHORTCUTS
const d = document;
const w = window;
const form = d.querySelector('#formulario');
const email = d.querySelector('#email');
const fecha = d.querySelector('#fecha');
const horario = d.querySelector('#horario')
const submit =  d.querySelector('#submit');
const print = d.querySelector('#request-list');


//EVENTOS


//AL CARGAR EL DOM
document.addEventListener('DOMContentLoaded', () => {
    minActual();
    let listaTurnos;
    //VALIDO SI HAY UNA CLAVE EN STORAGE
    if(localStorage.getItem('turnos') != null) {
        //SI LA HAY ME TRAIGO SU VALOR Y LO PARSEO
        listaTurnos = JSON.parse(localStorage.getItem('turnos'));
        //RECORRO LA LISTA Y LE HAGO EL PRINT
        listaTurnos.forEach(element => {
            //LLAMO A MI FUNCION QUE CREA LOS PRINTS
            addPrint(element);
        });
    }
})


//EVENTO SUBMIT

form.addEventListener('submit', (e) => {
    //CANCELO EL ENVIO AL SERVIDOR
    e.preventDefault();
    //LE ASIGNO UNA VARIABLE AL VALOR DE CADA INPUT
    const emailTurno = email.value;
    const fechaTurno = fecha.value;
    const horarioTurno = horario.value;
    //VALIDO QUE LOS INPUTS NO ESTEN VACIOS
    if(emailTurno === '' || fechaTurno === '' || horarioTurno === '') {
        //SÍ ESTAN VACIOS ENVIO UNA ALERTA AL DOM
        return addAlert('Completa los Campos, Por Favor', 'danger');
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
        addAlert(`Has pedido el turno correctamente para el ${fechaTurno} a las ${horarioTurno}`, 'success');
    }
})

//EVENTO CLICK SOBRE BUTTON DELETE.

d.addEventListener('click', (e) => {
    //USO EL METODO TARGET PARA VER SI AL HACER CLICK
    //EL USUARIO SELECCIONA MI BOTON DELETE
    //AL SELECCIONAR LO VALIDA Y BORRA LA MINI CARD
    removeTurno(e.target);
})