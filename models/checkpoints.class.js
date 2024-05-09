class Checkpoint extends MovableObject {
    
    width = 5;
    height = 480;
    ENEMIES;
    CACTI;
    COINS;
    BOTTLES;
    BEANS;
    CLOUDS = 5;
    
    constructor(x, enemies, cacti, coins, bottles, beans){
        super().loadImage('img/checkpoint.png');
        this.y = 480 - this.height;
        this.x = x;
        this.ENEMIES = enemies;
        this.CACTI = cacti;
        this.COINS = coins;
        this.BOTTLES = bottles;
        this.BEANS = beans;
    }

}