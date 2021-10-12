//APP DE TURNOS


class Request {
    constructor(requestId, username, date) {
        this.requestId = requestId;
        this.username = username;
        this.date = date;
    }
}

class UI {
    addRequest (request) {
        const requestList = document.getElementById('request-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body card-1" name="${request.requestId}">
                    <span>ID:</span> ${request.requestId}
                    <span>Username:</span> ${request.username}
                    <span>Request Date:</span> ${request.date}
                    <a href="#" class="btn-btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        requestList.appendChild(element)
    }
    addAlert(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alerta alert-${cssClass}`;
        div.appendChild(document.createTextNode(message))
        //mostrando en dom
        const container = document.querySelector('.seccion-turnos');
        const form = document.querySelector('.row')
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000)
    }
    resetForm () {
        document.getElementById('formulario').reset();
    }
    removeRequest (element, id) {
        
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove()
            this.addAlert('Request Removed Successfully', 'info');
            if (element.parentElement.name == id.requestId) {
                let idList = id.findIndex(e => e.requestId == id.requestId)
                id.splice(idList, 1);
                this.id = JSON.stringify(id);
                localStorage.setItem('turno', this.id)
            }
        }
        
    }
}


deshabilitar();

/*


Agregar min con la fecha actual!


*/

function deshabilitar() {

    const fechaInput = document.querySelector('#fecha');

    

    const fechaActual = new Date();
    const year = fechaActual.getFullYear(); 
    const month = fechaActual.getMonth() + 1; //Porque los meses empiezan en 0
    const day = fechaActual.getDate() +1;
    const number = [1,2,3,4,5,6,7,8,9]
    let fechaDeshabilitar;
    if (number.includes(month)){
        fechaDeshabilitar = `${year}-0${month}-${day}`;
        if (number.includes(day)) {
            fechaDeshabilitar = `${year}-${month}-0${day}`;
        }
    }else{ 
        if (number.includes(day)) {
            fechaDeshabilitar = `${year}-${month}-0${day}`;
        } else {
            fechaDeshabilitar = `${year}-${month}-${day}`
        }
    }
    console.log(fechaDeshabilitar)
    fechaInput.min = fechaDeshabilitar;
}

/*
ID REQUEST
*/

function getRequestId() {
    let lastRequestId = localStorage.getItem('requestId') || '0';
    let newRequestId = JSON.parse(lastRequestId) + 1;
    localStorage.setItem('requestId', JSON.stringify(newRequestId))
    return newRequestId;
}


const submit = document.querySelector('#formulario');
const requestList = []
let newList = JSON.parse(localStorage.getItem("turno"))
const nav = document.querySelector('.a')



submit.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const date = document.querySelector('#fecha').value;
    const requestId = getRequestId();
    const ui = new UI();
    const req = new Request(requestId, email, date);
    if(email === '' || date === '' ) {
        return ui.addAlert('Complete Fields Please', 'danger');
    }
    ui.addRequest(req);
    if (localStorage.getItem('turno') == null) {
        requestList.push(req)
        localStorage.setItem('turno', JSON.stringify(requestList))
    } else {
        newList.push(req)
        localStorage.setItem('turno', JSON.stringify(newList))
    }
    ui.resetForm();
    ui.addAlert(`Has pedido un turno exitosamente para la fecha ${date}`, 'secondary')
    console.log(requestList)
})

document.getElementById('request-list').addEventListener( 'click' ,(e) => {
    const ui = new UI()
    ui.removeRequest(e.target, newList)
})

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    if (newList) {
        newList.forEach((e) => {
            ui.addRequest(e)
        })
    }
})