/**
 * Vertical circles
 * Pippin Barr
 * 
 * Draws a series of circles from the top to the bottom of the canvas.
 * Arguably not in the most efficient way.
 */

"use strict";

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw circles from the top to the bottom of the canvas
 */
function draw() {
    let black = 0
    background(black);
   
    let x =200;
    let y= 0;
    let diameter = 12;

    frameRate(1);
    while (y <= height){
        ellipse(x,y,diameter);
        y += diameter;
    }
    
}