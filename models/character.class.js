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

    MovingRight() {
        if (this.y >= 135 && !this.isHurt()) { if (noises) this.SOUND_WALKING.play(); }
        this.moveRight();
        this.otherDirection = false;
        direction = 'right';
    }

    MovingLeft() {
        if (this.y >= 135 && !this.isHurt()) { if (noises) this.SOUND_WALKING.play(); }
        this.moveLeft();
        this.otherDirection = true;
        direction = 'left';
    }

    MovingUp() {
        if (!this.activeJump) {
            this.playSoundJumping();
            this.jump();
        }
    }

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

    activityAboveGround() {
        this.activeJump = false;
        if (this.speedY > 0) this.playAnimationNoLoop(this.IMAGES_JUMP_GOINGUP);
        else {
            if (frameCounter == this.IMAGES_JUMP_GOINGUP.length - 1) { frameCounter = 0 }
            if (this.speedY < 0) this.playAnimationNoLoop(this.IMAGES_JUMP_COMINGDOWN);
        }
    }

    playSoundJumping() {
        let jumpSound = Math.floor(Math.random() * 5);
        if (noises) this.SOUND_JUMPING[jumpSound].play();
        this.activeJump = true;
        setTimeout(() => {
            this.activeJump = false;
        }, 1000);
    }

    playSoundHurting() {
        let hurtSound = Math.floor(Math.random() * 5);
        if (noises) this.SOUND_HURT[hurtSound].play();
        this.activeHurt = true;
        setTimeout(() => {
            this.activeHurt = false;
        }, 1000);
    }

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

    startFinalResultCounting() {
        this.result = Math.round((this.counterCoins + this.counterLife) / 2);
        this.showFinalResult(this.result);
    }

    unlockCounterInDocument() {
        document.getElementById('counts').classList.remove('d-none');
    }

    showFinalCoins(count) {
        document.getElementById('countResultCoins').innerHTML = `${count}%`;
    }

    showFinalLife(count) {
        document.getElementById('countResultLife').innerHTML = `${count}%`;
    }

    showFinalResult(count) {
        document.getElementById('countResult').innerHTML = `${count}%`;
    }

}