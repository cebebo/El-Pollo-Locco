class Bean extends MovableObject {
x;
y;
width = 24;
height = 40;
rotation = true;

constructor() {
    super().loadImage('img/6_bean/bean.png');
    this.x = 200 + Math.random() * 2000;
    this.y = 30 + Math.random() * 250;
    this.rotateObject(24, 1);
}


}

