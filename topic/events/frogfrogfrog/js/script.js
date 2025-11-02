/**
 * Frogfrogfrog
 * Kerven Laurent 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";
let minions;
let gameoverSound;
let gameoverScreen;
let score = 0;
let gameMusic;
let menuMusic;
let gameState = "menu" 
let font1;
let titleImage;
let mountains;
let clouds = [
  { x: 100, y: 80, speed: undefined }, //cloud 1
  { x: 300, y: 120, speed: undefined }, // cloud 2
   { x: 500, y: 60, speed: undefined } //cloud 3
];

//preloads the font and music
function preload() {
    font1 = loadFont('assets/fonts/CookieRunBlack.otf');
    menuMusic = loadSound ('assets/sounds/dummycat.mp3');   
    gameMusic = loadSound ('assets/sounds/dummycat2.mp3');
    gameoverSound = loadSound ('assets/sounds/gameover.mp3');
    gameoverScreen = loadImage ('assets/images/gameover.png');
    minions = loadImage ('assets/images/evilassminions.jpg');
    titleImage = loadImage ('assets/images/Title.png');
    mountains = loadImage ('assets/images/mountains.png');
}


//drawing the cloud
function drawCloud(x, y) {  
push();
  noStroke();
  fill(255, 255, 255, 220); 
  ellipse(x, y, 90, 50);
  pop();
}

//styling the menu
function showMenu () {
    background("#4dd1ff");
    //floating cloud behind title
    push();
    noStroke();
    fill("#ffffff");  
    ellipse(470, 10 * sin(frameCount * 0.03) + 90, 40, 20);
    pop();


    imageMode (CENTER);
    image(titleImage, width / 2, 7 * sin(frameCount * 0.01) + 150, 350, 200); //image title
    imageMode (CORNERS);
    image(mountains, 0, height / 1.7, width, height);
    //Resets image mode
    imageMode (CENTER);
    //floating cloud
    push();
    noStroke();
    fill("#ffffff");
    ellipse(170, 10 * sin(frameCount * 0.02) + 185, 90, 40);
    pop();

    fill("#000000");
    textFont (font1);
    textAlign(CENTER, CENTER);
    textSize(15);
    text("Click to Play", width / 2, height / 2+40);
    imageMode(CORNER);
    
}

function mountainScroll(){
    
}


//Game over screen
function showGameOver(){
    
    image(gameoverScreen, 0, 0, 640, 480);
    textAlign(CENTER);
    textFont(font1);
    textSize(32);
    fill("#ff0000ff");
    text("GAME OVER", width/2, height/2 - 20);
    text("Score : "+ score, width/2, height/2 + 15)
    textSize(20);
    text("Click to Restart", width/2, height/2 + 60);    
    gameState = "gameover";

    if (gameMusic.isPlaying()){
        gameMusic.stop();
       
    }
    
}

//starts the game
function startGame () {
    fill("#000000");
    resetFly();
    menuMusic.stop();
    gameMusic.loop();
    scoreReset();
    hasPlayedGameOverSound = false;
    gameState = "game";


}
//Displays tip to player to press Q to quit at the top left of the screen
function gameTip () {
    textAlign(CENTER);
    textSize(15);
    text('PRESS Q TO QUIT', 100, 40);
    text('Time alive : '+ score +' seconds', 100, 60)
}


// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 40
    },
    // The frog's tongue has a position, size, speed, and state
   

      
   
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 17,
    
};

const fly2 = {
    x: 0,
    y: 0, // Will be random
    size: 10,
    speed: 15
};

//Game goes back to menu
function keyPressed() {
if (key === 'q' || key === 'Q' || key === 'Escape') {
    gameState = "menu";
    if (!menuMusic.isPlaying()){
        menuMusic.loop();
    }
    if (gameMusic.isPlaying()){
        gameMusic.stop();
    }
}
}


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    // Give the fly its first random position
    resetFly();

    for (let s of clouds){
        s.speed = random(7, 10);
    }

}


let hasPlayedGameOverSound = false;

//fires up the menu
function draw() {
    background("#4dd1ff");
    if (gameState === "menu") {
        showMenu();


        return;
    }

    else if (gameState === "gameover") {
        showGameOver();
        // Play the sound once
         if (!hasPlayedGameOverSound) {
            gameoverSound.play();
            hasPlayedGameOverSound = true;
        }
        return;
    }

    // passing clouds
    for (let c of clouds){

        drawCloud(c.x,c.y);

        //moves the clouds
        c.x += c.speed;

        if (c.x > width + 30) {
            c.x = -80; //starts off screen
            c.y = random(0, width);
            c.speed = random(7, 10)
        }


    }
    

    
    moveFly();
    drawFly();
    moveFrog();
    drawFrog();
    checkBodyFlyOverlap();
    gameTip();
}

function mousePressed (){
    if (gameState === "menu" || gameState === "gameover") {
        startGame();
        return;
    }
  
}






/**
 * Draws the fly 
*/
function drawFly() {
    image (minions, fly.x, fly.y, 70, 70);
}

/**
 * Resets the fly to the left with a random y
*/
function resetFly() {
    fly.x = -80;
    fly.baseY = random(100, height - 100); // store base position
}




/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {

    let amplitude = 100;
    let speed= 0.05; 
    let verticalOffset = sin(frameCount * speed) * amplitude;
    // Move the fly
    fly.x += fly.speed;
     fly.y = fly.baseY + verticalOffset;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
   
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
    frog.body.y = mouseY;
    //keeps the frog's body within the box so no one can cheese their way through high scores >:(
    frog.body.x = constrain(mouseX, 25, width-25);
    frog.body.y = constrain(mouseY, 25, height-25);
   
}


/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the frog's body
    push();
    fill("#00ff00");
    strokeWeight(7);
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
   //drawing the eyes
    push();
    noStroke();
    fill("#ffffff");
    ellipse(frog.body.x - 10, frog.body.y - 15, 25);
    //second eye
    ellipse(frog.body.x + 10, frog.body.y - 15, 25);
    //pupils
    fill("#000000");
    ellipse(frog.body.x + 10, frog.body.y - 20, 10);
    ellipse(frog.body.x - 10, frog.body.y - 20, 10);
    pop();

}

//Score increaser
function scoreIncrease() {
    if (gameState === "game") {
        score++;
    }
}
//Timer for score to go up every second
setInterval(scoreIncrease, 1000);


//score reset

function scoreReset() {
    if (gameState === "gameover" || gameState === "menu") {
        score = 0;
    }
}

/**
 * Handles the body overlapping the fly
 */
function checkBodyFlyOverlap() {
    // Calculate the center of the fly
    const flyCenterX = fly.x + 70 / 2; // half of the drawn width
    const flyCenterY = fly.y + 70 / 2; // half of the drawn height

    // Get distance from frog body to fly center
    const d = dist(frog.body.x, frog.body.y, flyCenterX, flyCenterY);

    // Check if circles overlap (frog’s circle vs fly’s approximate circle)
    const eaten = (d < frog.body.size / 2 + 70 / 2);

    if (eaten) {
        gameState = "gameover";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
