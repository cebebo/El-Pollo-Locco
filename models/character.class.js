class Character extends MovableObject {

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMP_GOINGUP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png'
    ];

    IMAGES_JUMP_COMINGDOWN = [
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png'
    ];

    IMAGES_JUMP_LANDING = [
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGE_POWERLINE = 'img/powerLine.png';

    idealFrame = [24, 124, 68, 138];
    speed = levelValues[level - 1].speedCharacter;
    x = 120;
    y = 135;
    height = 295;
    width = 150;
    energy = 100;
    world;
    win = 3;
    xCol = this.x + this.idealFrame[0];
    yCol = this.y + this.idealFrame[1];
    wCol = this.width - this.idealFrame[2];
    hCol = this.height - this.idealFrame[3];
    sleepTimer = 0;
    activeJump = false;
    activeHurt = false;
    gameIsOver = false;
    gameEnd = false;
    resultLife = 0;
    resultCoins = 0;
    counterLife = 0;
    counterCoins = 0;
    result = 0;
    SOUND_WALKING = new Audio('audio/steps3.wav');
    SOUND_JUMPING = [new Audio('audio/jump.wav'), new Audio('audio/jump2.wav'), new Audio('audio/jump3.wav'), new Audio('audio/jump4.wav'), new Audio('audio/jump5.wav'),];
    SOUND_SLEEPING = new Audio('audio/sleep.wav');
    SOUND_WINNING = new Audio('audio/win.wav');
    SOUND_DEAD = new Audio('audio/dead.wav');
    SOUND_HIT_CHICKEN = new Audio('audio/chickenDead.wav');
    SOUND_HIT_CHICK = new Audio('audio/chickDead.wav');
    SOUND_SHOT = new Audio('audio/shot2.wav');
    SOUND_HURT = [new Audio('audio/hurt.wav'), new Audio('audio/hurt2.wav'), new Audio('audio/hurt3.wav'), new Audio('audio/hurt4.wav'), new Audio('audio/hurt5.wav')];
    SOUND_GAMEOVER = new Audio('audio/gameOver.mp3');
    SOUND_LEVELCOMPLETE = new Audio('audio/levelComplete.mp3');
    SOUND_COUNTER = new Audio('audio/counter.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP_GOINGUP);
        this.loadImages(this.IMAGES_JUMP_COMINGDOWN);
        this.loadImages(this.IMAGES_JUMP_LANDING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }

    /**
     * Checks whether the right, left and up arrow keys have been pressed and assigns corresponding functions to move the figure. If the buttons are not pressed for a long time, the figure's sleep mode is activated.
     * 
     */
    animate() {
        setInterval(() => {
            if (this.win == 4) this.winning();
            this.SOUND_WALKING.pause();
            if (!this.isDead()) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) this.MovingRight();
                if (this.world.keyboard.LEFT && this.x > 0) this.MovingLeft();
                if (this.world.keyboard.UP && !this.aboveGround()) this.MovingUp();
                this.world.camera_x = -this.x + 100;
                if (this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.LEFT ||
                    this.world.keyboard.RIGHT || this.world.keyboard.SPACE) { this.sleepTimer = 0; }
                else { this.sleepTimer++; }
            }
        }, 1000 / 60);
        setInterval(() => { this.reactionsCharacter(); }, 100);
    }

    /**
     * calls the function to move the figure to the right when the character is standing on the ground and plays the corresponding sound files for running on sand.
     * 
     */
    MovingRight() {
        if (this.y >= 135 && !this.isHurt()) { if (noises) this.SOUND_WALKING.play(); }
        this.moveRight();
        this.otherDirection = false;
        direction = 'right';
    }

    /**
     * calls the function to move the figure to the left when the character is standing on the ground and plays the corresponding sound files for running on sand.
     * 
     */
    MovingLeft() {
        if (this.y >= 135 && !this.isHurt()) { if (noises) this.SOUND_WALKING.play(); }
        this.moveLeft();
        this.otherDirection = true;
        direction = 'left';
    }

    /**
     * Checks whether the character is not jumping and triggers the jump function with the corresponding jump sound.
     * 
     */
    MovingUp() {
        if (!this.activeJump) {
            this.playSoundJumping();
            this.jump();
        }
    }

    /**
     * Checks what state the character is in and starts corresponding animations. This function is responsible for playing the correct animations.
     * 
     */
    reactionsCharacter() {
        if (this.isDead()) this.gameOver();
        else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            if (!this.activeHurt) this.playSoundHurting();
        }
        else if (this.aboveGround()) this.activityAboveGround();
        else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            if (this.y >= 135) { this.playAnimation(this.IMAGES_WALKING); }
        }
        else if (this.sleepTimer >= 500) {
            this.playAnimation(this.IMAGES_SLEEP);
            if (noises && !this.isDead() && this.win < 6) this.SOUND_SLEEPING.play();
        }
        else this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * Splits the jumping animation into take-off and landing and lets it play once without repeating.
     * 
     */
    activityAboveGround() {
        this.activeJump = false;
        if (this.speedY > 0) this.playAnimationNoLoop(this.IMAGES_JUMP_GOINGUP);
        else {
            if (frameCounter == this.IMAGES_JUMP_GOINGUP.length - 1) { frameCounter = 0 }
            if (this.speedY < 0) this.playAnimationNoLoop(this.IMAGES_JUMP_COMINGDOWN);
        }
    }

    /**
     * Randomly picks a jump sound from the array and plays the sound. Then it waits a second until a random sound can be played again.
     * 
     */
    playSoundJumping() {
        let jumpSound = Math.floor(Math.random() * 5);
        if (noises) this.SOUND_JUMPING[jumpSound].play();
        this.activeJump = true;
        setTimeout(() => {
            this.activeJump = false;
        }, 1000);
    }

    /**
     * Randomly picks an injury sound from the array and plays the sound. Then it waits a second until a random sound can be played again.
     * 
     */
    playSoundHurting() {
        let hurtSound = Math.floor(Math.random() * 5);
        if (noises) this.SOUND_HURT[hurtSound].play();
        this.activeHurt = true;
        setTimeout(() => {
            this.activeHurt = false;
        }, 1000);
    }

    /**
     * When the character dies, the death animation starts, which only plays once. In addition, the character slides down out of the screen and the end screen function is loaded.
     * 
     */
    gameOver() {
        this.win += 2
        if (this.win == 5) {
            this.playAnimationNoLoop(this.IMAGES_DEAD);
            if (noises) this.SOUND_DEAD.play();
            let IVgameOver = setInterval(() => {
                if (this.y < 400) this.y += 0.5;
                else clearInterval(IVgameOver);
            })
        }
        setTimeout(() => { this.endscreen(); }, 2000);
    }

    /**
     * Checks whether the game is over and switches from the canvas view to the game over display. The game over sound is played.
     * 
     */
    endscreen() {
        if (!this.gameIsOver) {
            document.getElementById('canvas').classList.add('d-none');
            document.getElementById('gameOverImage').classList.remove('d-none');
            document.getElementById('controllerBar').classList.add('d-none');
            document.getElementById('iconsBar').classList.add('d-none');
            document.getElementById('restartButton').classList.remove('d-none');
            document.getElementById('restartButton').classList.add('gameOver');
            music = false;
            if (!this.gameIsOver) this.SOUND_GAMEOVER.play();
            this.gameIsOver = true;
        }
    }

    /**
     * Check whether the level is completed and play the victory sound. It calls up the character's winning animation and saves the earned coins and health.
     * 
     */
    winning() {
        if (!this.gameEnd) this.win += 3;
        if (level == 2) this.gameEnd = true;
        if (noises) this.SOUND_WINNING.play();
        this.winningMoveAnimation();
        this.resultCoins = Math.round(world.coinsBar.percentage);
        this.resultLife = Math.round(world.statusBar.percentage);
        setTimeout(() => {
            music = false;
            this.winscreen();
        }, 3000);
    }

    /**
     * Makes the character jump back and forth with joy at the victory.
     * 
     */
    winningMoveAnimation() {
        this.y = 135;
        this.x = world.lastCheckpoint.x + 2100;
        this.jump();
        this.world.keyboard.RIGHT = true;
        setTimeout(() => {
            world.keyboard.RIGHT = false
            this.jump();
            this.world.keyboard.LEFT = true;
            setTimeout(() => {
                this.world.keyboard.LEFT = false;
            }, 1100);
        }, 1100);
    }

    /**
     * Plays the level completed sound, switches from the canvas view to the level completed display and initiates the final result function.
     * 
     */
    winscreen() {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('levelCompleteImage').classList.remove('d-none');
        if (level < 2) document.getElementById('nextLevelButton').classList.remove('d-none');
        if (level == 2) document.getElementById('counts').classList.add('lastScreenResult');
        document.getElementById('controllerBar').classList.add('d-none');
        document.getElementById('iconsBar').classList.add('d-none');
        this.countPoints();
        this.SOUND_LEVELCOMPLETE.play();
    }

    /**
     * Unlocks the results display and plays the counter sound. The functions for counting up life points are called.
     * 
     */
    countPoints() {
        this.unlockCounterInDocument();
        let coinsCountIV = setInterval(() => {
            this.SOUND_COUNTER.play();
            if (this.counterCoins < this.resultCoins) this.counterCoins++;
            this.showFinalCoins(this.counterCoins);
            if (this.counterCoins == this.resultCoins) {
                this.startLifeCounting();
                clearInterval(coinsCountIV);
            }
        }, 1000 / 60);
    }

    /**
     * Plays the counter sound and counts up the life points. The function for the overall result is then called.
     * 
     */
    startLifeCounting() {
        let lifeCountIV = setInterval(() => {
            this.SOUND_COUNTER.play();
            if (this.counterLife < this.resultLife) this.counterLife++;
            this.showFinalLife(this.counterLife);
            if (this.counterLife == this.resultLife) {
                this.startFinalResultCounting();
                clearInterval(lifeCountIV);
            }
        }, 1000 / 60);
    }

    /**
     * Calculates the total of both values.
     * 
     */
    startFinalResultCounting() {
        this.result = Math.round((this.counterCoins + this.counterLife) / 2);
        this.showFinalResult(this.result);
    }

    /**
     * The values folder is made visible in HTML.
     * 
     */
    unlockCounterInDocument() {
        document.getElementById('counts').classList.remove('d-none');
    }

    /**
     * The collected coins are loaded and displayed in the corresponding HTML field.
     * 
     * @param {*} count - value of the coins in percent.
     */
    showFinalCoins(count) {
        document.getElementById('countResultCoins').innerHTML = `${count}%`;
    }

    /**
     * The collected healthpoints are loaded and displayed in the corresponding HTML field.
     * 
     * @param {*} count  - value of the health in percent.
     */
    showFinalLife(count) {
        document.getElementById('countResultLife').innerHTML = `${count}%`;
    }

    /**
     * The final result is loaded and displayed in the corresponding HTML field.
     * 
     * @param {*} count  - value of the final result in percent.
     */
    showFinalResult(count) {
        document.getElementById('countResult').innerHTML = `${count}%`;
    }

}