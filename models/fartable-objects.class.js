class FartableObject extends MovableObject {

    x;
    y;
    width = 0;
    height = 80;
    fartStrength = world.fartStrength;


    constructor(x, y) {
        super().loadImage('img/fart.png');
        this.checkSide();
        this.x = x;
        this.y = y;
    }

    checkSide() {
        setInterval(() => {
            if (direction == 'right') this.fartToLeftSide();
            else this.fartToRightSide();
        }, 1000 / 60);
    }

    fartToLeftSide() {
        this.otherDirection = false;
        this.width = (this.fartStrength * 4);
        
    }

    fartToRightSide() {
        this.otherDirection = true;
        this.width = (this.fartStrength * 4);
    }

}