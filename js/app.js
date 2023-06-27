/*
* JS Para la comprobación de datos del Formulario de entrada
*/

// Definición de variables y constantes
const nickInput = document.getElementById('nick');
const difficultyInput = document.getElementById('difficulty');
const cardsInput = document.getElementById('numberOfCards');
const submittedForm = document.getElementById('entryForm');

var avatar = document.getElementById('actualAvatar');
var draggableAvatar = document.getElementsByClassName('selectableAvatar');
var error = document.getElementById('error');

// Definición de funciones para seleccionar el avatar
/**
 * Cambia el src de la imagen de avatar
 * @param  {EventObject} event Evento que toma como referencia para seleccionar el objetivo
 */
function changeImg(event) {
    event.target.src = draggedImg;
}

/**
 * Selecciona el src de la imagen que está siendo arrastrada
 * @param  {EventObject} event Evento que toma como referencia para seleccionar el objetivo
 */
function dragStart(event) {
    draggedImg = event.target.src;
}

// Definición de funciones para comprobar el formulario
/**
 * Comprueba los datos correctos del formualrio de entrada
 * @param  {EventObject} event Evento que salta al realizar submit
 */
function checkForm(event){
    // Comprueba si el nick comienza con un número
    if(nickInput.value.match(/(?<!\S)[0-9]/))
    {
        nickInput.focus();
        event.preventDefault();
        error.innerText="El campo de nick no puede comenzar con un numero";
        return false;
    } // Comprueba si el nick está vacío
    else if (!nickInput.value) {
        nickInput.focus();
        event.preventDefault();
        error.innerText="El campo de nick no puede estar vacío";
        return false;
    } // Comprueba si la dificultad está vacía
    else if(difficultyInput.value == "0") {
        difficultyInput.focus();
        event.preventDefault();
        error.innerText="Se debe seleccionar una dificultad";
        return false;
    } // Comprueba si el número de tarjetas está vacío
    else if(cardsInput.value=="0"){
        cardsInput.focus();
        event.preventDefault();
        error.innerText="Se debe seleccionar un número de cartas";
        return false;
    }
    //Si la información es correcta se almacena
    storeUserData(nickInput,difficultyInput, cardsInput,avatar);

    return true;
}

// Los eventos solo se ejecutan una vez que esté cargado el DOM
document.addEventListener('DOMContentLoaded', (event) => {
    submittedForm.addEventListener('submit', checkForm);
    // Bucle para detectar el 'drag' de cualquier avatar
    for (let selectedAvatar of draggableAvatar) {
        selectedAvatar.addEventListener('dragstart', dragStart);
    }
    avatar.addEventListener('dragover',e=>{e.preventDefault()})
    avatar.addEventListener('drop', changeImg);
});