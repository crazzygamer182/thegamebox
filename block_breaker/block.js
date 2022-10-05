class Block {
  constructor() {
    this.x = 0;
    this.y = 67 * (wh / 500) + ht;
    this.image = bImages[int(random(5))];
    this.number = int(random(3) + 2);
      if (level < 3) {
        this.number = this.number*2;
      } else if (level < 12) {
        this.number = this.number*int(random(3) + 2);
      } else if (level < 30) {
        this.number = this.number*int(random(3) + 2);
        this.number = this.number*int(random(3) + 2);
      } else if (level < 100) {
        this.number = this.number*int(random(3) + 2);
        this.number = this.number*int(random(3) + 2);
        this.number = this.number*int(random(3) + 2);
      } else {
        this.number = this.number*int(random(3) + 2);
        this.number = this.number*int(random(3) + 2);
        this.number = this.number*int(random(3) + 2);
        this.number = this.number*int(random(3) + 2);
      }
    this.numI = this.number;
    this.yes = false;
  }
  show() {
    if (this.yes == false || AlmostThere == true) {
      image(
        this.image,
        this.x,
        this.y,
        this.image.width * (wh / this.image.width),
        this.image.height * (ht / this.image.height)
      );
    } else {
      image(
        this.image,
        this.x - 0.375*67 * (wh / 500),
        this.y*0.775,
        this.image.width * 1.1 * (wh / this.image.width),
        this.image.height * 1.1 * (ht / this.image.height)
      );
    }
    textAlign(CENTER, CENTER);
    if (this.yes == false) {textSize(35 * (wh / 500));} else {textSize(38 * (wh / 500));}
      text(this.number, this.x + wh / 2, this.y + ht / 2 - 2*(wh/500));
    textSize(25 * (wh / 500));
    if (this.number > numM) {
      this.number = this.numI;
    }
  }
}
