/**
 * circle thing that pops up when clicking
 * Kerven
 * 
 *
 */

"use strict";

/**
 * 
*/
function setup() {
    createCanvas ( 500, 500);
    background ("#d4f9ffff")

}


/**
 * does nothing
*/
function draw() {

}

function mousePressed () {
    push();
    noStroke;
    fill ("#993f2f");
    ellipse (mouseX+50, mouseY, 50);
    pop();
}