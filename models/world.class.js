class World extends Draw {

    character = new Character();
    enemies = currentLevel.enemies;
    cacti = currentLevel.cacti;
    clouds = currentLevel.clouds;
    backgroundObjects = currentLevel.backgroundObjects;
    coins = currentLevel.coins;
    bottles = currentLevel.bottles;
    beans = currentLevel.beans;
    checkpoints = currentLevel.checkpoints;
    level = currentLevel;
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
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Assigns the current world class to the character.
     * 
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts all intervals for the game and stops camera tracking when the final boss appears.
     * 
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectables();
            this.checkFarting();
            this.correctPosition();
            this.corpseEraser();
            backgroundMusic();
            if (!this.stopCamera()) this.endbossBarActive = true;
        }, 50);
    }

    /**
     * Sets the character back to the correct height position after landing a jump.
     * 
     */
    correctPosition() {
        if (this.character.y > 135 && this.statusBar.percentage > 0) this.character.y = 135;
    }

    /**
     * Remove enemy corpses that are left lying around.
     * 
     */
    corpseEraser() {
        this.enemies.forEach((enemy) => {
            if (enemy.img.src == 'img/3_enemies_chicken/chicken_small/2_dead/dead.png') this.deadEnemy(enemy);
        })
    }

    /**
     * Add up all the coins you can collect throughout the level.
     * 
     * @returns - Amount of all Coins in level.
     */
    checkMaxCoins() {
        let counter = 0;
        for (let i = 0; i < this.level.checkpoints.length; i++) counter += this.level.checkpoints[i].COINS;
        return counter + this.level.coins.length;
    }

    /**
     * Switches from charging mode to throwing mode when throwing a bottle.
     * 
     */
    checkThrowObjects() {
        if (this.keyboard.SPACE && this.bottlesBar.percentage > 0 && this.bottleKiller) {
            this.loadPowerLineForThrowing();
        }
        if (this.keyboard.SPACE == false && this.active == true) {
            this.throwBottleAfterLoading();
        }
    }

    /**
     * Charges the charging bar and makes it visually grow in width until a maximum value is reached.
     * 
     */
    loadPowerLineForThrowing() {
        this.active = true;
        this.power++;
        if (this.power >= 20) { this.power = 20 };
        if (noises) this.SOUND_LOADPOWER.play();
        this.powerLine.width = (this.power * 6);
    }

    /**
     * Starts throwing the bottle after charging and plays the throwing sound.
     * 
     */
    throwBottleAfterLoading() {
        this.bottleKiller = false;
        let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 150);
        this.throwableObjects.push(bottle);
        this.power = 0;
        this.powerLine.width = 0;
        this.active = false;
        this.bottlesBar.percentage -= 20;
        this.bottlesBar.setPercentage(this.bottlesBar.percentage, this.bottlesBar.STATUS_BOTTLES);
        if (noises) this.character.SOUND_SHOT.play();
    }

    /**
     * Switches from charging mode to farting mode when starting a fart.
     * 
     */
    checkFarting() {
        if (this.keyboard.DOWN && this.beansBar.percentage > 0) {
            this.loadPowerLineForFarting();
        }
        if (!this.keyboard.DOWN && this.activeFart == true) {
            this.fartAfterLoading();
        }
    }

    /**
     * Charges the charging bar and makes it visually grow in width until a maximum value is reached.
     * 
     */
    loadPowerLineForFarting() {
        this.activeFart = true;
        this.fartStrength++;
        if (this.fartStrength >= 20) this.fartStrength = 20;
        if (noises) this.SOUND_LOADPOWER.play();
        this.powerLine.width = (this.fartStrength * 6);
    }

    /**
     * Starts farting after charging, plays the farting sound and changes the beans-bar.
     * 
     */
    fartAfterLoading() {
        if (noises) this.SOUND_FART.play();
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

    /**
     * Check which direction the fart is facing.
     * 
     * @returns - If return ist 'right' the fart will go to the left.
     */
    checkFartDirection() {
        if (direction == 'right') return -((this.fartStrength * 4) - 30);
        else return 115;
    }

    /**
     * Checks all collisions between all objects.
     * 
     */
    checkCollisions() {
        this.collisionsWithEnemies();
        this.collisionsWithCacti();
        this.collisionOfBottleWithGround();
        this.collisionWithCheckpoint();
        this.collisionOfFartWithEndboss();
    }

    /**
     * Checks all collisions with the enemies.
     * 
     */
    collisionsWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) this.characterMeetsEnemy(enemy);
            this.throwableObjects.forEach((flyingBottle) => {
                if (flyingBottle.isColliding(enemy) && !flyingBottle.broken && this.enemyKiller) {
                    flyingBottle.y = enemy.y;
                    flyingBottle.broken = true;
                    this.enemyKiller = false;
                    this.checkEnemyType(enemy, flyingBottle);
                };
            });
        });
    }

    /**
     * Check which enemy type was hit to determine the corresponding effect.
     * 
     * @param {variable} enemy - Variable of the enemy.
     * @param {variable} flyingBottle - Variable of the bottle.
     */
    checkEnemyType(enemy, flyingBottle) {
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

    /**
     * Causes the bottle to break and disappear when dropped on the ground.
     * 
     */
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

    /**
     * Checks all collisions with the cactus.
     * 
     */
    collisionsWithCacti() {
        this.character.speed = levelValues[level - 1].speedCharacter;
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

    /**
     * Checks all collisions of fart with the final boss.
     * 
     */
    collisionOfFartWithEndboss() {
        if (this.runningFart.length > 0) {
            this.level.enemies.forEach((endboss) => {
                if (endboss instanceof Endboss) {
                    if (this.runningFart[0].isColliding(endboss)) endboss.freeze = true;
                }
            })
        }
    }

    /**
     * Checks all collisions of the character with the checkpoints.
     * 
     */
    collisionWithCheckpoint() {
        this.level.checkpoints.forEach((checkpoint) => {
            if (this.character.isColliding(checkpoint) && this.activeCheckpoint) {
                this.activeCheckpoint = false;
                gameCheckpoint++;
                checkpoint.height = 10;
                this.spawnObjectsInNextArea(checkpoint);
                setTimeout(() => { this.activeCheckpoint = true }, 2000);
            }
        })
    }

    /**
     * Loads and spawns new enemies, clouds and collectables.
     * 
     * @param {variable} checkpoint - Variable of the checkpoints.
     */
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

    /**
     * Expands the landscape in the background.
     * 
     */
    buildMoreLandscape() {
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', 719 * (gameCheckpoint * 2)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', 719 * (gameCheckpoint * 2 + 1)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * (gameCheckpoint * 2)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * (gameCheckpoint * 2 + 1)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * (gameCheckpoint * 2)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * (gameCheckpoint * 2 + 1)));
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * (gameCheckpoint * 2)));        
        this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * (gameCheckpoint * 2 + 1)));
    }

    /**
     * Causes the cactus to die and plays the death sound.
     * 
     * @param {variable} cactus - Variable of the killed cactus.
     */
    deadCactus(cactus) {
        let killedCactus = this.cacti.indexOf(cactus);
        cactus.dead = true;
        if (noises) this.SOUND_DEAD_CACTUS.play();
        setTimeout(() => {
            this.cacti.splice(killedCactus, 1);
            this.cactusKiller = true;
        }, 1000);
    }

    /**
     * Check how the character touches the opponent.
     * 
     * @param {variable} enemy - Variable of the touched enemy.
     */
    characterMeetsEnemy(enemy) {
        if (!this.character.aboveGround()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy, this.statusBar.STATUS_ENERGY);
        }
        else {
            if (!this.character.jumpAttack(enemy) && !this.character.isHurt() && this.enemyKiller) this.killChickAndChicken(enemy);
            if (enemy instanceof Endboss && enemy.freeze && this.enemyKiller) this.killEndboss(enemy);
        }
    }

    /**
     * Kills the chicken and the chick with jump attack and plays the corresponding sound.
     * 
     * @param {variable} enemy - Variable of attacked enemy.
     */
    killChickAndChicken(enemy) {
        this.character.jump();
        if (noises) this.SOUND_JUMPATTACK.play();
        if (enemy instanceof Chick || enemy instanceof Chicken) {
            this.enemyKiller = false;
            this.deadEnemy(enemy);
        }
    }

    /**
     * Kills the final boss and plays the corresponding sound.
     * 
     * @param {variable} enemy - Variable of the final boss.
     */
    killEndboss(enemy) {
        this.enemyKiller = false;
        enemy.hit();
        this.endbossBar.setPercentage(enemy.energy, this.endbossBar.STATUS_ENERGY_ENDBOSS);
        this.character.jump();
        this.checkIfEndbossIsKilled(enemy);
        enemy.freeze = false;
        setTimeout(() => { this.enemyKiller = true }, 1000);
    }

    /**
     * Check whether the enemy is a chicken or a chick and let it die with the corresponding dying sound.
     * 
     * @param {variable} enemy - Variable of the killed enemy.
     */
    deadEnemy(enemy) {
        let killedEnemy = this.enemies.indexOf(enemy);
        enemy.dead = true;
        enemy.speed = 0;
        if (enemy instanceof Chicken) if (noises) this.character.SOUND_HIT_CHICKEN.play();
        if (enemy instanceof Chick) if (noises) this.character.SOUND_HIT_CHICK.play();
        setTimeout(() => {
            this.enemies.splice(killedEnemy, 1);
            this.enemyKiller = true;
        }, 500);
    }

    /**
     * Check whether the final boss is dead and make him disappear after a certain amount of time.
     * 
     * @param {variable} enemy - Variable of the final boss.
     */
    checkIfEndbossIsKilled(enemy) {
        if (enemy.energy <= 0) {
            enemy.deadEndboss = true;
            setTimeout(() => { this.enemies.splice(enemy, 1) }, 2000);
        }
    }

    /**
     * Checks whether the character has a collision with a collectible object.
     * 
     */
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

    /**
     * Collect the coin and pass the value to the coins-bar on the display.
     * 
     * @param {variable} coin - Variable of collected coin.
     */
    collectCoin(coin) {
        let hitCoin = this.coins.indexOf(coin);
        this.coins.splice(hitCoin, 1);
        if (noises) this.SOUND_COIN.play();
        this.coinsBar.percentage += 100 / this.maxCoins;
        this.coinsBar.setPercentage(this.coinsBar.percentage, this.coinsBar.STATUS_COINS);
    }

    /**
     * Collect the bottle and pass the value to the bottles-bar on the display.
     * 
     * @param {variable} bottle - Variable of collected bottle.
     */
    collectBottle(bottle) {
        let hitBottle = this.bottles.indexOf(bottle);
        this.bottles.splice(hitBottle, 1);
        if (noises) this.SOUND_BOTTLE.play();
        this.bottlesBar.percentage += 20;
        this.bottlesBar.setPercentage(this.bottlesBar.percentage, this.bottlesBar.STATUS_BOTTLES);
    }

    /**
     * Collect the bean and pass the value to the beans-bar on the display.
     * 
     * @param {variable} bean - Variable of collected bean.
     */
    collectBean(bean) {
        let hitBean = this.beans.indexOf(bean);
        this.beans.splice(hitBean, 1);
        if (noises) this.SOUND_BEAN.play();
        this.beansBar.percentage += 20;
        this.beansBar.setPercentage(this.beansBar.percentage, this.beansBar.STATUS_BEANS);
    }

}