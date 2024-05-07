class Coin extends MovableObject {
x;
y;
width = 150;
height = 150;
rotation = true;
idealFrame = [40, 55, 80, 110];
SOUND_COIN = new Audio('audio/coin.wav');


constructor(x) {
    super().loadImage('img/8_coin/coin_1.png');
    this.x = x + 700 + Math.random() * 700;
    this.y = 30 + Math.random() * 250;
    this.rotateObject(150, 10);    
}


    
}