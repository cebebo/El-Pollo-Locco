let currentLevel = new Level(
    [],
    [
        new Cloud(0),
        new Cloud(0)
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719)
    ],
    [
        new Coin(-500),
        new Coin(-500)
    ],
    [
        new Bottle(-500)
    ],
    [
        new Bean(-500),
        new Bean(-500)
    ],
    [],
    [   // (Position x, Amount Enemies, Amount Cacti, Amount Coins, Amount Bottles, Amount Beans)
        new Checkpoint(300, 1, 1, 2, 3, 3)
        // new Checkpoint(1500, 1, 1, 2, 3, 3),
        // new Checkpoint(2700, 1, 1, 3, 3, 3),
        // new Checkpoint(3900, 1, 1, 4, 2, 3),
        // new Checkpoint(5200, 1, 1, 3, 3, 4),
        // new Checkpoint(6400, 1, 1, 2, 4, 3),
        // new Checkpoint(7600, 0, 1, 3, 5, 2)
    ]
);

