class Player {
  constructor() {
    this.reset();
  }
  rollDie() {
    this.roll = floor(random(1, 7));
    this.next = this.spot + this.roll;
    
  }
  move() {
    this.spot = this.next;
  }

  showPreView() {
    let start = max(0, this.spot);
    let end = min(this.next, tiles.length - 1);
    for (let i = start; i <= end; i++) {
      tiles[i].highlight();
    }
  }

  isSnadder() {
    let tile = tiles[this.spot];
    return tile && tile.snadder !== 0;
  }
  moveSnadder() {
    let tile = tiles[this.spot];
    this.spot += tile.snadder;
  }

  reset() {
    this.spot = -1;
    this.roll = -1;
    this.next = -1;
  }
  show() {
    let current = tiles[this.spot];
    if (!current) return;
    strokeWeight(0);
    fill(255);
    // noFill();
    let center = current.getCenter();
    ellipse(center[0], center[1], 12);
  }
}
