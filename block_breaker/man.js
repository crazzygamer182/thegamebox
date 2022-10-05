class Man {
  constructor() {
    this.x = 0;
    this.state = states[0];
    this.image = 1;
    this.look = looks[4];
  }
  show() {
    if (this.image == 1) {
      if (this.state == states[1]) {
      image(this.look, this.x, 0, this.look.width*(wh/this.look.width), this.look.height*(ht/this.look.height))
      } else if (this.state == states[0]) {
      image(this.state, this.x, 0, this.state.width*(wh/this.state.width), this.state.height*(ht/this.state.height))
      }
    } else if (this.image == "atf") {
      image(eyes, this.x, 0, this.state.width*(wh/this.state.width), this.state.height*(ht/this.state.height))
    } else if (this.image > 1) {
      image(blink, this.x, 0, this.state.width*(wh/this.state.width), this.state.height*(ht/this.state.height))
      this.image--;
    }
    if (int(random(300)) == 25 && this.state == states[1]) {
      this.image = 6;
    }
    if (this.image == 2) {
      this.look = looks[int(random(looks.length))];
    }
  }
}