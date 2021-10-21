//FUNCION PONER MIN ACTUAL AL INPUT FECHA

const minActual = () => {
    //TOMO INPUT
    const fechaInput = document.querySelector('#fecha');
    //GENERO FECHA ACTUAL
    const fechaActual = new Date();
    //TOMO DATOS DE FECHA ACTUAL
    const year = fechaActual.getFullYear(); 
    //LE SUMO 1 PORQUE LOS MESES EMPIEZAN EN 0
    const month = fechaActual.getMonth() + 1; 
    const day = fechaActual.getDate() +1;
    //VALIDACION PARA EVITAR ERRORES
    const number = [1,2,3,4,5,6,7,8,9]
    let fechaDeshabilitar;
    //VALIDO MESES Y DIAS
        //VERIFICO SI TIENE NUMEROS DE LA LISTA
    if (number.includes(month)){
        //LO ORDENO DE LA MANERA CORRECTA PARA HTML
        fechaDeshabilitar = `${year}-0${month}-${day}`;
        if (number.includes(day)) {
             //LO ORDENO DE LA MANERA CORRECTA PARA HTML
            fechaDeshabilitar = `${year}-${month}-0${day}`;
        }
    }else{ //VERIFICO SI TIENE NUMEROS DE LA LISTA
        if (number.includes(day)) {
             //LO ORDENO DE LA MANERA CORRECTA PARA HTML
            fechaDeshabilitar = `${year}-${month}-0${day}`;
        } else {
             //LO ORDENO DE LA MANERA CORRECTA PARA HTML
            fechaDeshabilitar = `${year}-${month}-${day}`
        }
    }
    //LO AGREGO AL MIN DEL INPUT
    fechaInput.min = fechaDeshabilitar;
}

//AGREGANDO TURNO A STORAGE

const storage = (turno) => {
    //CREAMOS VARIABLE PARA REDEFINIR DENTRO DEL BLOQUE IF
    let listaTurnos;
    if (localStorage.getItem('turnos') == null) {
        //SI NO TIENE NADA LE ASIGNAMOS EL VALOR DE UNA LISTA
        listaTurnos = [];
        //LE PUSHEO EL PRIMER TURNO A LA LISTA
        listaTurnos.push(turno);
        //Y SETEO LA LISTA PARSEANDOLA A JSON
        localStorage.setItem('turnos', JSON.stringify(listaTurnos));
    } else {
        //SI LA CLAVE TURNOS NO ES NULL, TRAIGO LA LISTA JSON Y LA PARSEO
        listaTurnos = JSON.parse(localStorage.getItem('turnos'));
        //PUSHEO EL NUEVO TURNO
        listaTurnos.push(turno);
        //Y VUELVO A SETEAR LA CLAVE CON SU NUEVO VALOR
        localStorage.setItem('turnos', JSON.stringify(listaTurnos));
    }
}


//HACIENDO PRINT

