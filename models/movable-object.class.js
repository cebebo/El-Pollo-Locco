class MovableObject extends DrawableObject {

    speed;
    speedY = 0;
    acceleration = 2;
    otherDirection = false;
    energy;
    lastHit = 0;

    /**
     * Checks whether the character is in the air and whether there is a buoyancy speed and initiates the jump calculation taking into account the earth's gravity.
     * 
     */
    applyGravity() {
        setInterval(() => {
            if (this.aboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Determines from which position the character is in the air.
     * 
     * @returns - Position from where you are in the air.
     */
    aboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        } else {
            return this.y < 135;
        }
    }

    /**
     * Checks whether the character is above the opponent.
     * 
     * @param {variable} enemy - Variable of the enemy.
     * @returns - True, if position of the character is above enemy.
     */
    jumpAttack(enemy) {
        return (this.y + this.idealFrame[1] + this.height - this.idealFrame[3]) < (enemy.y + enemy.idealFrame[1]);
    }

    /**
     * Automatically causes the opponent to move to the left.
     * 
     */
    autoMoveLeft() {
        setInterval(() => {
            if (!settings) this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Sets a random value for the period of time when the running direction changes.
     * 
     * @returns - Random value between 1 and 10.
     */
    setTimeToTurnAround() {
        return Math.random() * 10;
    }

    /**
     * Let object move to the right.
     * 
     */
    moveRight() {
        if (!settings) this.x += this.speed;
    }

    /**
     * Let object move to the left.
     * 
     */
    moveLeft() {
        if (!settings) this.x -= this.speed;
    }

    /**
     * Plays the graphics of an array one after the other in a continuous loop.
     * 
     * @param {variable} images - Array containing the graphics of the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays the graphics of an array one after the other within a specified time.
     * 
     * @param {variable} images - Array containing the graphic file pathes.
     * @param {integer} i - Amount of the graphics.
     * @param {integer} time - Duration for how long the animation should be displayed.
     */
    playAnimationOnce(images, i, time) {
        let animatedIntervall = setInterval(() => {
            let path = images[i];
            this.img = this.imageCache[path];
            i++;
            if (i == images.length) clearInterval(animatedIntervall);
        }, time);
    }

    /**
     * Plays the graphics of an array one after the other.
     * 
     * @param {variable} images - Array containing the graphic file pathes.
     */
    playAnimationNoLoop(images) {
        let path = images[frameCounter];
        this.img = this.imageCache[path];
        if (frameCounter < images.length - 1) frameCounter++;

    }

    /**
     * Sets the force of buoyancy.
     * 
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Checks whether two objects collide with each other.
     * 
     * @param {variable} obj - Variable of the object.
     * @returns - Returns a true, if a collision happend.
     */
    isColliding(obj) {
        return (this.x + this.idealFrame[0] + this.width - this.idealFrame[2]) >= obj.x + obj.idealFrame[0] &&
            this.x + this.idealFrame[0] <= (obj.x + obj.idealFrame[0] + obj.width - obj.idealFrame[2]) &&
            (this.y + this.idealFrame[1] + this.height - this.idealFrame[3]) >= obj.y + obj.idealFrame[1] &&
            (this.y + this.idealFrame[1]) <= (obj.y + obj.idealFrame[1] + obj.height - obj.idealFrame[3]);
    }

    /**
     * Determines which object loses life points and to what extent.
     * 
     */
    hit() {
        if (this instanceof Endboss) this.energy -= levelValues[level - 1].endbossHit;
        else this.energy -= levelValues[level - 1].characterHit;
        if (this.energy < 0) { this.energy = 0; }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks, if Object is dead.
     * 
     * @returns - True, if energy level is 0.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Sets the time in which the object is violated.
     * 
     * @returns - True, if time is passed.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }

    /**
     * Initiates the rotation animation in 2D and sets the size and speed.
     * 
     * @param {*} maxWidth - Maximum width of the object.
     * @param {*} speed - Value of fps for rotation.
     */
    rotateObject(maxWidth, speed) {
        setInterval(() => {
            if (this.rotation) this.rotationBecomingSmaller(speed);
            if (this.width == 0) this.rotationChangesDirection();
            if (!this.rotation) this.rotationBecomingLarger(speed);
            if (this.width == maxWidth) { this.rotation = true; }
        }, 30);
    }

    /**
     * Initiates the switch to mirroring.
     * 
     */
    rotationChangesDirection() {
        this.rotation = false;
        this.otherDirection = !this.otherDirection;
    }

    /**
     * Reduces the width of the graphic for optical rotation.
     * 
     * @param {integer} speed - Value of speed.
     */
    rotationBecomingSmaller(speed) {
        this.width -= speed;
        this.x += speed / 2;
    }

    /**
     * Increases the width of the graphic for optical rotation.
     * 
     * @param {integer} speed - Value of speed.
     */
    rotationBecomingLarger(speed) {
        this.width += speed;
        this.x -= speed / 2;
    }
}


