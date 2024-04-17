class MovableObject extends DrawableObject {
    
    speed;
    speedY = 0;
    acceleration = 2;
    otherDirection = false;
    energy = 100;
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
        return this.y < 135;
    }



    autoMoveLeft() {
        setInterval(() => {
            this.moveLeft();
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
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.height) >= obj.y &&
            (this.y) <= (obj.y + obj.height); 
    }

    hit() {
        this.energy -= 2;
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
}