const addPrint = (turno) => {
    //LLAMO AL DIV REALIZARA EL PRTIN
    const requestList = document.querySelector('#request-list');
    //CREO DIV
    const div1 = document.createElement('div');
    //CREO SEGMENTO DE HTML CON TODOS LOS DATOS DE LOS TURNOS
    //Y AGREGO UNA ID AL PADRE DE BUTTON PARA PROXIMAMENTE ELIMINAR DE LOCAL STORAGE
    div1.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body card-1" id="${turno.turnoId}">
                    <span>ID:</span> ${turno.turnoId}
                    <span>Username:</span> ${turno.username}
                    <span>Fecha de turno:</span> ${turno.fecha}
                    <span>Horario de turno:</span> ${turno.horario}
                    <button class="btn-btn-danger" name="delete" id="btn-delete">Delete</button>
                </div>
            </div>
        `;
    //LO AGREGO COMO HIJO DEL DIV QUE CREE
    requestList.appendChild(div1)
    //RESETEO EL FORMULARIO AL AGREGAR ELEMENTO
    document.querySelector('#formulario').reset()
} 


//ALERTA 'TURNO AGREGADO CORRECTAMENTE'

const addAlert = (message, cssClass) => {
    //CREO Y AGREGO ATRIBUTOS AL ELEMENTO
    const div = document.createElement('div');
    div.setAttribute('class', `alert alerta alert-${cssClass}`);
    div.appendChild(document.createTextNode(message));
    //MUESTRO EN DOCUMENT
    const container = document.querySelector('.seccion-turnos')
    const div2 = document.querySelector('#insertAlert')
    container.insertBefore(div, div2);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}

//REMOVER TURNO DEL DOM


const removeTurno = (element) => {
    //VALIDO SI EL ELEMENT QUE VIENE POR EL PARAMETRO
    //TIENE EL MISMO NOMBRE QUE 'DELETE'
    if (element.name === 'delete') {
        //DE SER ASI ELIMINO AL PADRE CONTENEDOR 
        //DE LOS DIV DEL HTML
        element.parentElement.parentElement.parentElement.remove();
        //Y ENVIO UNA ALERTA VERIFICANDO QUE SE HAYA BORRADO
        addAlert('Turno removido correctamente!', 'info');
        //RELACIONO REMOVETURNO(REMOVER DEL DOM)
        //CON REMOVER DEL STORAGE
        //ELEMENT ES ES UN BUTTON CON NAME = 'DELETE'
        //LLAMO A STORAGE REMOVE
        //Y PONGO A ELEMENT COMO PARAMETRO
        //PARA FILTRAR EL ID DE SU PADRE
        storageRemove(element)
    }
}

//TOMANDO VALOR DE ID 

const getIdTurno = () => {
    //DECLARO UNA VARIABLE PARA COMPARAR
    //Y VERIFICAR SI HAY DATOS EN STORAGE
    let lista = JSON.parse(localStorage.getItem('turnos'));
    //DECLARO VARIABLES VACIAS
    let newId;
    //VERIFICO QUE NO HAYA NINGUN TURNO EN STORAGE
    if (lista == null || lista.length == 0) {
        let idTurno = -1;
        //LE SUMO +1 PARA QUE AL AGREGAR UN NUEVO TURNO
        //SU ID SE SUME Y NO SE REPITAN
        newId = idTurno + 1;
        //LA GUARDO EN STORAGE
        //RETORNO NEWID COMO NUMERO PARA LA VARIABLE TURNOID
        return newId
    } else {
        //EN NEW ID BUSCO EL ULTIMO ITEM DE LISTA Y SU PROP
        //LE SUMO +1 PARA QUE NO SE REPITA
        let newId = lista[lista.length - 1 ].turnoId + 1;
        //DEVUELVO NEWID COMO NUMERO PARA LA VARIABLE TURNOID
        return newId
    }
}

//REMOVIENDO TURNO DE LA LISTA

const storageRemove = (element) => {
    //GUARDO EL PARAMETRO ELEMENT EN LA VARIABLE ELEMENTO
    let elemento = element;
    //CREO VARIABLE LISTA Y TRAIGO DE STORAGE EL ARRAY TURNOS
    lista = JSON.parse(localStorage.getItem('turnos'));
    //FILTRO EL ARRAY CON UNA FUNCION PARA BUSCAR EL ID DEL PADRE DE ELEMENT
    //ME TRAE TODOS LOS ELEMENTOS DISTINTOS DE SU ID
    //ME DA UN ARRAY NUEVO SIN LA ID DEL PADRE DE ELEMENT
    lista = lista.filter((e) => {
        //FUNCION ORIGINAL EN MZD
        //SOLO CAMBIE ALGUNAS COSAS
        if ('turnoId' in e && e.turnoId != elemento.parentElement.id) {
            return true;
        } else {;
            return false;
        }
    } );
    //GUARDO EL NUEVO ARRAY EN EL LOCALSTORAGE
    //SOBREESCRIBIENDO EL SET ANTERIOR
    localStorage.setItem('turnos', JSON.stringify(lista))
    //VERIFICO
    console.log(lista)
}
