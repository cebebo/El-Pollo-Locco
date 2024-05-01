class BeansBar extends Bars {
x = 520;
percentage = 0;

STATUS_BEANS = [
    'img/7_statusbars/1_statusbar/4_statusbar_bean/0.png',
    'img/7_statusbars/1_statusbar/4_statusbar_bean/20.png',
    'img/7_statusbars/1_statusbar/4_statusbar_bean/40.png',
    'img/7_statusbars/1_statusbar/4_statusbar_bean/60.png',
    'img/7_statusbars/1_statusbar/4_statusbar_bean/80.png',
    'img/7_statusbars/1_statusbar/4_statusbar_bean/100.png'
];

constructor() {
    super();
    this.loadImages(this.STATUS_BEANS);
    this.setPercentage(0, this.STATUS_BEANS);
    
}  

}