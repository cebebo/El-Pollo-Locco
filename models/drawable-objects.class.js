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

    /**
     * Loads the file path of the graphic into the img value.
     * 
     * @param {variable} path - file path of the graphic.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    /**
     * Loads the file paths of the graphic that are in the array into the img value and saves it in a new array.
     * 
     * @param {variable} array - file pathes of the graphic array.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the graphic onto the canvas with details of size, position and file path.
     * 
     * @param {variable} ctx - variable of the canvas context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a box around objects to show their real sizes.
     * 
     * @param {variable} ctx - variable of the canvas context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof Coin || 
            this instanceof Bottle || this instanceof ThrowableObject || this instanceof FartableObject || this instanceof Cactus || this instanceof Bean) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof FartableObject || this instanceof Cactus) {
                ctx.strokeStyle = 'green';
                ctx.rect(this.x + this.idealFrame[0], this.y + this.idealFrame[1], this.width - this.idealFrame[2], this.height - this.idealFrame[3]);
            }
            if (this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject || this instanceof Bean) {
                ctx.strokeStyle = 'red';
                ctx.rect(this.x + this.idealFrame[0], this.y + this.idealFrame[1], this.width - this.idealFrame[2], this.height - this.idealFrame[3]);
        }
            ctx.stroke();
        }   
    }
}