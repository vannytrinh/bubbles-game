/* global createCanvas createButton keyIsDown, frameRate, stroke noStroke, key, loadImage, image, tint, colorMode HSB random width height background fill rect ellipse keyCode UP_ARROW LEFT_ARROW RIGHT_ARROW DOWN_ARROW textSize text collideCircleCircle textAlign LEFT RIGHT strokeWeight key*/

let bubbles,
  color,
  gameIsOver,
  imageWater,
  fishc,
  button,
  p1Score,
  p2Score,
  p3Score,
  fish3,
  fish1,
  fish2,
  cScore1,
  cScore2,
  onScreen1,
  onScreen2,
  onScreen3,
  cScore3;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100);

  imageWater = loadImage(
    "https://cdn.glitch.com/5e8484d6-e91d-413f-a0df-b1ecfa875b45%2Ffish.png?v=1627058148508"
  );

  // restart button
  button = createButton("Restart");
  button.position(width / 2, height - 100);
  button.mousePressed(restartGame);

  onScreen1 = true;
  onScreen2 = true;
  onScreen3 = true;
  gameIsOver = false;
  checkWin();
  p1Score = 0;
  p2Score = 0;
  p3Score = 0;

  const cScore1 = p1Score;
  const cScore2 = p2Score;
  const cScore3 = p3Score;

  bubbles = [];
  for (let i = 0; i < 20; i++) {
    let bubble = new Bubble();
    bubbles.push(bubble);
  }

  fish1 = new Fish();
  fish1.colorHue = 1;
  fish1.x = width * 0.75;

  fish2 = new Fish();
  fish2.colorHue = 60;
  fish2.x = width * 0.25;

  fish3 = new Fish();
  fish3.colorHue = 295;
  fish3.x = width * 0.5;
}

function draw() {
  tint(250, 10, 100);
  image(imageWater, 0, 0, 800, 800);

  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    bubble.move();
    bubble.display();
    bubble.collisionCheck();
  }
  updateFishPositions();
  checkPosition();
  resetIfOff();
  // display fish
  fish1.display();
  fish2.display();
  fish3.display();

  // player instructions
  fill(100);
  noStroke();
  textAlign(RIGHT);
  textSize(15);
  text("Red Fish [player one] uses ARROWS", 770, 30);
  text("Yellow Fish [player two] uses WASD", 770, 50);
  text("Purple Fish [player three] uses YGHJ", 770, 70);
  textSize(25);
  text("First to Score 100 Points Wins!", 550, 110);

  displayScores();
  checkWin();
}

// move fish 1 and 2
function updateFishPositions() {
  if (gameIsOver == false) {
    if (keyIsDown(UP_ARROW)) {
      fish1.active = true
      fish1.y -= 10;
    }
    if (keyIsDown( DOWN_ARROW)) {
      fish1.active = true
      fish1.y += 10;
    }
    if (keyIsDown( LEFT_ARROW)) {
      fish1.active = true
      fish1.x -= 10;
    }
    if (keyIsDown( RIGHT_ARROW)) {
      fish1.active = true
      fish1.x += 10;
    }
    if (keyIsDown(87)) {
      fish2.active = true;
      fish2.y -= 10;
    }
    if (keyIsDown(83)) {
      fish2.active = true;
      fish2.y += 10;
    }
    if (keyIsDown(65)) {
      fish2.active = true;
      fish2.x -= 10;
    }
    if (keyIsDown(68)) {
      fish2.active = true;
      fish2.x += 10;
    }
    if (keyIsDown(89)) {
      fish3.active = true
      fish3.y -= 10;
    }
    if (keyIsDown(72)) {
      fish3.active = true
      fish3.y += 10;
    }
    if (keyIsDown(71)) {
      fish3.active = true
      fish3.x -= 10;
    }
    if (keyIsDown(74)) {
      fish3.active = true
      fish3.x += 10;
    }
 }
  // this.active = true
}
class Bubble {
  constructor() {
    this.x = random(width);
    this.y = height;
    this.d = random(10, 25);
    this.FallSpeed = random(0.5, 3);
    this.colorHue = random(200, 250);
    this.colorBrightness = random(50, 100);
  }

  move() {
    this.y -= this.FallSpeed;
    // If it goes off the screen...
    if (this.y < 0) {
      // ...reset it...
      this.y = height;
      // ...and move it somewhere random.
      this.x = random(width);
    }
  }

  display() {
    // display bubble
    noStroke();
    fill(this.colorHue, this.colorBrightness, 100);
    ellipse(this.x, this.y, this.d);
  }

