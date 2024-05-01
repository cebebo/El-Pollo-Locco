class StatusBar extends Bars {

    x = 10;
    percentage = 100;

    STATUS_ENERGY = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.STATUS_ENERGY);
        this.setPercentage(100, this.STATUS_ENERGY);
    }

    // setPercentage(percentage) {
    //     this.percentage = percentage;
    //     let path = this.STATUS_ENERGY[this.resolveImageIndex()];
    //     this.img = this.imageCache[path];
    // }

}