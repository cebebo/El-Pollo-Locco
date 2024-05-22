class Draw extends MovableObject {
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.stopCamera()) this.ctx.translate(this.camera_x, 0);
        else this.ctx.translate(-(this.lastCheckpoint.x + 1850), 0);
        this.drawMovableScreenContent();
        if (this.stopCamera()) this.ctx.translate(-this.camera_x, 0);
        else this.ctx.translate(this.lastCheckpoint.x + 1850, 0);
        this.drawFixedScreenContent();
        this.drawWhenPressedButton();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    stopCamera() {
        return this.character.x < this.lastCheckpoint.x + 1950;
    }

    drawMovableScreenContent() {
        this.drawEnvironment();
        this.drawText();
        this.drawCollectables();
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.drawEnemies();
        this.addObjectsToMap(this.runningFart);
        this.addObjectsToMap(this.checkpoints);
    }

    drawFixedScreenContent() {
        this.drawBars();
        this.addObjectsToMap(touchController);
    }

    drawText() {
        this.ctx.font = "40px Berlin Sans FB";
        this.ctx.strokeText(`Level ${level}`, 40, 90);
    }

    drawWhenPressedButton() {
        if (this.keyboard.SPACE || this.keyboard.DOWN) this.addToMap(this.powerLine);
    }

    drawCollectables() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.beans);
    }

    drawBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottlesBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.beansBar);
        if (this.endbossBarActive) this.addToMap(this.endbossBar);
    }

    drawEnemies() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.cacti);
    }

    drawEnvironment() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) { this.flipImage(mo); }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) { this.flipImageBack(mo); }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}