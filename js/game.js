let canvas;
let world;
let firstStart = true;
let keyboard = new Keyboard();
let touchController = [];
let direction = 'right';
let frameCounter = 0;
let gameCheckpoint = 0;
let MUSIC = new Audio('audio/crazy-town.mp3');
let SOUND_START = new Audio('audio/start.wav');
let MUSIC_ENDBOSS = new Audio('audio/musicEndboss.mp3');
let settings = false;
let mute = false;
let music = false;
let song;
let noises = true;
let level = 1;

/**
 * Initializes the start functions when the website is accessed.
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    checkTouchControll();
}

/**
 * Changes the variables when a specific key is pressed.
 * 
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 38) { keyboard.UP = true; };
    if (e.keyCode === 40) { keyboard.DOWN = true; };
    if (e.keyCode === 37) { keyboard.LEFT = true; };
    if (e.keyCode === 39) { keyboard.RIGHT = true; };
    if (e.keyCode === 32) { keyboard.SPACE = true; };
});

/**
 * Changes the variables when a specific key is released.
 * 
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode === 38) { keyboard.UP = false; };
    if (e.keyCode === 40) { keyboard.DOWN = false; };
    if (e.keyCode === 37) { keyboard.LEFT = false; };
    if (e.keyCode === 39) { keyboard.RIGHT = false; };
    if (e.keyCode === 32) { keyboard.SPACE = false; };
});

/**
 * Enters the fullscreen mode.
 * 
 */
function fullscreen() {
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

/**
 * Makes the request for fullscreen mode.
 * 
 * @param {variable} element - Variable of the object, that is requested for fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Leaves the fullscreen mode.
 * 
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Starts the game with all default settings.
 * 
 */
function startGame() {
    prepareStartScreen();
    world = new World(canvas, keyboard);
    SOUND_START.play();
    music = true;
    song = 1;
    MUSIC.volume = 0.2;
    MUSIC.loop = true;
    backgroundMusic();
    if (firstStart) {
        firstStart = false;
        restartGame();
    }
}

/**
 * Shows the canvas with the start of the game.
 * 
 */
function prepareStartScreen() {
    document.getElementById('startImage').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('restartButton').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('fullscreenIcon').classList.remove('d-none');
    document.getElementById('settingsIcon').classList.remove('d-none');
    document.getElementById('controllerBar').classList.remove('d-none');
    document.getElementById('title').style.opacity = 1;
}

/**
 * Checks which background music should be played and whether the mute function is activated.
 * 
 */
function backgroundMusic() {
    if (!mute && music) {
        if (song == 1) {
            MUSIC.play();
            MUSIC_ENDBOSS.pause()
        }
        if (song == 2) {
            MUSIC_ENDBOSS.play();
            MUSIC.pause();
        }
    } else {
        if (song == 1) MUSIC.pause();
        if (song == 2) MUSIC_ENDBOSS.pause();
    }
}

/**
 * Opens und closes the setting screen.
 * 
 */
function openSettings() {
    if (!settings) showSettings();
    else hideSettings();
}

/**
 * Shows all relevant objects in setting screen.
 * 
 */
function showSettings() {
    document.getElementById('settingsImage').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('controllerBar').classList.add('d-none');
    document.getElementById('soundBar').classList.remove('d-none');
    document.getElementById('restartButton').classList.remove('d-none');
    document.getElementById('restartButton').classList.add('restartSettings');
    settings = !settings;
}

/**
 * Hides all relevant objects in setting screen.
 * 
 */
function hideSettings() {
    document.getElementById('settingsImage').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('controllerBar').classList.remove('d-none');
    document.getElementById('soundBar').classList.add('d-none');
    document.getElementById('restartButton').classList.add('d-none');
    document.getElementById('restartButton').classList.remove('restartSettings');
    settings = !settings;
}

/**
 * Mutes the background music and sounds when a switch is pressed.
 * 
 * @param {string} choice - Explains if music or noises has to be muted.
 */
function MuteAudio(choice) {
    if (choice == 'settingsMusic') {
        if (!mute) document.getElementById(choice).src = 'img/off.png';
        else document.getElementById(choice).src = 'img/on.png';
        mute = !mute;
    }
    if (choice == 'settingsNoises') {
        if (noises) document.getElementById(choice).src = 'img/off.png';
        else document.getElementById(choice).src = 'img/on.png';
        noises = !noises;
    }
}

/**
 * Restarts the game by stopping all intervalls and getting the display ready for the game start.
 * 
 */
function restartGame() {
    prepareScreenForRestart();
    if (settings) settings = false;
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    world.character.energy = 100;
    gameCheckpoint = 0;
    currentLevel = checkLevel();
    checkTouchControll();
    startGame();
    world.character.gameIsOver = false;
}

/**
 * Loads all graphics needed to start the game.
 * 
 */
function prepareScreenForRestart() {
    document.getElementById('iconsBar').classList.remove('d-none');
    document.getElementById('restartButton').classList.remove('gameOver');
    document.getElementById('restartButton').classList.remove('restartSettings');
    document.getElementById('gameOverImage').classList.add('d-none');
    document.getElementById('settingsImage').classList.add('d-none');
    document.getElementById('levelCompleteImage').classList.add('d-none');
    document.getElementById('soundBar').classList.add('d-none');
}

/**
 * Initiates the start of the next level in the game.
 * 
 */
function nextLevel() {
    level++;
    world.character.win = 3;
    if (level == 3) level = 2;
    document.getElementById('nextLevelButton').classList.add('d-none');
    hideCounterInDocument();
    allButtonsUnpressed();
    restartGame();
}

/**
 * At the beginning of the level, set all movement variables to false so that the character doesn't start running on his own.
 * 
 */
function allButtonsUnpressed() {
    world.keyboard.LEFT = false;
    world.keyboard.RIGHT = false;
    world.keyboard.UP = false;
    world.keyboard.DOWN = false;
    world.keyboard.SPACE = false;
}

/**
 * Check the level reached and load the corresponding values.
 * 
 * @returns - Numder of level.
 */
function checkLevel() {
    if (level == 1) { return settingsLevel1(); }
    if (level == 2) { return settingsLevel2(); }
}

/**
 * Hides the final result display and sets all values to 0.
 * 
 */
function hideCounterInDocument() {
    document.getElementById('counts').classList.add('d-none');
    world.character.resultLife = 0;
    world.character.resultCoins = 0;
    world.character.counterLife = 0;
    world.character.counterCoins = 0;
    world.character.result = 0;
    document.getElementById('countResultCoins').innerHTML = '-?-';
    document.getElementById('countResultLife').innerHTML = '-?-';
    document.getElementById('countResult').innerHTML = '-?-';
}

/**
 * Checks all touch events in canvas.
 * 
 */
function checkTouchControll() {
    checkTouchLeft();
    checkTouchRight();
    checkTouchUp();
    checkTouchDown();
    checkTouchSpace();
}

/**
 * Checks all touch events on the 'move-left-button' and let the character move to the left.
 * 
 */
function checkTouchLeft() {
    document.getElementById('moveLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.getElementById('moveLeft').src = 'img/0_buttons/moveLeftPress.png';
        keyboard.LEFT = true;
    });
    document.getElementById('moveLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        document.getElementById('moveLeft').src = 'img/0_buttons/moveLeft.png';
        keyboard.LEFT = false;
    });
}

