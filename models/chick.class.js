class Chick extends MovableObject {

    y = 365;
    height = 70;
    width = 50;
    idealFrame = [7, 7, 14, 14];
    xCol = this.x + this.idealFrame[0];
    yCol = this.y + this.idealFrame[1];
    wCol = this.width - this.idealFrame[2];
    hCol = this.height - this.idealFrame[3];
    dead = false;
    counter;
    turnAroundTime;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x + 700 + Math.random() * 700;
        this.speed = levelValues[level - 1].speedChick;
        this.animate();
    }

    animate() {
        this.turnAroundTime = this.setTimeToTurnAround();
        this.counter = 0;
        setInterval(() => {
            this.counter++;
            this.checkTurnAroundTime();
        }, 1000 / 60)
        this.chickWalk();
    }

    checkTurnAroundTime() {
        if (this.counter > this.turnAroundTime * 60) {
            this.counter = 0;
            this.turnAroundTime = this.setTimeToTurnAround();
            this.speed = 0.15 + Math.random() * levelValues[level-1].chickSpeed;
        }
        if (this.turnAroundTime <= 8) {
            this.moveLeft();
            this.otherDirection = false;
        }
        if (this.turnAroundTime > 8) {
            this.moveRight();
            this.otherDirection = true;
        }
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
