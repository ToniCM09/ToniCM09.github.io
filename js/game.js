

// Definición de variables y constantes
const gameContainer = document.getElementById('gameContainer');
const userAvatar = document.getElementById('userAvatar');
const userNick = document.getElementById('nick');
const cards = document.getElementsByClassName('gameCard');
const normalMultiplier = 2;
const hardMultiplier = 4;
const baseAttemps = 4;
const baseTimer = 3000;

var score = document.getElementById('score');
var numAttemps = document.getElementById('attemps');
var endGameText = document.getElementById('endGameText');
var i = 0;
var cardLimit = 0;
var timer = 0;
var lastCard;




/**
 * Reordena el contenido del array
 * @param  {array} array Array con las cartas o los items en HTML
 */
function reorderArray(array) {
    // Iterar el array desde el final hacia el inicio
    for (let i = array.length - 1; i > 0; i--) {
        let numCards = Math.floor(Math.random() * (i + 1)); // Indice aleatorio del array desde 0 hasta i
        // Intercambiamos las posiciones
        [array[i], array[numCards]] = [array[numCards], array[i]];
    }
}

/**
 * Dibuja el panel del juego
 */
function drawGamePanel() {
    score.value = 0;
    let items = [];
    let cards = ['media/aragorn.webp', 'media/balrog.webp', 'media/frodo.webp', 'media/gandalf.webp', 'media/gimli.webp', 'media/gollum.webp', 'media/legolas.webp', 'media/reybrujo.webp',
    'media/sam.webp', 'media/saruman.webp', 'media/sauron.webp', 'media/smaug.webp'];
    reorderArray(cards);
    for (let card of cards) {
        if (cardLimit >= (numCards / 2)) break;
        cardLimit++;
        for (let i = 0; i < 2; i++) {
            items.push(`<div class="gameItem"><div class="topCard"><img class="gameCard" src="${card}"></div></div>`);
        }
       
    }
    reorderArray(items);
    gameContainer.innerHTML=items.join('');
}
/**
 * Establece el avatar
 */
function setAvatar() {
    userAvatar.src = avatarImg;
}
/**
 * Establece el nick
 */
function setNick() {
    userNick.value = nick;
}
/**
 * Establece la dificultad
 */
function setDifficultyVariables() {
    if (difficulty == 'easy') {
        timer = baseTimer;
        numAttemps.value = baseAttemps * numCards;
    }
    else if (difficulty == 'normal') {
        timer = baseTimer / normalMultiplier;
        numAttemps.value = (baseAttemps / normalMultiplier) * numCards;
    }
    else if (difficulty == 'hard') {
        timer = baseTimer / hardMultiplier;
        numAttemps.value = (baseAttemps / hardMultiplier) * numCards;
    }
}
/**
 * Muestra la imagen tras la carta
 * @param  {EventObject} event Evento que toma como referencia para seleccionar el objetivo
 */
function rotateCards(event) {
    event.target.style.opacity = 1;
}
/**
 * Oculta la imagen selecciona y la anterior selección
 * @param  {EventObject} event Evento que toma como referencia para seleccionar el objetivo
 * @param  {EventObject} lastCard Evento que toma como referencia para seleccionar la carta anterior
 */
function coverCards(event, lastCard) {
    lastCard.target.style.opacity = 0;
    event.target.style.opacity = 0;
}
/**
 * Añade un punto a la puntuación
 */
function addScore() {
    score.value = parseInt(score.value) + 1;
}
/**
 * Reduce en uno el número de intentos
 */
function reduceAttemps() {
    numAttemps.value -= 1;
}
/**
 * Comprueba si la tarjeta seleccionada actualmente y la anterior comparten el mismo src
 * @param  {EventObject} event Evento que toma como referencia para seleccionar el objetivo
 */
function checkCardsEqual(event) {
    gameContainer.classList.add('mask');
    if (event.target.src == lastCard.target.src) {
        addScore()
        gameContainer.classList.remove('mask');
    } else {
        setTimeout(function(){
            coverCards(event, lastCard);
            gameContainer.classList.remove('mask');
        }, timer);
    }
}
/**
 * Gestiona los eventos 'click' del usuario en las tarjetas
 */
function gameplay() {
    let numCardsUp = 0;

    for (let selectedCard of cards) {
        selectedCard.addEventListener('click', function(event) {
            numCardsUp += 1;
            rotateCards(event)
            if (numCardsUp == 2) {
                checkCardsEqual(event);
                numCardsUp = 0;
                reduceAttemps()
            } else {
                lastCard = event;
            }
            if (numAttemps.value == 0 || parseInt(score.value) == (numCards / 2)) endGame();
                lastCard;
            });
    }
}
/**
 * Muestra la imagen de fin del juego y permite reiniciarlo o volver al formulario
 */
function endGame() {
    if (numAttemps.value == 0 && parseInt(score.value) < (numCards / 2)) {
        document.getElementById("endGame").style.zIndex = "2";
        document.getElementById("endGame").style.backgroundImage = "url('../media/sauronWins.webp')";
        endGameText.innerText = 'Vaya... Parece que no has sido capaz de derrotar al señor oscuro. ¿Quieres intentarlo de nuevo?';
    }
    else {
        document.getElementById("endGame").style.zIndex = "2";
        document.getElementById("endGame").style.backgroundImage = "url('../media/sauronFall.webp')";
        endGameText.innerText = '¡Enhorabuena! Sauron ha sido desterrado de la Tierra Media. ¿Quieres jugar de nuevo?';
    }
    
    document.getElementById("playAgain").addEventListener("click",(e)=> location.reload());
    document.getElementById("goHome").addEventListener("click",(e)=> location = 'index.html');
}

// Llamadas a las funciones
getUserData();
if (!checkUserData()) location = 'index.html';
setAvatar();
setNick();
setDifficultyVariables();
drawGamePanel();
gameplay();