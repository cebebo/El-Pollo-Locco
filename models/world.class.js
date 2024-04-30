class World {

    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    coins = level1.coins;
    bottles = level1.bottles;
    level = level1;
    powerLine = new PowerLine();
    fart = new Fart();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottlesBar = new BottleBar();
    coinsBar = new CoinsBar();
    throwableObjects = [];
    SOUND_COIN = new Audio('audio/coin.wav');
    SOUND_BOTTLE = new Audio('audio/bottle.wav');
    SOUND_LOADPOWER = new Audio('audio/loadPower2.wav')
    SOUND_FART = new Audio('audio/fart.wav')
    power = 0;
    fartStrength = 0;
    activeFart = false;
    active = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectables();
            this.checkFarting();
            this.correctPosition();
        }, 50);
    }

    correctPosition() {
        if (this.character.y > 135) this.character.y = 135;
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE && this.bottlesBar.percentage > 0) {
            this.active = true;
            this.power++;
            if (this.power >= 20) { this.power = 20 };
            this.SOUND_LOADPOWER.play();
            this.powerLine.width = (this.power * 6);
        }
        if (this.keyboard.SPACE == false && this.active == true) {
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 150);
            this.throwableObjects.push(bottle);
            this.power = 0;
            this.powerLine.width = 0;
            this.active = false;
            this.bottlesBar.percentage -= 20;
            this.bottlesBar.setPercentage(this.bottlesBar.percentage, this.bottlesBar.STATUS_BOTTLES);
            this.character.SOUND_SHOT.play();
            // this.SOUND_LOADPOWER.pause();
            // this.throwableObjects.splice(0,1);
            // debugger;
        }
    }

    checkFarting() {
        if (direction == 'right') this.fartToLeftSide();
        else this.fartToRightSide();

        if (this.keyboard.DOWN) {
            this.activeFart = true;
            this.fartStrength++;
            if (this.fartStrength >= 20) { this.fartStrength = 20 };
            this.SOUND_FART.play();
            if (direction == 'right') this.fart.width = (-this.fartStrength * 4);
            else this.fart.width = (this.fartStrength * 4);
        }
        if (!this.keyboard.DOWN && this.activeFart == true) {
            this.activeFart = false;
            this.fartStrength = 0;
            this.fart.width = 0;            
        }
    }

    fartToLeftSide() {
        this.fart.x = 135;
        this.fart.y = this.character.y + 190;
        this.fart.otherDirection = false;
    }

    fartToRightSide() {
        this.fart.x = 215;
        this.fart.y = this.character.y + 190;
        this.fart.otherDirection = true;
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.aboveGround()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy, this.statusBar.STATUS_ENERGY);
                }
                else {
                    if (!this.character.jumpAttack() && !this.character.isHurt()) {
                        this.character.jump();
                        this.deadEnemy(enemy);
                        setTimeout(() => {
                            if (enemy.dead == true) {
                                let killedEnemy = this.enemies.indexOf(enemy);
                                this.enemies.splice(killedEnemy, 1);
                            }
                        }, 500);
                    }
                }
            }
            if (this.throwableObjects.length > 0) {
                let pos = this.throwableObjects.length - 1;
                if (this.throwableObjects[pos].isColliding(enemy)) {
                    this.deadEnemy(enemy);
                    this.throwableObjects[pos].loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png');
                    this.throwableObjects.splice(pos, 1);
                }
            }
            if (this.fart.isColliding(enemy)) {
                console.log('Pups');
                this.deadEnemy(enemy);
            }
        });
    }

    deadEnemy(enemy) {
        let killedEnemy = this.enemies.indexOf(enemy);
        enemy.dead = true;
        enemy.stopMoving();
        if (enemy instanceof Chicken) this.character.SOUND_HIT_CHICKEN.play();
        if (enemy instanceof Chick) this.character.SOUND_HIT_CHICK.play();
        setTimeout(() => {
            this.enemies.splice(killedEnemy, 1);
        }, 500);

    }

    checkCollectables() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.coinsBar.percentage < 100) {
                let hitCoin = this.coins.indexOf(coin);
                this.coins.splice(hitCoin, 1);
                this.SOUND_COIN.play();
                this.coinsBar.percentage += 10;
                this.coinsBar.setPercentage(this.coinsBar.percentage, this.coinsBar.STATUS_COINS);
            }
        });
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.bottlesBar.percentage < 100) {
                let hitBottle = this.bottles.indexOf(bottle);
                this.bottles.splice(hitBottle, 1);
                this.SOUND_BOTTLE.play();
                this.bottlesBar.percentage += 20;
                this.bottlesBar.setPercentage(this.bottlesBar.percentage, this.bottlesBar.STATUS_BOTTLES);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.bottlesBar);
        this.addToMap(this.coinsBar);
        if (this.keyboard.SPACE) this.addToMap(this.powerLine);
        if (this.keyboard.DOWN) this.addToMap(this.fart);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) { this.flipImage(mo); }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
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