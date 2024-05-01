class Cactus extends MovableObject {
x = 300;
y = 135;
height = 300;
width = 225;
idealFrame = [55, 10, 95, 10]

IMAGES_KILLED_CACTUS = [
    'img/3_enemies_cactus/cactus-D1.png',
    'img/3_enemies_cactus/cactus-D2.png',
    'img/3_enemies_cactus/cactus-D3.png',
    'img/3_enemies_cactus/cactus-D4.png',
    'img/3_enemies_cactus/cactus-D5.png',
    'img/3_enemies_cactus/cactus-D6.png',
    'img/3_enemies_cactus/cactus-D7.png',
    'img/3_enemies_cactus/cactus-D8.png',
    'img/3_enemies_cactus/cactus-D9.png',
]

constructor() {
    super().loadImage('img/3_enemies_cactus/cactus.png');
    this.loadImages(this.IMAGES_KILLED_CACTUS);
}

}