class Cloud extends MovableObject {

    y = 25;
    height = 240;
    width = 450;
    speed = 0.15;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x + Math.random() * 2300;
        this.animate();
    }
    /**
     * Animates the clouds to move to the left.
     * 
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Determines the left movement and the position of the clouds.
     * 
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}