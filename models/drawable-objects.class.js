class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 135;    
    height = 295;
    width = 150;
    idealFrame = [0,0,0,0];

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x + this.idealFrame[0], this.y + this.idealFrame[1], this.width - this.idealFrame[2], this.height - this.idealFrame[3]);
            ctx.stroke();
        }
    }

}