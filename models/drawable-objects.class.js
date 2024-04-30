class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x;
    y;    
    height;
    width;
    idealFrame = [0,0,0,0];
    collectedCoins = 0;
    collectedBottles = 0;
    xCol;
    yCol;
    wCol;
    hCol;


    constructor() {
         
    }
    

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
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || 
            this instanceof Endboss || this instanceof Coin || this instanceof Bottle || 
            this instanceof ThrowableObject || this instanceof Fart) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof Fart) {
                ctx.strokeStyle = 'green';
                ctx.rect(this.x + this.idealFrame[0], this.y + this.idealFrame[1], this.width - this.idealFrame[2], this.height - this.idealFrame[3]);
            }
            if (this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) {
                ctx.strokeStyle = 'red';
                ctx.rect(this.x + this.idealFrame[0], this.y + this.idealFrame[1], this.width - this.idealFrame[2], this.height - this.idealFrame[3]);
                
        }
            ctx.stroke();
        }
        
    }

}