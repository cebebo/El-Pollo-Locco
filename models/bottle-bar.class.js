class BottleBar extends Bars {

    x = 250;
    y = 10;
    height = 50;
    width = 200;
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
        this.setPercentage(76, this.STATUS_BOTTLES);
        
    }  

}