/*
* JS Para la gestión de datos del usuario
*/

// Definición de variables
var nick;
var difficulty;
var numCards;
var avatarImg;

/**
 * Almacenar los datos en el sessionStorage
 * @param  {HTMLElement} nick nick del usuario
 * @param  {HTMLElement} difficulty dificultad del juego
 * @param  {HTMLElement} cards número de tarjetas
 * * @param  {HTMLElement} avatar avatar del usuario
 */
function storeUserData(nickInput,difficultyInput, cardsInput,avatar) {
    sessionStorage.setItem('nick', nickInput.value);
    localStorage.setItem('difficulty', difficultyInput.value);
    localStorage.setItem('cards', cardsInput.value);
    localStorage.setItem('avatar', avatar.src);

}
/**
 * Recoge los datos almacenados previamente
 */
function getUserData() {
    nick = sessionStorage.getItem('nick');
    difficulty = localStorage.getItem('difficulty');
    numCards = localStorage.getItem('cards');
    avatarImg = localStorage.getItem('avatar');
}
/**
 * Comprueba si existe nick en el sessionStorage
 */
function checkUserData() {
    if (nick == null) {
        sessionStorage.setItem('error', 'No se ha rellenado correctamente el formulario');
        return false;
    }
    return true;
}