/**
 * Checks all touch events on the 'move-right-button' and let the character move to the right.
 * 
 */
function checkTouchRight() {
    document.getElementById('moveRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.getElementById('moveRight').src = 'img/0_buttons/moveRightPress.png';
        keyboard.RIGHT = true;
    });
    document.getElementById('moveRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        document.getElementById('moveRight').src = 'img/0_buttons/moveRight.png';
        keyboard.RIGHT = false;
    });
}

/**
 * Checks all touch events on the 'move-up-button' and let the character jump.
 * 
 */
function checkTouchUp() {
    document.getElementById('jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.getElementById('jump').src = 'img/0_buttons/jumpPress.png';
        keyboard.UP = true;
    });
    document.getElementById('jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        document.getElementById('jump').src = 'img/0_buttons/jump.png';
        keyboard.UP = false;
    });
}

/**
 * Checks all touch events on the 'move-down-button' and let the character fart.
 * 
 */
function checkTouchDown() {
    document.getElementById('fart').addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.getElementById('fart').src = 'img/0_buttons/fartPress.png';
        keyboard.DOWN = true;
    });
    document.getElementById('fart').addEventListener('touchend', (e) => {
        e.preventDefault();
        document.getElementById('fart').src = 'img/0_buttons/fart.png';
        keyboard.DOWN = false;
    });
}

/**
 * Checks all touch events on the 'spacebar' and let the character throw a bottle.
 * 
 */
function checkTouchSpace() {
    document.getElementById('bottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.getElementById('bottle').src = 'img/0_buttons/bottlePress.png';
        keyboard.SPACE = true;
    });
    document.getElementById('bottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        document.getElementById('bottle').src = 'img/0_buttons/bottle.png';
        keyboard.SPACE = false;
    });
}

/**
 * Opens the correct Popup when a spcific button is pressed.
 * 
 * @param {string} location - Shows what kind of screen should be displayed.
 */
function openPopUp(location) {
    document.getElementById('popUp').classList.remove('d-none');
    document.getElementById(location).classList.remove('d-none');
}

/**
 * Closes the PopUp, that was opened before.
 * 
 */
function closePopUp() {
    document.getElementById('popUp').classList.add('d-none');
    document.getElementById('introduction').classList.add('d-none');
    document.getElementById('privacyPolicy').classList.add('d-none');
    document.getElementById('legalNotice').classList.add('d-none');
}
