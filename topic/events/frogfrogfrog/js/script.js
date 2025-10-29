/**
 * Frogfrogfrog
 * Pippin Barr
 * 
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


//preloads the font and music
function preload() {
    font1 = loadFont('assets/fonts/CookieRunBlack.otf');
    menuMusic = loadSound ('assets/sounds/dummycat.mp3');   
    gameMusic = loadSound ('assets/sounds/dummycat2.mp3');
    gameoverSound = loadSound ('assets/sounds/gameover.mp3');
    gameoverScreen = loadImage ('assets/images/gameover.png');
    minions = loadImage ('assets/images/evilassminions.jpg');
}


//styling the menu
function showMenu () {
    background("#a8ffdbff");
    fill("#000000");
    textFont (font1);
    textAlign(CENTER, CENTER);
    textSize (32);
    text("Evil ass frogs game", width / 2, height / 2 - 40);
    textSize(15);
    text("Click to Play", width / 2, height / 2);
}

//Game over screen
function showGameOver(){
    
    image(gameoverScreen, 0, 0, 640, 480);
    gameoverSound.play();
    textAlign(CENTER);
    textFont(font1);
    textSize(32);
    fill("#ff0000ff");
    text("GAME OVER", width/2, height/2 - 20);
    textSize(20);
    text("Click to Restart", width/2, height/2 + 20);    
    gameState = "gameover";
    
}

//starts the game
function startGame () {
    menuMusic.stop();
    gameMusic.loop();
    gameState = "game";

}
//Displays tip to player to press Q to quit at the top left of the screen
function gameTip () {
    textAlign(CENTER);
    textSize(15);
    text('PRESS Q TO QUIT', 100, 40);
    text('SCORE : '+ score, 100, 60)
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
    speed: 4
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
}


let hasPlayedGameOverSound = false;

//fires up the menu
function draw() {

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

    

    background("#87ceeb");
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
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
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
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
    frog.body.y = mouseY;
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

/**
 * Handles the tongue overlapping the fly
 */
function checkBodyFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.body.x, frog.body.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.body.size / 2 + fly.size / 2);

    if (eaten) {
        // Reset the fly
        gameState = "gameover";
        // Bring back the tongue
        //adds to the score
        score += 100;
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
