class Bean extends MovableObject {
    x;
    y;
    width = 24;
    height = 40;
    rotation = true;

    constructor(x) {
        super().loadImage('img/6_bean/bean.png');
        this.x = x + 700 + Math.random() * 700;
        this.y = 55 + Math.random() * 225;
        this.rotateObject(24, 1);
    }

}

