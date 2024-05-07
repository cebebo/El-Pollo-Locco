class EndbossBar extends Bars {

    x = 500;
    y = 420;
    width = 200;
    height = 55;
    percentage = 100;

    STATUS_ENERGY_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.STATUS_ENERGY_ENDBOSS);
        this.setPercentage(100, this.STATUS_ENERGY_ENDBOSS);
    }


}