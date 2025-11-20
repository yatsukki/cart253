/**
 * Flying frogs
 * Kerven Laurent 
 * A game where you need to avoid flying frogs as long as possible
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Don't let the evil ass flying frogs touch you or you die, I think
 * 
 * 
 * Music made my Dummy cat(game music & menu music), and Mellorine(instructions menu music) on Soundcloud!!
 * 
 * 
 * Made with p5
 * https://p5js.org/
 */


//for the sake of making things easier for myself i will keep the same name functions


"use strict";
//back button states
let backbuttonCurrent;
let backbuttonHover;
let backbuttonDefault;
//instruction button states
let instructionsDefault;
let instructionsCurrent;
let instructionsHover;
//Start game button states
let startbuttonCurrent;
let startbuttonHover;
let startbuttonDefault;

//menu select sounds
let selectSoundSelect;
let selectSoundBack;
let selectSoundStart;
//custom cursor

let customCursor;


//camping tracker
let playerLastY = 0;
let timeSpentInSameY = 0;
let yTolerance = 10; 

let froggy;
let instructionMusic;
let startbutton;
let minions;
let gameoverSound;
let gameoverScreen;
let score = 0;
let gameMusic;
let menuMusic;
let gameState = "menu" 
let font1;
let font2;
let titleImage;
let mountains;
let clouds = [
  { x: 100, y: 80, speed: undefined }, //cloud 1
  { x: 300, y: 120, speed: undefined }, // cloud 2
  { x: 500, y: 60, speed: undefined } //cloud 3
];


//preloads the font and music
function preload() {
    //back buttons
    backbuttonHover = loadImage ('assets/images/backhover.png')
    backbuttonDefault = loadImage ('assets/images/backbutton.png');
    //instructions buttons
    instructionsHover = loadImage ('assets/images/instructionshover.png');
    instructionsDefault = loadImage ('assets/images/instructionsbutton.png');
    //start game buttons
    startbuttonDefault = loadImage ('assets/images/startgamebutton.png');
    startbuttonHover = loadImage ('assets/images/startgamehover.png');
    //loading menu selection sounds
    selectSoundSelect = loadSound ('assets/sounds/select1.wav');
    selectSoundBack = loadSound ('assets/sounds/select2.wav');
    selectSoundStart = loadSound ('assets/sounds/select3.wav');

    frogCamper.image = loadImage ('assets/images/deeznuts.gif');
    customCursor = loadImage ('assets/images/hand_point.png');
    froggy = loadImage ('assets/images/frog.gif');
    font1 = loadFont('assets/fonts/CookieRunBlack.otf');
    font2 = loadFont ('assets/fonts/DarumadropOne-Regular.ttf');
    menuMusic = loadSound ('assets/sounds/dummycat.mp3');   
    gameMusic = loadSound ('assets/sounds/dummycat2.mp3');
    gameoverSound = loadSound ('assets/sounds/gameover.mp3');
    gameoverScreen = loadImage ('assets/images/gameover.png');
    fastEnemy.image = loadImage ('assets/images/evilassminions.jpg');
    slowEnemy.image = loadImage ('assets/images/67frog.gif');
    titleImage = loadImage ('assets/images/Title.png');
    mountains = loadImage ('assets/images/mountains.png');
    instructionMusic = loadSound ('assets/sounds/instructions.mp3')
}

//drawing the cloud
function drawCloud(x, y) {  
push();
  noStroke();
  fill(255, 255, 255, 220); 
  ellipse(x, y, 90, 50);
  pop();
}


const sky = {
    color: "#4dd1ff",
}

//selection audios are too damn loud
const volume ={
    select: 0.5, 
}

//Making enemies
const frogCamper = {
    image: undefined,
    width: 70,
    height: 60,
    x:0,
    y:0,
    speed: 5,

}



const slowEnemy= {
    width: 200,
    height: 140,
    x:0,
    y:0,
    speed: 12,
    image: undefined,
};

const fastEnemy= {
    width: 70,
    height: 70,
    x:0,
    y:0,
    speed: 14,
    image: undefined,
};

//array of enemies
let enemies = [
    slowEnemy,
    fastEnemy
];

