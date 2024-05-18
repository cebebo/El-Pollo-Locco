let canvas;
let world;
let keyboard = new Keyboard();
let touchController = [];
let direction = 'right';
let frameCounter = 0;
let gameCheckpoint = 0;
let MUSIC = new Audio('audio/crazy-town.mp3');
let SOUND_START = new Audio('audio/start.wav');
let settings = false;
let music = true;
let noises = true;

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
    document.getElementById('startImage').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('fullscreenIcon').classList.remove('d-none');
    document.getElementById('settingsIcon').classList.remove('d-none');
    document.getElementById('controllerBar').classList.remove('d-none');
    document.getElementById('title').style.opacity = 1;
    world = new World(canvas, keyboard);
    SOUND_START.play();
    MUSIC.play();
    MUSIC.volume = 0.2;
    MUSIC.loop = true;
}

function checkClickEvents() {
    canvas.addEventListener("click", function (event) {
        console.log('Klick!');
        var rect = canvas.getBoundingClientRect();
        var touchX = event.clientX - rect.left;
        var touchY = event.clientY - rect.top;
        if (isTouchedButton(touchX, touchY, 677, 10)) { openSettings(); }
    });
}

function openSettings() {
    if (!settings) {
        document.getElementById('settingsImage').classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('controllerBar').classList.add('d-none');
        document.getElementById('soundBar').classList.remove('d-none');
        settings = !settings;
    } else {
        document.getElementById('settingsImage').classList.add('d-none');
        document.getElementById('canvas').classList.remove('d-none');
        document.getElementById('controllerBar').classList.remove('d-none');
        document.getElementById('soundBar').classList.add('d-none');
        settings = !settings;
    }
}

function MuteAudio(choice) {
    if (choice == 'settingsMusic') {
        if (music) { 
            MUSIC.pause();
            document.getElementById(choice).src = 'img/off.png'; 
        }
        else { 
            MUSIC.play()
            document.getElementById(choice).src = 'img/on.png'; 
        }
        music = !music;
    }
    if (choice == 'settingsNoises') {
        if (noises) { document.getElementById(choice).src = 'img/off.png'; }
        else { document.getElementById(choice).src = 'img/on.png'; }
        noises = !noises;
    }
}

function restartGame() {
    document.getElementById('gameOverImage').classList.add('d-none');
    world = '';
    startGame();
    world.character.energy = 100;
}

function checkTouchControll() {
    document.getElementById('moveLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.getElementById('moveLeft').src = 'img/0_buttons/moveLeftPress.png';
        keyboard.LEFT = true;
    });
    document.getElementById('moveRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.getElementById('moveRight').src = 'img/0_buttons/moveRightPress.png';
        keyboard.RIGHT = true;
    });
    document.getElementById('jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.getElementById('jump').src = 'img/0_buttons/jumpPress.png';
        keyboard.UP = true;
    });
    document.getElementById('fart').addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.getElementById('fart').src = 'img/0_buttons/fartPress.png';
        keyboard.DOWN = true;
    });
    document.getElementById('bottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.getElementById('bottle').src = 'img/0_buttons/bottlePress.png';
        keyboard.SPACE = true;
    });

    document.getElementById('moveLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        document.getElementById('moveLeft').src = 'img/0_buttons/moveLeft.png';
        keyboard.LEFT = false;
    });
    document.getElementById('moveRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        document.getElementById('moveRight').src = 'img/0_buttons/moveRight.png';
        keyboard.RIGHT = false;
    });
    document.getElementById('jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        document.getElementById('jump').src = 'img/0_buttons/jump.png';
        keyboard.UP = false;
    });
    document.getElementById('fart').addEventListener('touchend', (e) => {
        e.preventDefault();
        document.getElementById('fart').src = 'img/0_buttons/fart.png';
        keyboard.DOWN = false;
    });
    document.getElementById('bottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        document.getElementById('bottle').src = 'img/0_buttons/bottle.png';
        keyboard.SPACE = false;
    });
}

