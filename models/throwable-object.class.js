class ThrowableObject extends MovableObject {

    IMAGES_BOTTLEFLIP = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLEEXPLODE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    broken = false;
    SOUND_BREAKING_GLASS = new Audio ('audio/breakingGlass.wav');

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLEFLIP);
        this.loadImages(this.IMAGES_BOTTLEEXPLODE);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.idealFrame = [17, 12, 35, 20];
        this.throw();
        this.animate();
        this.bottleBroken();
    }

    throw() {
        let power = world.power;

        if (direction == 'right') {
            this.speedY = power * 1.8;
            this.applyGravity();
            setInterval(() => {
                this.x += power * 0.35;
                if (this.y == 280) power = 0;
            }, 25)
        } else {
            this.speedY = power * 1.8;
            this.applyGravity();
            setInterval(() => {
                this.x -= power * 0.35;
                if (this.y == 280) power = 0;
            }, 25)
        }
    }

    animate() {
        let flyBottle = setInterval(() => {
            if (this.y < 280 && !this.broken) this.playAnimation(this.IMAGES_BOTTLEFLIP);
            else if (this.y > 280) {
                this.y = 280;
                this.broken = true;
                clearInterval(flyBottle);
            }
        }, 75);
    }

    bottleBroken() {
        let IVbottleBroken = setInterval(() => {
            if (this.broken) {
                this.playAnimationOnce(this.IMAGES_BOTTLEEXPLODE, 0, 100);
                if (noises) this.SOUND_BREAKING_GLASS.play();
                clearInterval(IVbottleBroken);
                setTimeout(() => {
                    world.bottleKiller = true;
                }, 1000);
            }
        }, 1000 / 60);
    }
}