const button1 = {
    x: 245,
    y: 265,
    height: 64,
    width: 155,
    color: "rgba(255,255,255,0)", //color for debug
    x2: 245,
    y2: 350,
    x3:430, 
    y3:385,
};


//styling the menu
function showMenu () {
    mouseHover();
    //stops instruction music
    if (instructionMusic.isPlaying()) {
        instructionMusic.stop();
    }


    background(sky.color);
    //floating cloud behind title
    push();
    noStroke();
    fill("#ffffff");  
    ellipse(470, 10 * sin(frameCount * 0.03) + 90, 40, 20);
    pop();


    //button area 1
    push();
    noStroke();
    fill(button1.color);
    rect(button1.x ,button1.y , button1.width, button1.height)
    pop();
    //button1 image
    push();
    imageMode(CORNER);
    image (startbuttonCurrent, button1.x ,button1.y  ,button1.width, button1.height)
    pop();

    //button area 2
    push();
    noStroke();
    fill(button1.color);
    rect(button1.x2 ,button1.y2 , button1.width, button1.height)
    pop();
    //button2 image
    push();
    imageMode(CORNER);
    image (instructionsCurrent, button1.x2 ,button1.y2  ,button1.width, button1.height)
    pop();

    imageMode (CENTER);
    image(titleImage, width / 2, 7 * sin(frameCount * 0.01) + 150, 358, 225); //image title
    imageMode (CORNERS);
    image(mountains, 0, height / 1.7, width, height);
    //Resets image mode
    imageMode (CORNER);
    //floating cloud
    push();
    noStroke();
    fill("#ffffff");
    ellipse(170, 10 * sin(frameCount * 0.02) + 185, 90, 40);
    pop();
    
}


// instructions/lore I guess

function showInstructions(){
    mouseHover();
    background(sky.color);
    //floating cloud
    textAlign(LEFT);
    push();
    noStroke();
    fill("#ffffff");
    ellipse(550, 10 * sin(frameCount * 0.02) + 330, 60, 35);
    ellipse(570, 10 * sin(frameCount * 0.02) + 310, 60, 35);
    pop();
    //mountain image
    image (mountains, 400, height / 1.7, width, 200);
    //floating cloud

    push();
    noStroke();
    fill("#ffffff");
    ellipse(430, 10 * sin(frameCount * 0.015) + 380, 60, 35);
    pop();

    textFont(font2);
    textSize(43);
    fill("#fdffee")
    text('Instructions', 40, 65,);
    textSize(25);
    textWrap(WORD);
    text('Froginton the evil frog king sent out his minions to capture you! Unfortunately your capture is inevitable...lol\n \n' +
  'Avoid the minions as long as you can by moving around with your mouse!\n \n'  +
  'Good luck froggy',
  40, 140, 390);
  textFont('sans-serif');
  text('🐸!', 234, 402, 390)
    //back button

    //debug
    push();
    noStroke();
    fill(button1.color)
    rect(430, 385, button1.width, button1.height)
    pop();
    //button image
    image (backbuttonCurrent, button1.x3, button1.y3, button1.width, button1.height)


    //stops game music and start instruction music

    if (gameMusic.isPlaying() || menuMusic.isPlaying()){
        gameMusic.stop();
        menuMusic.stop();
               
    }
    else if (gameState === "instructions" && !instructionMusic.isPlaying()) {
    instructionMusic.loop();
}

}


//Game over screen
function showGameOver(){
    
    image(gameoverScreen, 0, 0, 640, 480);
    textAlign(CENTER);
    textFont(font1);
    textSize(32);
    fill("#ff0000ff");
    //mock the player if they score lower than 4
    if (score < 4) {
      text("GAME OVER YOU SUCK HAHAHAHAHAHAH \n" +"Score : "+ score, width/2, height/2 - 20);  
      textSize(20);
      text ("Click to restart \n Press Q to return to menu",width/2, height/2 + 60)
    }

    else{
    text("GAME OVER", width/2, height/2 - 20);
    text("Score : "+ score, width/2, height/2 + 15)
    textSize(20);
    text("Click to Restart", width/2, height/2 + 60);    
    text("Press Q to return to main menu", width/2, height/2 + 90); 
    gameState = "gameover";}

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
    frogCamperActive = false;
    frogCamper.x = -100;
    frogCamper.y = 0;
    timeSpentInSameY = 0;

}
//Displays tip to player to press Q to quit at the top left of the screen
function gameTip () {
    push();
    fill("#fdffee")
    textFont(font1);
    textAlign(LEFT);
    textSize(15);
    text('PRESS Q TO QUIT', 30, 40);
    text('Time alive : '+ score +' seconds', 30, 60)
    pop();
}


// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 60
    },
    // The frog's tongue has a position, size, speed, and state
   

      
   
};

// Our fly
// Has a position, size, and speed of horizontal movement
let fly;



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

//stops gameover audio immediately
if (gameoverSound.isPlaying()) {
    gameoverSound.stop();
  }


}


/**
 * Creates the canvas and initializes the fly
 */

function setup() {
    
    createCanvas(640, 480);
    fly = random(enemies);
    playerLastY = frog.body.y;
    timeSpentInSameY = 0;
    

    backbuttonCurrent = backbuttonDefault;
    instructionsCurrent = instructionsDefault;
    startbuttonCurrent = startbuttonDefault;


    // Give the fly its first random position
    resetFly();

    for (let s of clouds){
        s.speed = random(7, 10);
    }
//applying custom cursor
    if (gameState === "menu") {
        menuMusic.isPlaying
    }
}


let hasPlayedGameOverSound = false;


//camping killer


function trackPlayerMovement() {
  if (abs(frog.body.y - playerLastY) < yTolerance) {
      timeSpentInSameY++;
  } else {
      timeSpentInSameY = 0;
  }

  playerLastY = frog.body.y;
}

let frogCamperActive = false;

function activateFrogCamper() {
    frogCamperActive = true;
    frogCamper.x = -100; 
    frogCamper.y = frog.body.y; 
}

function moveFrogCamper() {
    frogCamper.x += frogCamper.speed;

    // If it goes offscreen, reset
    if (frogCamper.x > width + 100) {
        frogCamperActive = false;
        frogCamper.x = -100;
        timeSpentInSameY = 0; // reset camping timer
    }
}

function drawFrogCamper() {
    image(frogCamper.image, frogCamper.x, frogCamper.y, frogCamper.width, frogCamper.height);
}

