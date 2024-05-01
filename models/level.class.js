class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    beans;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, coins, bottles, beans){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.beans = beans;
    }
}