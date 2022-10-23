class Cloud {
    constuctor(place) {
      this.x = int(random(wh+1))
      this.y = int((random(ht*2)) + ht)
      this.image = clouds[1]
      this.num = place;
    }
    show() {
      image(clouds[1], this.x, this.y, clouds[1].width*(wh/clouds[1].width), clouds[1].height*(ht/clouds[1].height))
      if (guy.state == states[0]) {
      if (this.y > -ht) {
        this.y -= 40*(wh/500)
      } else {
        this.x = random(wh+1)
        this.y = (random(ht*2)) + ht
        this.image = clouds[random(5)]
      }
      }
      if (this.x < wh*2) {
        this.x += ((this.num/2)*(wh/500))/32
      } else {
        this.x = -wh/2
        this.y = (random(ht))
        this.image = clouds[random(5)]
      }
    }
  }