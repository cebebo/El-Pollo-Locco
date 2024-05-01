class Chick extends MovableObject {

    y = 365;
    height = 60;
    width = 45;
    idealFrame = [0, 0, 0, 0];
    xCol = this.x + this.idealFrame[0];
    yCol = this.y + this.idealFrame[1];
    wCol = this.width - this.idealFrame[2];
    hCol = this.height - this.idealFrame[3];
    dead = false;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1200 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        let turnAroundTime = this.setTimeToTurnAround();
        let counter = 0;
        setInterval(() => {
            counter++;
            if (counter > turnAroundTime * 60) {
                counter = 0;
                turnAroundTime = this.setTimeToTurnAround();
                this.speed = 0.15 + Math.random() * 1;
            }
            if (turnAroundTime <= 8) {
                this.moveLeft();
                this.otherDirection = false;
            }
            if (turnAroundTime > 8) {
                this.moveRight();
                this.otherDirection = true;
            }
        }, 1000 / 60)

        this.chickWalk();
    }

    chickWalk() {
        setInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_WALKING);
            } else { this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png'); }
        }, 150);
    }

    setTimeToTurnAround() {
        return Math.random() * 10;
    }
}
