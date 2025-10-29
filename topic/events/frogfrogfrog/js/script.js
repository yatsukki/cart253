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
    gameoverScreen = loadImage ('assets/images/gameover.png')
    minions = loadImage = loadImage ('assets/images/evilassminion.png')
}


//styling the menu
function showMenu () {
    background("#a8ffdbff");
    fill("#000000");
    textFont (font1);
    textAlign(CENTER, CENTER);
    textSize (32);
    text("Evil ass frog game", width / 2, height / 2 - 40);
    textSize(15);
    text("Click to Play", width / 2, height / 2);
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
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
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
//fires up the menu
function draw() {

    if (gameState === "menu") {
        showMenu();


        return;
    }
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    gameTip();
}

function mousePressed (){
    if (gameState === "menu") {
        startGame();
        return;
    }
        if (gameState === "game" && frog.tongue.state === "idle") {
    frog.tongue.state = "outbound";
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
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
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
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
            //diminishes the score
            score -= 100;
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        //adds to the score
        score += 100;
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
