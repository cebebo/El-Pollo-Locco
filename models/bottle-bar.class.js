class BottleBar extends Bars {

    x = 180;
    percentage = 0;

    STATUS_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.STATUS_BOTTLES);
        this.setPercentage(0, this.STATUS_BOTTLES);
        
    }  

    // setPercentage(percentage) {
    //     this.percentage = percentage;
    //     let path = this.STATUS_ENERGY[this.resolveImageIndex()];
    //     this.img = this.imageCache[path];
    // }

}