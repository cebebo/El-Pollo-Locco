class Poster extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    img;

    constructor(path) {
        super();
        this.img = path;
    }
}