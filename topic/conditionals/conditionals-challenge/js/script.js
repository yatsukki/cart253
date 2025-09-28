/**
 * Title of Project
 * Kerven Laurent Casimir
 * 
 * Attempting the variables challenge
 */

"use strict";
/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
  x: 200,
  y: 200,
  size: 100,
  fill: "#ff0000",
  fills: {
    noOverlap: "#000000",
    overlap: "#22ff00ff"
    }
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000"
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser();
  
  // Draw the user and puck
  drawUser();
  drawPuck();
  //Checking the overlap
  //calculate distance between the circles

  const d = dist(user.x, user.y, puck.x, puck.y);
  //Check if distance is smaller than their 2 radiuses
  const overlap = (d < puck.size/2 + user.size/2);
  //changing colors upon overlapping
  if (overlap) {
    puck.fill = puck.fills.overlap;
  }
  else {
    puck.fill = puck.fills.noOverlap;
  }
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

function movePuck() {

}