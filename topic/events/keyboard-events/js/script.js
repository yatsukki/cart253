/**
 * Keyboard Events
 * Pippin Barr
 * 
 * A chance to experiment with keyboard events in a simple setting.
*/

"use strict";

// Our ball
const ball = {
    // Position
    x: 200,
    y: 200,
    // Size
    size: 50,
    // fill
    fill: "#ffffff",
    // fills
    fills: {
        white: "#ffffff",
        red: "#ff0000",
        blue: "#0000ff"
    },
    //keys to control the colors
    keys: {
        redKey: 82, //R
        blueKey: 66 //B
    }
}

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draws the ball
 */
function draw() {
    background(0);

    // Draw the ball
    push();
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.size);
    pop();
}
// ball turns red upon key being pressed
function keyPressed (event) {
    if (event.keyCode === ball.keys.redKey) {
        ball.fill = ball.fills.red
    }
    else if (event.keyCode === ball.keys.blueKey) {
        ball.fill = ball.fills.blue
    }
}
//ball reverts to white upon key being released
function keyReleased (event) {
    if (event.keyCode === ball.keys.redKey || ball.keys.blueKey) {
        ball.fill = ball.fills.white
    }
}