//fires up the menu
function draw() {
    background(sky.color);

    if (gameState === "menu"|| gameState === "instructions") {
    cursor('assets/images/hand_point.png');
  } else if (gameState === "game") {
    noCursor();
  } else {
    cursor();
  }



    if (gameState === "menu") {
        if (!menuMusic.isPlaying()) {
            menuMusic.loop()
        }
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

    else if (gameState === "instructions"){
        showInstructions();

        return;
    }

    

    //hides cursor during gameplay so we can actually see the stupid frog
    if (gameState === "game"){
        noCursor();

        
    } 
    else {
        cursor();
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
    

    trackPlayerMovement();

    if (timeSpentInSameY > 100 && !frogCamperActive) { //seconds before camper killer activates
    activateFrogCamper();
}
    moveFly();

    if (frogCamperActive) {
    moveFrogCamper();
    drawFrogCamper();
}


    drawFly();
    moveFrog();
    drawFrog();
    checkFrogCamperOverlap();
    checkBodyFlyOverlap();
    gameTip();
}

//hover function
function mouseHover(){
    //hover for back button in instructions
    if (gameState === "instructions" && mouseX > button1.x3 && mouseX < button1.x3 +button1.width && mouseY > button1.y3 && mouseY < button1.y3 + button1.height) {
        backbuttonCurrent = backbuttonHover;
        
    }
   else {
    backbuttonCurrent = backbuttonDefault;
   }
   //hover for instructions button in menu
   if (gameState === "menu" && mouseX > button1.x2 && mouseX < button1.x2 +button1.width && mouseY > button1.y2 && mouseY < button1.y2 + button1.height){
    instructionsCurrent = instructionsHover;
   }
   else {
    instructionsCurrent = instructionsDefault
   }
    //hover for start game button in menu
    if (gameState === "menu" && mouseX > button1.x && mouseX < button1.x +button1.width && mouseY > button1.y && mouseY < button1.y + button1.height){
        startbuttonCurrent = startbuttonHover;
       }
         else {
           startbuttonCurrent = startbuttonDefault;
       }

}


function mousePressed (){
    if (gameState === "gameover") {
        //stops stupid screaming audio if game is restarted
        if (gameoverSound.isPlaying()) {
        gameoverSound.stop();
        }
        startGame();
        return;
    }
    //start game button on menu
    else if (gameState === "menu" && mouseX > button1.x && mouseX < button1.x +button1.width && mouseY > button1.y && mouseY < button1.y + button1.height) {
        startGame();
        selectSoundStart.setVolume(volume.select);
        selectSoundStart.play();
    }
    //instructions button on menu
    else if (gameState === "menu" && mouseX > button1.x2 && mouseX < button1.x2 +button1.width && mouseY > button1.y2 && mouseY < button1.y2 + button1.height) {
        gameState = "instructions";

        selectSoundSelect.setVolume(volume.select);
        selectSoundSelect.play();
    }


    //back button inside instruction
    else if (gameState === "instructions" && mouseX > button1.x3 && mouseX < button1.x3 +button1.width && mouseY > button1.y3 && mouseY < button1.y3 + button1.height) {
        selectSoundBack.setVolume(volume.select);
        selectSoundBack.play();
        gameState = "menu"; 
        
    }




}






/**
 * Draws the fly 
*/
function drawFly() {
    if (fly === slowEnemy) {
        image(fly.image, fly.x, fly.y, fly.width, fly.height); // slow enemy custom size
    } else if (fly === fastEnemy) {
        image(fly.image, fly.x, fly.y, fly.width, fly.height); // fast enemy custom size
    }
}
   


/**
 * Resets the fly to the left with a random y
*/
function resetFly() {
    fly = random(enemies);
    if (fly === fastEnemy) {
        fly.x = -80;
    }
    else if (fly === slowEnemy) {
        fly.x = -180;
    }
    
    fly.baseY = random(100, height - 100); // store base position
}

function resetFrogcamper() {
    frogCamper.x = -80;
    frogCamperActive = false;
}




/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {

    let amplitude = 100;
    if (fly === slowEnemy) {amplitude = 250}
        else if (fly === fastEnemy){amplitude =100}
    let speed= 0.05; 
    let verticalOffset = sin(frameCount * speed) * amplitude;
    // Move the fly
    frogCamper.x += frogCamper.speed;
    fly.x += fly.speed;
     fly.y = fly.baseY + verticalOffset;

    // Handle the fly going off the canvas
    if (fly.x > width + 100) { // +100 adds a small buffer
    resetFly();
}


if (frogCamperActive) {
    moveFrogCamper();
}
if (frogCamper.x > width) {
    resetFrogcamper();
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
   image(froggy, frog.body.x-20, frog.body.y-30, frog.body.size, frog.body.size)
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

function checkFrogCamperOverlap() {
    const camperCenterX = frogCamper.x + frogCamper.width / 2;
    const camperCenterY = frogCamper.y + frogCamper.height / 2;
    const d = dist(frog.body.x, frog.body.y, camperCenterX, camperCenterY);

    if (d < frog.body.size / 2 + frogCamper.width / 2 && frogCamperActive) {
        gameState = "gameover";
    }
}


function checkBodyFlyOverlap() {
    // Calculate the center of the fly
    const flyCenterX = fly.x + fly.width / 2; // half of the drawn width
    const flyCenterY = fly.y + fly.height / 2; // half of the drawn height

    // Get distance from frog body to fly center
    const d = dist(frog.body.x, frog.body.y, flyCenterX, flyCenterY);

    // Check if circles overlap (frog’s circle vs fly’s approximate circle)
    const eaten = (d < frog.body.size / 2 + (fly.width-70) / 2); 

    if (eaten) {
        gameState = "gameover";
    }
}

//event listener so people don't cheat
window.addEventListener("blur", function() {
    if (gameState === "game") {
        gameMusic.stop();
        gameState = "gameover";
        hasPlayedGameOverSound = false;
    }
});

