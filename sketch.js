const ROLL_STATE = 0;
const MOVE_STATE = 1;
const SNADDER_STATE = 2;
let state = ROLL_STATE;
let div;

let tiles = [];
let player;
let rolls = [];
let index = 0;
let img;
let averageRolls = 0;

function setup() {
  div = createDiv("&#x2680")
    .size(80, 100)
    .style("margin-left", " 160px")
    .style("margin-bottom", " 10px");
    div.parent("sketch-div");
  createCanvas(400, 400);
  rolls[index] = 0;
  let resolut = 40;
  let cols = width / resolut;
  let rows = height / resolut;

  let x = 0;
  let y = (rows - 1) * resolut;
  let dir = 1;
  for (let i = 0; i < rows * cols; i++) {
    let tile = new Tile(x, y, resolut, i, i + 1);
    tiles.push(tile);
    x = x + resolut * dir;
    if (x >= width || x <= -resolut) {
      dir *= -1;
      x += resolut * dir;
      y -= resolut;
    }
  }

  for (let i = 0; i <= 2; i++) {
    let index = floor(random(cols, tiles.length));
    tiles[index].snadder = -1 * floor(random(index % cols, index - 1));
  }

  for (let i = 0; i <= 2; i++) {
    let index = floor(random(0, tiles.length - cols));
    tiles[index].snadder = floor(
      random(cols - (index % cols), tiles.length - index - 1)
    );
  }
  noLoop();
  player = new Player();
}

function draw() {
  // frameRate(1);
  background(251);

  for (let tile of tiles) {
    tile.show();
  }
  for (let tile of tiles) {
    tile.showSnadders(tiles);
  }
  if (state === ROLL_STATE) {
    player.rollDie();
    rolls[index]++;
    div.html("&#x268" + (player.roll - 1) + ";");
    div.style("font-size", "100px");
    player.showPreView(tiles);
    state = MOVE_STATE;
  } else if (state === MOVE_STATE) {
    player.move();
    if (player.isSnadder()) {
      state = SNADDER_STATE;
      // noLoop();
    } else {
      state = ROLL_STATE;
    }
  } else if (state === SNADDER_STATE) {
    player.moveSnadder();
    state = ROLL_STATE;
  }

  let gameOver = false;
  if (player.spot === tiles.length - 1) {
    noLoop();
    gameOver = true;
  }else if(player.spot > tiles.length - 1 ){
    player.spot -= player.roll;
  }

  player.show(tiles);

  if (gameOver) {
    player.reset();
    index++;
    rolls[index] = 0;
  }
}
function mousePressed() {
  // redraw();
}
function addCircle() {
  return redraw();
}

function buttonClicked() {
  redraw();
}
