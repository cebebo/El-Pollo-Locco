class Coin extends MovableObject {
x;
y;
width = 150;
height = 150;
rotation = true;
idealFrame = [40, 55, 80, 110];
SOUND_COIN = new Audio('audio/coin.wav');


constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.x = 200 + Math.random() * 2000;
    this.y = 30 + Math.random() * 250;
    this.rotateCoin();    
}

rotateCoin() {
    setInterval(() => {
        if (this.rotation) { 
            this.width -= 10; 
            this.x += 5;
        }
        if (this.width == 0) { this.rotation = false; }
        if (!this.rotation) { 
            this.width += 10; 
            this.x -= 5;
        }
        if (this.width == 150) { this.rotation = true; }
    }, 30);
}
    
}