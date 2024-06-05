class Bars extends DrawableObject {
y = 0;
height = 40;
width = 150;
percentage = 0;

/**
 * Assigns an ordinal number for the display bar depending on the percentage value. 
 * 
 * @returns - full power with the value of 5 to dead with the value of 0. These parameters point to the correct array position.
 */
    resolveImageIndex() {
        if (this.percentage >= 99) { return 5; }
        else if (this.percentage > 75) { return 4; }
        else if (this.percentage > 50) { return 3; }
        else if (this.percentage > 25) { return 2; }
        else if (this.percentage > 0) { return 1; }
        else if (this.percentage <= 0) { return 0; }
    }

/**
 * Find the appropriate graphic for the bar display for the determined atomic number.
 * 
 * @param {integer} percentage - This value is the result that should be displayed in the bar.
 * @param {string} pic - This array variable contains all graphics for the display.
 */
    setPercentage(percentage, pic) {
        this.percentage = percentage;
        let path = pic[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}