class Bottle extends MovableObject {
    x;
    y = 350;
    width = 75;
    height = 75;
    idealFrame = [30, 12, 45, 20];
    resizer = true;
    SOUND_BOTTLE = new Audio('audio/bottle.wav');

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 2000;
    }
}