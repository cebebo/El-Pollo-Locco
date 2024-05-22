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


function init() {
    canvas = document.getElementById('canvas');
    checkTouchControll();
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 38) { keyboard.UP = true; };
    if (e.keyCode === 40) { keyboard.DOWN = true; };
    if (e.keyCode === 37) { keyboard.LEFT = true; };
    if (e.keyCode === 39) { keyboard.RIGHT = true; };
    if (e.keyCode === 32) { keyboard.SPACE = true; };
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode === 38) { keyboard.UP = false; };
    if (e.keyCode === 40) { keyboard.DOWN = false; };
    if (e.keyCode === 37) { keyboard.LEFT = false; };
    if (e.keyCode === 39) { keyboard.RIGHT = false; };
    if (e.keyCode === 32) { keyboard.SPACE = false; };
});

function fullscreen() {
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

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

function openSettings() {
    if (!settings) showSettings();
    else hideSettings();
}

function showSettings() {
    document.getElementById('settingsImage').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('controllerBar').classList.add('d-none');
    document.getElementById('soundBar').classList.remove('d-none');
    document.getElementById('restartButton').classList.remove('d-none');
    document.getElementById('restartButton').classList.add('restartSettings');
    settings = !settings;
}

function hideSettings() {
    document.getElementById('settingsImage').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('controllerBar').classList.remove('d-none');
    document.getElementById('soundBar').classList.add('d-none');
    document.getElementById('restartButton').classList.add('d-none');
    document.getElementById('restartButton').classList.remove('restartSettings');
    settings = !settings;
}

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

function prepareScreenForRestart() {
    document.getElementById('iconsBar').classList.remove('d-none');
    document.getElementById('restartButton').classList.remove('gameOver');
    document.getElementById('restartButton').classList.remove('restartSettings');
    document.getElementById('gameOverImage').classList.add('d-none');
    document.getElementById('settingsImage').classList.add('d-none');
    document.getElementById('levelCompleteImage').classList.add('d-none');
    document.getElementById('soundBar').classList.add('d-none');
}

function nextLevel() {
    level++;
    world.character.win = 3;
    if (level == 3) level = 2;
    document.getElementById('nextLevelButton').classList.add('d-none');
    hideCounterInDocument();
    allButtonsUnpressed();
    restartGame();
}

function allButtonsUnpressed() {
    world.keyboard.LEFT = false;
    world.keyboard.RIGHT = false;
    world.keyboard.UP = false;
    world.keyboard.DOWN = false;
    world.keyboard.SPACE = false;
}

function checkLevel() {
    if (level == 1) { return settingsLevel1(); }
    if (level == 2) { return settingsLevel2(); }
}

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


function checkTouchControll() {
    checkTouchLeft();
    checkTouchRight();
    checkTouchUp();
    checkTouchDown();
    checkTouchSpace();
}

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

function openPopUp(location) {
    document.getElementById('popUp').classList.remove('d-none');
    document.getElementById(location).classList.remove('d-none');
}

function closePopUp() {
    document.getElementById('popUp').classList.add('d-none');
    document.getElementById('introduction').classList.add('d-none');
    document.getElementById('privacyPolicy').classList.add('d-none');
    document.getElementById('legalNotice').classList.add('d-none');
}
