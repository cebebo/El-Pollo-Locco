class Cactus extends MovableObject {
    x;
    y = 135;
    height = 300;
    width = 225;
    dead = false;

    IMAGES_KILLED_CACTUS = [
        'img/3_enemies_cactus/cactus-D1.png',
        'img/3_enemies_cactus/cactus-D2.png',
        'img/3_enemies_cactus/cactus-D3.png',
        'img/3_enemies_cactus/cactus-D4.png',
        'img/3_enemies_cactus/cactus-D5.png',
        'img/3_enemies_cactus/cactus-D6.png',
        'img/3_enemies_cactus/cactus-D7.png',
        'img/3_enemies_cactus/cactus-D8.png',
        'img/3_enemies_cactus/cactus-D9.png',
    ]

    constructor(x) {
        super().loadImage('img/3_enemies_cactus/cactus.png');
        this.loadImages(this.IMAGES_KILLED_CACTUS);
        this.x = x + 700 + Math.random() * 700;
        this.growingCactus();
        this.killedCactus();
    }

    /**
     * Sets the current size and position of the cactus and checks whether the cactus is still alive and should continue to grow or whether it is dying.
     * 
     */
    growingCactus() {
        let fixedHeight = this.height;
        let fixedWidth = this.width;
        this.height = 0;
        this.width = 0;
        this.x += fixedWidth;
        this.y += fixedHeight;
        if (!this.dead) this.letItGrow(fixedHeight, fixedWidth);
        else {
            this.playAnimation(this.IMAGES_KILLED_CACTUS);
            clearInterval(growing);
        }
    }

    /**
     * Allows the cactus to grow by 10% over a certain period of time and calculates the new position by changing the size. When the maximum size is reached, growth stops.
     * 
     * @param {number} fixedHeight - final hight of the cactus
     * @param {number} fixedWidth - final width of the cactus
     */
    letItGrow(fixedHeight, fixedWidth) {
        let growing = setInterval(() => {
            if (!this.dead && !settings) {
                this.height += fixedHeight / 10;
                this.width += fixedWidth / 10;
                this.y -= fixedHeight / 10;
                this.x -= fixedWidth / 20;
                if (this.height == fixedHeight) {
                    this.height = fixedHeight;
                    this.width = fixedWidth;
                    clearInterval(growing);
                }
            }
        }, levelValues[level-1].cactusGrow);
    }

    /**
     * Checks whether the cactus is dead and plays the death animation.
     * 
     */
    killedCactus() {
        let IVdeadCactus = setInterval(() => {
            if (this.dead) {
                this.playAnimationOnce(this.IMAGES_KILLED_CACTUS, 0, 100);
                clearInterval(IVdeadCactus);
            }
        }, 50);        
    }

}