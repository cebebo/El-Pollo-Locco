class Bean extends MovableObject {
x;
y;
width = 24;
height = 40;
rotation = true;

constructor() {
    super().loadImage('img/6_bean/bean.png');
    this.x = 250;
    this.y = 250;
    this.rotateObject(24, 1);
}


}

