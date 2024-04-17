class CoinsBar extends Bars {

    x = 480;
    y = 10;
    height = 50;
    width = 200;
    percentage = 0;

    STATUS_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.STATUS_COINS);
        this.setPercentage(80, this.STATUS_COINS);
    }

    

}