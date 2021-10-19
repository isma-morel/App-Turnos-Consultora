export class UI {
    addRequest (request) {
        const requestList = document.getElementById('request-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body card-1" id="${request.requestId}">
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
        }
        
    }
}