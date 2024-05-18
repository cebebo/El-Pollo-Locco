class Controller extends MovableObject {
    x;
    y;
    height = 35;
    width = 35;
    action;

    BUTTONS = [
        'img/0_buttons/moveLeft.png',
        'img/0_buttons/moveRight.png',
        'img/0_buttons/jump.png',
        'img/0_buttons/bottle.png',
        'img/0_buttons/fart.png',
        'img/settings.png'
    ];

    BUTTONS_PRESSED = [
        'img/0_buttons/moveLeftPress.png',
        'img/0_buttons/moveRightPress.png',
        'img/0_buttons/jumpPress.png',
        'img/0_buttons/bottlePress.png',
        'img/0_buttons/fartPress.png'
    ];

    constructor(x, y, i) {
        super();
        this.loadImage(this.BUTTONS[i]);
        // this.loadImages(this.BUTTONS);
        this.x = x;
        this.y = y;
        // this.action = action;
        // this.checkPressedButtons();
        
    }

    // checkPressedButtons() {
        
    // }

}