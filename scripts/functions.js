




//Deshabilitar las fechas anteriores a la actual en el html
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


//Tomar Id request del local storage

function getRequestId() {
    let lastRequestId = localStorage.getItem('turno');
    lastRequestId = JSON.parse(lastRequestId);
    localStorage.setItem('requestId', JSON.stringify(newRequestId))
    return newRequestId;
}

export {deshabilitar, getRequestId};