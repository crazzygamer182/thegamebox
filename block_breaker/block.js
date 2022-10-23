class Block {
    constructor() {
      this.x = 0;
      this.y = 67 * (wh / 500) + ht;
      this.image = bImages[int(random(5))];
      this.number = int(random(3) + 2);
        if (level < 3) {
        } else if (level < 7) {
          this.number = this.number*int(random(3) + 2);
        } else if (level < 12) {
          this.number = this.number*int(random(4) + 3);
        } else if (level < 30) {
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
        } else if (level < 100) {
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
        } else {
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
        }
      this.numI = this.number;
      this.yes = false;
    }
    choose() {
      this.number = int(random(3) + 2);
        if (level < 3) {
        } else if (level < 7) {
          this.number = this.number*int(random(3) + 2);
        } else if (level < 12) {
          this.number = this.number*int(random(4) + 3);
        } else if (level < 30) {
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
        } else if (level < 100) {
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
        } else {
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
          this.number = this.number*int(random(4) + 3);
        }
      this.numI = this.number;
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
      if (this.number.toString().length < 2) {
        if (this.yes == false) {
          textSize(35 * (wh / 500));
        } else {
          textSize(38 * (wh / 500));
        }
      } else if (this.number.toString().length < 3) {
        if (this.yes == false) {
          textSize(31 * (wh / 500));
        } else {
          textSize(34 * (wh / 500));
        }
      } else if (this.number.toString().length < 4) {
        if (this.yes == false) {
          textSize(27 * (wh / 500));
        } else {
          textSize(30 * (wh / 500));
        }
      } else if (this.number.toString().length < 5) {
        if (this.yes == false) {
          textSize(23 * (wh / 500));
        } else {
          textSize(26 * (wh / 500));
        }
      } else if (this.number.toString().length < 6) {
        if (this.yes == false) {
          textSize(19 * (wh / 500));
        } else {
          textSize(22 * (wh / 500));
        }
      }
      else if (this.number.toString().length < 7) {
        if (this.yes == false) {
          textSize(15 * (wh / 500));
        } else {
          textSize(18 * (wh / 500));
        }
      } else if (this.number.toString().length < 8) {
        if (this.yes == false) {
          textSize(12 * (wh / 500));
        } else {
          textSize(15 * (wh / 500));
        }
      } else if (this.number.toString().length < 9) {
        if (this.yes == false) {
          textSize(10 * (wh / 500));
        } else {
          textSize(13 * (wh / 500));
        }
      } else if (this.number.toString().length < 10) {
        if (this.yes == false) {
          textSize(8 * (wh / 500));
        } else {
          textSize(11 * (wh / 500));
        }
      } else if (this.number.toString().length < 11) {
        if (this.yes == false) {
          textSize(6 * (wh / 500));
        } else {
          textSize(9 * (wh / 500));
        }
      } else if (this.number.toString().length < 12) {
        if (this.yes == false) {
          textSize(5 * (wh / 500));
        } else {
          textSize(8 * (wh / 500));
        }
      }
        text(this.number, this.x + wh / 2, this.y + ht / 2 - 2*(wh/500));
        textSize(25 * (wh / 500));
      if (this.number > numM) {
        this.number = this.numI;
      }
    }
  }
  