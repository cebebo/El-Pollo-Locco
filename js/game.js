let canvas;
let world;
let keyboard = new Keyboard();
let direction = 'right';
let frameCounter = 0;
let gameCheckpoint = 0;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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
    let fullscreen = document.getElementById('screen');
    enterFullscreen(fullscreen);
    document.getElementById('canvas').style.height='100vh';
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