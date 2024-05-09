class World {

    character = new Character();
    enemies = level1.enemies;
    cacti = level1.cacti;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    coins = level1.coins;
    bottles = level1.bottles;
    beans = level1.beans;
    checkpoints = level1.checkpoints;
    level = level1;
    powerLine = new PowerLine();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottlesBar = new BottleBar();
    coinsBar = new CoinsBar();
    beansBar = new BeansBar();
    endbossBar = new EndbossBar();
    maxCoins = this.checkMaxCoins();
    runningFart = [];
    throwableObjects = [];
    SOUND_COIN = new Audio('audio/coin.wav');
    SOUND_BOTTLE = new Audio('audio/bottle.wav');
    SOUND_BEAN = new Audio('audio/bean2.wav');
    SOUND_LOADPOWER = new Audio('audio/loadPower2.wav');
    SOUND_FART = new Audio('audio/fart2.wav');
    SOUND_DEAD_CACTUS = new Audio('audio/deadCactus.wav');
    SOUND_JUMPATTACK = new Audio('audio/jumpattack.wav');
    power = 0;
    fartStrength = 0;
    activeFart = false;
    active = false;
    lastCheckpoint = this.checkpoints[this.checkpoints.length - 1];
    cactusKiller = true;
    enemyKiller = true;
    bottleKiller = true;
    activeCheckpoint = true;
    endbossBarActive = false;

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
            this.corpseEraser();
            if (!this.stopCamera()) this.endbossBarActive = true;
        }, 50);
        setInterval(() => {
            console.log('Checkpoint:', gameCheckpoint, 'Enemies:', this.enemies.length, ' | Kakteen:', this.cacti.length, ' | Coins:', this.coins.length, ' | Bottles:', this.bottles.length, ' | Beans:', this.beans.length);
        }, 250);
    }

    correctPosition() {
        if (this.character.y > 135 && this.statusBar.percentage > 0) this.character.y = 135;
    }

    corpseEraser() {
        this.enemies.forEach((enemy) => {
            if (enemy.img.src == 'img/3_enemies_chicken/chicken_small/2_dead/dead.png') this.deadEnemy(enemy);
        })
    }

    checkMaxCoins() {
        let counter = 0;
        for (let i = 0; i < this.level.checkpoints.length; i++) counter += this.level.checkpoints[i].COINS;
        return counter + this.level.coins.length;
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE && this.bottlesBar.percentage > 0 && this.bottleKiller) {
            this.active = true;
            this.power++;
            if (this.power >= 20) { this.power = 20 };
            this.SOUND_LOADPOWER.play();
            this.powerLine.width = (this.power * 6);
        }
        if (this.keyboard.SPACE == false && this.active == true) {
            this.bottleKiller = false;
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 150);
            this.throwableObjects.push(bottle);
            this.power = 0;
            this.powerLine.width = 0;
            this.active = false;
            this.bottlesBar.percentage -= 20;
            this.bottlesBar.setPercentage(this.bottlesBar.percentage, this.bottlesBar.STATUS_BOTTLES);
            this.character.SOUND_SHOT.play();
        }
    }

    checkFarting() {
        if (this.keyboard.DOWN && this.beansBar.percentage > 0) {
            this.activeFart = true;
            this.fartStrength++;
            if (this.fartStrength >= 20) this.fartStrength = 20;
            this.SOUND_LOADPOWER.play();
            this.powerLine.width = (this.fartStrength * 6);
        }
        if (!this.keyboard.DOWN && this.activeFart == true) {
            this.SOUND_FART.play();
            let currentFart = new FartableObject(this.character.x + this.checkFartDirection(), this.character.y + 190);
            this.runningFart.push(currentFart);
            let fartIntervall = setInterval(() => {
                if (this.runningFart[0].width >= (this.fartStrength * 4)) {
                    clearInterval(fartIntervall);
                    this.runningFart.splice(0, 1);
                }
            }, 1000)
            this.beansBar.percentage -= 20;
            this.powerLine.width = 0;
            this.beansBar.setPercentage(this.beansBar.percentage, this.beansBar.STATUS_BEANS);
            this.activeFart = false;
            this.fartStrength = 0;
        }
    }

    checkFartDirection() {
        if (direction == 'right') return -((this.fartStrength * 4) - 30);
        else return 115;
    }

    checkCollisions() {
        this.collisionsWithEnemies();
        this.collisionsWithCacti();
        this.collisionOfBottleWithGround();
        this.collisionWithCheckpoint();
        this.collisionOfFartWithEndboss();
    }

    collisionsWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) this.characterMeetsEnemy(enemy);
            this.throwableObjects.forEach((flyingBottle) => {
                if (flyingBottle.isColliding(enemy) && !flyingBottle.broken && this.enemyKiller) {
                    flyingBottle.y = enemy.y;
                    flyingBottle.broken = true;
                    this.enemyKiller = false;
                    this.checkEnemyType(enemy);
                };
            });

        });
    }

    checkEnemyType(enemy) {
        if (enemy instanceof Chick || enemy instanceof Chicken) {
            this.deadEnemy(enemy);
            setTimeout(() => {
                this.throwableObjects.splice(flyingBottle, 1);
            }, 1000);
        }
        if (enemy instanceof Endboss) {
            enemy.hit();
            this.enemyKiller = true;
            this.endbossBar.setPercentage(enemy.energy, this.endbossBar.STATUS_ENERGY_ENDBOSS);
            this.checkIfEndbossIsKilled(enemy);
        }
    }

    collisionOfBottleWithGround() {
        setInterval(() => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.broken) {
                    this.power = 0;
                    setTimeout(() => {
                        this.throwableObjects.splice(bottle, 1);
                    }, 700);
                }
            });
        }, 1000 / 60);
    }

    collisionsWithCacti() {
        this.character.speed = 3;
        this.level.cacti.forEach((cactus) => {
            if (this.character.isColliding(cactus)) {
                this.character.speed = 1;
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy, this.statusBar.STATUS_ENERGY);
            }
            if (this.runningFart.length > 0) {
                if (this.runningFart[0].isColliding(cactus) && this.cactusKiller) {
                    this.cactusKiller = !this.cactusKiller;
                    this.deadCactus(cactus);
                }
            }
        });
    }

    collisionOfFartWithEndboss() {
        if (this.runningFart.length > 0) {
            this.level.enemies.forEach((endboss) => {
                if (endboss instanceof Endboss) {
                    if (this.runningFart[0].isColliding(endboss)) endboss.freeze = true;
                }
            })
        }
    }

    collisionWithCheckpoint() {
        this.level.checkpoints.forEach((checkpoint) => {
            if (this.character.isColliding(checkpoint) && this.activeCheckpoint) {
                this.activeCheckpoint = false;
                gameCheckpoint++;
                checkpoint.height = 10;
                this.spawnObjectsInNextArea(checkpoint);
                setTimeout(() => { this.activeCheckpoint = true }, 5000);
            }
        })
    }

    spawnObjectsInNextArea(checkpoint) {
        for (let i = 0; i < checkpoint.ENEMIES; i++) {
            let randomEnemy = Math.floor(Math.random() * 2);
            if (randomEnemy == 1) this.level.enemies.push(new Chicken(this.character.x));
            else this.level.enemies.push(new Chick(this.character.x));
        }
        for (let i = 0; i < checkpoint.CACTI; i++) this.level.cacti.push(new Cactus(this.character.x));
        for (let i = 0; i < checkpoint.COINS; i++) this.level.coins.push(new Coin(this.character.x));
        for (let i = 0; i < checkpoint.BOTTLES; i++) this.level.bottles.push(new Bottle(this.character.x));
        for (let i = 0; i < checkpoint.BEANS; i++) this.level.beans.push(new Bean(this.character.x));
        for (let i = 0; i < checkpoint.CLOUDS; i++) this.level.clouds.push(new Cloud(this.character.x + 600));
        this.buildMoreLandscape();
        if (gameCheckpoint == this.checkpoints.length) this.enemies.push(new Endboss());
    }

    buildMoreLandscape() {
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', 719 * (gameCheckpoint * 2)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * (gameCheckpoint * 2)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * (gameCheckpoint * 2)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * (gameCheckpoint * 2)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', 719 * (gameCheckpoint * 2 + 1)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * (gameCheckpoint * 2 + 1)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * (gameCheckpoint * 2 + 1)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * (gameCheckpoint * 2 + 1)));
    }

    deadCactus(cactus) {
        let killedCactus = this.cacti.indexOf(cactus);
        cactus.dead = true;
        this.SOUND_DEAD_CACTUS.play();
        setTimeout(() => {
            this.cacti.splice(killedCactus, 1);
            this.cactusKiller = true;
        }, 1000);
    }

    characterMeetsEnemy(enemy) {
        if (!this.character.aboveGround()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy, this.statusBar.STATUS_ENERGY);
        }
        else {
            if (!this.character.jumpAttack(enemy) && !this.character.isHurt() && this.enemyKiller) {
                this.character.jump();
                this.SOUND_JUMPATTACK.play();
                if (enemy instanceof Chick || enemy instanceof Chicken) {
                    this.enemyKiller = false;
                    this.deadEnemy(enemy);
                }
                if (enemy instanceof Endboss && enemy.freeze) {
                    this.enemyKiller = false;
                    enemy.hit();
                    this.endbossBar.setPercentage(enemy.energy, this.endbossBar.STATUS_ENERGY_ENDBOSS);
                    this.character.jump();
                    this.checkIfEndbossIsKilled(enemy);
                    enemy.freeze = false;
                    setTimeout(() => { this.enemyKiller = true }, 150);
                }
            }
        }
    }

    deadEnemy(enemy) {
        let killedEnemy = this.enemies.indexOf(enemy);
        enemy.dead = true;
        enemy.speed = 0;
        if (enemy instanceof Chicken) this.character.SOUND_HIT_CHICKEN.play();
        if (enemy instanceof Chick) this.character.SOUND_HIT_CHICK.play();
        setTimeout(() => {
            this.enemies.splice(killedEnemy, 1);
            this.enemyKiller = true;
        }, 500);

    }

    checkIfEndbossIsKilled(enemy) {
        if (enemy.energy <= 0) {
            enemy.deadEndboss = true;
            setTimeout(() => { this.enemies.splice(enemy, 1) }, 2000);
        }
    }

    checkCollectables() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.coinsBar.percentage < 100) this.collectCoin(coin);
        });
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.bottlesBar.percentage < 100) this.collectBottle(bottle);
        });
        this.level.beans.forEach((bean) => {
            if (this.character.isColliding(bean) && this.beansBar.percentage < 100) this.collectBean(bean);
        });
    }

    collectCoin(coin) {
        let hitCoin = this.coins.indexOf(coin);
        this.coins.splice(hitCoin, 1);
        this.SOUND_COIN.play();
        this.coinsBar.percentage += 100 / this.maxCoins;
        this.coinsBar.setPercentage(this.coinsBar.percentage, this.coinsBar.STATUS_COINS);
    }

    collectBottle(bottle) {
        let hitBottle = this.bottles.indexOf(bottle);
        this.bottles.splice(hitBottle, 1);
        this.SOUND_BOTTLE.play();
        this.bottlesBar.percentage += 20;
        this.bottlesBar.setPercentage(this.bottlesBar.percentage, this.bottlesBar.STATUS_BOTTLES);
    }

    collectBean(bean) {
        let hitBean = this.beans.indexOf(bean);
        this.beans.splice(hitBean, 1);
        this.SOUND_BEAN.play();
        this.beansBar.percentage += 20;
        this.beansBar.setPercentage(this.beansBar.percentage, this.beansBar.STATUS_BEANS);
    }

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
        this.drawCollectables();
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.drawEnemies();
        this.addObjectsToMap(this.runningFart);
        this.addObjectsToMap(this.checkpoints);
    }

    drawFixedScreenContent() {
        this.drawBars();
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