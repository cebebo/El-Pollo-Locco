class Bars extends DrawableObject {
y = 0;
height = 40;
width = 150;
percentage = 0;

    resolveImageIndex() {
        if (this.percentage >= 99) { return 5; }
        else if (this.percentage > 75) { return 4; }
        else if (this.percentage > 50) { return 3; }
        else if (this.percentage > 25) { return 2; }
        else if (this.percentage > 0) { return 1; }
        else if (this.percentage <= 0) { return 0; }
    }

    setPercentage(percentage, pic) {
        this.percentage = percentage;
        let path = pic[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}