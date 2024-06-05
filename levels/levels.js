let levelValues = [
    {
        'speedCharacter': 3.5,
        'speedChicken': 0.15 + Math.random() * 0.25,
        'speedChick': 0.15 + Math.random() * 0.25,
        'speedEndboss': 2,
        'cactusGrow': 2000,
        'endbossFollow': 12,
        'endbossAttack': 17,
        'distanceFollow': 300,
        'distanceAttack': 150,
        'endbossFreezed': 5000,
        'endbossHit': 20,
        'characterHit': 0.5,
        'chickSpeed': 1,
        'heightChicken': 50
    },
    {
        'speedCharacter': 5,
        'speedChicken': 0.35 + Math.random() * 0.6,
        'speedChick': 0.35 + Math.random() * 0.6,
        'speedEndboss': 4,
        'cactusGrow': 1250,
        'endbossFollow': 16,
        'endbossAttack': 21,
        'distanceFollow': 500,
        'distanceAttack': 250,
        'endbossFreezed': 3000,
        'endbossHit': 13,
        'characterHit': 0.9,
        'chickSpeed': 2,
        'heightChicken': 100
    }
];

/**
 * Includes all objects loaded at the start of the first level.
 * 
 * @returns - Objects, that are loades at the beginning.
 */
function settingsLevel1() {
    return new Level(
        [],
        [
            new Cloud(0),
            new Cloud(0)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),

            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
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
            new Checkpoint(300, 1, 1, 2, 3, 3),
            new Checkpoint(1500, 1, 1, 2, 3, 3),
            new Checkpoint(2700, 1, 1, 3, 3, 3),
            new Checkpoint(3900, 1, 1, 4, 2, 3),
            new Checkpoint(5200, 1, 1, 3, 3, 4),
            new Checkpoint(6400, 1, 1, 2, 4, 3),
            new Checkpoint(7600, 0, 1, 3, 5, 2)
        ]
    );
}

/**
 * Includes all objects loaded at the start of the second level.
 * 
 * @returns - Objects, that are loades at the beginning.
 */
function settingsLevel2() {
    return new Level(
        [],
        [
            new Cloud(0),
            new Cloud(0)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),

            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719)
        ],
        [
            new Coin(-500)
        ],
        [
            new Bottle(-500)
        ],
        [
            new Bean(-500)
        ],
        [],
        [   // (Position x, Amount Enemies, Amount Cacti, Amount Coins, Amount Bottles, Amount Beans)
            new Checkpoint(300, 1, 1, 1, 2, 2),
            new Checkpoint(1500, 2, 0, 1, 2, 2),
            new Checkpoint(2700, 1, 2, 2, 1, 2),
            new Checkpoint(3900, 2, 1, 2, 1, 1),
            new Checkpoint(5200, 1, 0, 3, 2, 1),
            new Checkpoint(6400, 2, 3, 3, 2, 1),
            new Checkpoint(7600, 1, 1, 2, 3, 2),
            new Checkpoint(8800, 2, 2, 2, 2, 2),
            new Checkpoint(10000, 1, 2, 1, 3, 3),
            new Checkpoint(11200, 2, 0, 1, 1, 2),
            new Checkpoint(12400, 0, 2, 1, 2, 2)
        ]
    );
}

