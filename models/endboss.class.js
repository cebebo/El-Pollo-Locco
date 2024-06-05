class Endboss extends MovableObject {
    y = 75;
    height = 375;
    width = 255;
    idealFrame = [20, 66, 28, 80];
    speed = levelValues[level-1].speedEndboss;
    energy = 100;
    xCol = this.x + this.idealFrame[0];
    yCol = this.y + this.idealFrame[1];
    wCol = this.width - this.idealFrame[2];
    hCol = this.height - this.idealFrame[3];
    endbossKilled = false;

    animationEndbossStart = world.stopCamera();
    forward = true;
    freeze = false;
    deadEndboss = false;

    SOUND_DEAD = new Audio('audio/endbossDead.wav');
    SOUND_START = new Audio('audio/endboss.wav');
    SOUND_HURT = new Audio('audio/endbossHurt.wav');
    SOUND_FREEZE = new Audio('audio/endbossFreeze.wav');
    SOUND_ATTACK = new Audio('audio/endbossAttack.wav');
  
    

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERTNESS = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_FREEZE = 'img/4_enemie_boss_chicken/4_hurt/G77.png';

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImage(this.IMAGES_FREEZE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERTNESS);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = world.level.level_end_x + 250;

        this.animate();
    }

    /**
     * Checks the status of the final boss and starts the corresponding animations.
     * 
     */
    animate() {
        setInterval(() => {
            if (this.animationEndbossStart) {       
                if (this.freeze && !this.isDead()) this.freezed();         
                else if (this.isDead()) this.dead();
                else if (this.isHurt()) this.hurt();                
                else if (this.attackMode()) this.attackCharacter();
                else if (this.alertMode()) this.followCharacter();
                else this.checkDirection();
            }
        }, 150);
    }

    /**
     * Sets the running area for the final boss and determines at which point it changes direction and initiates the running animation.
     * 
     */
    checkDirection() {
        if (this.x < world.lastCheckpoint.x + 1800) this.forward = false;
        if (this.x > world.lastCheckpoint.x + 2350) this.forward = true;
        this.walkDirection();
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Determines in which direction the final boss runs and at what speed.
     * 
     */
    walkDirection() {
        if (this.forward) {
            this.moveLeft();
            this.otherDirection = false;
        }
        else {
            this.moveRight();
            this.otherDirection = true;
        }
        this.speed = 2;
        song = 1
    }

    /**
     * Returns the value at which the boss enters alarm mode.
     * 
     * @returns - Distance of the final boss to the character.
     */
    alertMode() {
        return (world.character.x + levelValues[level-1].distanceFollow) > this.x && (world.character.x + world.character.width - levelValues[level-1].distanceFollow) < this.x + this.width;
    }

    /**
     * Starts tracking the character, changes the running animation and starts the background music.
     * 
     */
    followCharacter() {
        if (noises) this.SOUND_START.play();
        this.speed = levelValues[level-1].endbossFollow;
        if (world.character.x + (world.character.width / 2) < this.x + (this.width / 2)) this.forward = true;
        else this.forward = false;
        this.walkDirection();
        this.playAnimation(this.IMAGES_ALERTNESS);
        song = 2;
        if (world.character.isDead()) music = false;
    }

    /**
     * Returns the value at which the boss enters attack mode.
     * 
     * @returns - Distance of the final boss to the character.
     */
    attackMode() {
        return (world.character.x + levelValues[level-1].distanceAttack) > this.x && (world.character.x + world.character.width - levelValues[level-1].distanceAttack) < this.x + this.width;
    }

    /**
     * Changes the running animation and checks, if character is dead.
     * 
     */
    attackCharacter() {
        if (noises) if (!world.character.isDead()) this.SOUND_ATTACK.play();
        this.speed = levelValues[level-1].endbossAttack;
        if (world.character.x + (world.character.width / 2) < this.x + (this.width / 2)) this.forward = true;
        else this.forward = false;
        this.walkDirection();
        this.playAnimation(this.IMAGES_ATTACK);
        song = 2;
        if (world.character.isDead()) music = false;
    }

    /**
     * Checks whether the final boss is frozen, makes him stand still, changes the animation and sets how long he is frozen.
     * 
     */
    freezed() {
        if (this.freeze) {
            this.loadImage(this.IMAGES_FREEZE);
            this.speed = 0;
            setTimeout(() => { this.freeze = false }, levelValues[level-1].endbossFreezed);
        }
        song = 2;
    }

    /**
     * Changes the animation to the hurt animation and plays the hurt sound.
     * 
     */
    hurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (noises) this.SOUND_HURT.play();
    }

    /**
     * Plays the final boss's death animation and plays the death sound.
     * 
     */
    dead() {
        this.freeze = false;
        this.playAnimation(this.IMAGES_DEAD);
        this.y += 30;
        if (noises) if (this.deadEndboss) this.SOUND_DEAD.play();
        this.deadEndboss=false;
        music = false;
        setTimeout(() => { 
            this.SOUND_DEAD.pause() 
            if (!this.endbossKilled) {
                world.character.win += 1;
                this.endbossKilled = true;
            }
        }, 1000);
    }
}