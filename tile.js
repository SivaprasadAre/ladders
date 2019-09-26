class Tile {
  constructor(x, y, wh, index, next) {
    this.x = x;
    this.y = y;
    this.wh = wh;
    this.next = next;
    this.index = index;
    this.snadder = 0;
    if (this.index % 2 == 0) {
      this.color = 180;
      this.tcolor = 20;
    } else {
      this.color = 100;
      this.tcolor = 255;
    }
  }
  getCenter() {
    let cx = this.x + this.wh / 2;
    let cy = this.y + this.wh / 2;
    return [cx, cy];
  }

  show() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.wh, this.wh);
    fill(this.tcolor);
    textSize(12);
    text(this.next, this.x, this.y + 10);
  }

  highlight() {
    fill(0, 0, 255, 100);
    noStroke();
    rect(this.x, this.y, this.wh, this.wh);
  }

  showSnadders(tiles) {
    if (this.snadder != 0) {
      let myCenter = this.getCenter();
      let nextCenter = tiles[this.index + this.snadder].getCenter();
      strokeWeight(5);
      if (this.snadder < 0) {
        stroke(255);
        noFill();
        ellipse(myCenter[0], myCenter[1], 12,0);
        line(myCenter[0], myCenter[1], nextCenter[0], nextCenter[1]);
      } else {
        stroke(0, 0, 0);
        noFill();
        ellipse(nextCenter[0], nextCenter[1], 12,0);
        ellipse((((nextCenter[0]+myCenter[0])/2)+nextCenter[0])/2 , (((nextCenter[1]+myCenter[1])/2)+nextCenter[1])/2, 12,0);
        ellipse(((nextCenter[0]+myCenter[0])/2) , ((nextCenter[1]+myCenter[1])/2), 12,0);
        ellipse((((nextCenter[0]+myCenter[0])/2)+myCenter[0])/2 , (((nextCenter[1]+myCenter[1])/2)+myCenter[1])/2, 12,0);
        ellipse(myCenter[0], myCenter[1], 12,0);
        line(myCenter[0]+6, myCenter[1], nextCenter[0]+6, nextCenter[1]);
        line(myCenter[0]-6, myCenter[1], nextCenter[0]-6, nextCenter[1]);
      }
      
    }
  }
}
