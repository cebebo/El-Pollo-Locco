class Chicken extends MovableObject {

    differences = Math.random() * 50;
    y = 350 - this.differences;
    height = 75 + this.differences;
    width = 75 + this.differences;
    idealFrame = [0, 0, 0, 0];
    xCol = this.x + this.idealFrame[0];
    yCol = this.y + this.idealFrame[1];
    wCol = this.width - this.idealFrame[2];
    hCol = this.height - this.idealFrame[3];
    dead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x + 700 + Math.random() * 700;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();

    }

    animate() {
        this.autoMoveLeft();
        setInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');}
        }, 150);
    }

}