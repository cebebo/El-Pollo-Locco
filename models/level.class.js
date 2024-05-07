class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    beans;
    cacti;
    checkpoints;
    level_end_x; 

    constructor(enemies, clouds, backgroundObjects, coins, bottles, beans, cacti, checkpoints){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.beans = beans;
        this.cacti = cacti;
        this.checkpoints = checkpoints;
        this.level_end_x = this.checkpoints[this.checkpoints.length - 1].x + 2450;
    }
}