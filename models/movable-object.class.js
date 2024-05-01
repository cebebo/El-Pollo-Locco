class MovableObject extends DrawableObject {
    
    speed;
    speedY = 0;
    acceleration = 2;
    otherDirection = false;
    energy = 300;
    lastHit = 0;
 

    applyGravity() {
        setInterval(() => {
            if (this.aboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    
    aboveGround() {
        if (this instanceof ThrowableObject) {
            // return true;
            return this.y < 360;
        } else {
        return this.y < 135;
        }
    }

    jumpAttack() {
        return this.y < 50;
    }

    autoMoveLeft() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    setTimeToTurnAround() {
        return Math.random() * 10;
    }

    stopMoving() {
        setInterval(() => {
            this.moveRight();
        }, 1000 / 60);
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 25;
    }

    isColliding(obj) { 
        return (this.x + this.idealFrame[0] + this.width - this.idealFrame[2]) >= obj.x + obj.idealFrame[0] && 
               this.x + this.idealFrame[0] <= (obj.x + obj.idealFrame[0] + obj.width - obj.idealFrame[2]) &&
               (this.y + this.idealFrame[1] + this.height - this.idealFrame[3]) >= obj.y + obj.idealFrame[1] &&
               (this.y + this.idealFrame[1]) <= (obj.y + obj.idealFrame[1] + obj.height - obj.idealFrame[3]); 
    }

    hit() {
        this.energy -= 0.2;
        if (this.energy < 0) { this.energy = 0; }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }

    rotateObject(maxWidth, speed) {
        setInterval(() => {
            if (this.rotation) { 
                this.width -= speed; 
                this.x += speed/2;
            }
            if (this.width == 0) { 
                this.rotation = false;
                this.otherDirection = !this.otherDirection;
            }
            if (!this.rotation) { 
                this.width += speed; 
                this.x -= speed/2;
            }
            if (this.width == maxWidth) { this.rotation = true; }
        }, 30);
    }
}