  collisionCheck() {
    // if any player touches a bubble
   
    if (gameIsOver == false) {
      if (fish1.active == true && collideCircleCircle(this.x, this.y, this.d, fish1.x, fish1.y, 20)) {
        console.log("score");
        // increase score
        
        p1Score += 5;
        // reset bubble
        this.y = height;
        this.x = random(width);
      }
      if (fish2.active == true && collideCircleCircle(this.x, this.y, this.d, fish2.x, fish2.y, 20)) {
        // increase score
        p2Score += 5;
        // reset bubble
        this.y = height;
        this.x = random(width);
      }
      if (fish3.active == true && collideCircleCircle(this.x, this.y, this.d, fish3.x, fish3.y, 20)) {
        // increase score
        p3Score += 5;
        // reset bubble
        this.y = height;
        this.x = random(width);
      }
    }
  }
}

class Fish {
  //defines fish icons
  constructor() {
    this.x = random(width);
    this.y = height / 2;
    this.d = 25;
    this.colorHue = 60;
    this.active = false;
   
  }
  display() {
    // show fish icons
    stroke(100);
    strokeWeight(3);
    fill(this.colorHue, 100, 100);
    ellipse(this.x, this.y, this.d);
  }
}

function displayScores() {
  fill(360);
  noStroke();
  textAlign(LEFT);
  textSize(15);
  text(`Red Fish's: ${p1Score}`, 30, 30);
  text(`Yellow Fish's Score: ${p2Score}`, 30, 50);
  text(`Purple Fish's Score: ${p3Score}`, 30, 70);

  if (gameIsOver) {
    textSize(60);
    text("GAME OVER!", width / 2 - 190, height / 2);

    const p1Score = 0;
    const p2Score = 0;
    const p3Score = 0;
  }
}

function restartGame() {
  gameIsOver = false;
  p1Score = 0;
  p2Score = 0;
  p3Score = 0;

  fish1 = new Fish();
  fish1.colorHue = 1;
  fish1.x = width * 0.75;

  fish2 = new Fish();
  fish2.colorHue = 60;
  fish2.x = width * 0.25;

  fish3 = new Fish();
  fish3.colorHue = 295;
  fish3.x = width * 0.5;
}
function checkWin() {
  
    if (p1Score == 100) {
      gameIsOver = true;
      console.log("gameIsOver");
      textSize(40);
      stroke(1, 100, 100);
      fill(1, 100, 100);
      text("Red Fish Wins!", width / 2 - 135, height / 2 + 50);
    }
    if (p2Score == 100) {
      gameIsOver = true;
      textSize(40);
      stroke(60, 100, 100);
      fill(60, 100, 100);
      text("Yellow Fish Wins!", width / 2 - 155, height / 2 + 50);
      gameIsOver = true;
      console.log("gameIsOver");
    }
    if (p3Score == 100) {
      gameIsOver = true;
      textSize(40);
      stroke(295, 100, 100);
      fill(295, 100, 100);
      text("Purple Fish Wins!", width / 2 - 155, height / 2 + 50);
      console.log("gameIsOver");
    }
   
    console.log("gameIsOver");
  
}
// checks to see if the fish is on sreen and updates onScreen for each fish
  function checkPosition() {
    if (fish1.x <= 0) {
      onScreen1 = false
    }
       if (fish2.x <= 0) {
      onScreen2 = false
    }
       if (fish3.x <= 0) {
      onScreen3 = false
    }
       if (fish1.x >= width) {
      onScreen1 = false
    }
    if (fish2.x >= width) {
      onScreen2 = false
    }
    if (fish3.x >= width) {
      onScreen3 = false
    }
      if (fish1.y >= height) {
      onScreen1 = false
    }
       if (fish2.y >= height) {
      onScreen2 = false
    }
       if (fish3.y >= height) {
      onScreen3 = false
    }
       if (fish1.y <= 0) {
      onScreen1 = false
    }
       if (fish2.y <= 0) {
      onScreen2 = false
    }
       if (fish3.y <= 0) {
      onScreen3 = false
    }
  }
// reset's the fish if they go off screen
function resetIfOff(){
  if (onScreen1 == false){
  fish1 = new Fish();
  fish1.colorHue = 1;
  fish1.x = width * 0.75;
  onScreen1 = true;
  }
  if (onScreen2 == false){
  fish2 = new Fish();
  fish2.colorHue = 60;
  fish2.x = width * 0.25;
  onScreen2 = true;
  }
  if (onScreen3 == false){
  fish3 = new Fish();
  fish3.colorHue = 295;
  fish3.x = width * 0.5;
  onScreen2 = true;
  }

}