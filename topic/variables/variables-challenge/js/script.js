/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  }
};
//Shade to fill the sky
let skyshade = {
    r: 40,
    g: 100,
    b: 255
  }
;
let bird = {
    x:100,
    y:100,
    size: 50,
//adding velocity to the bird
    
}


//}
/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(0, 40, 80);
//making mrFurious red
  mrFurious.fill.b = mrFurious.fill.b - 1;
  mrFurious.fill.g = mrFurious.fill.g - 1;
//sky goes white
background (skyshade.r, skyshade.g, skyshade.b);
skyshade.r = skyshade.r - 1;
skyshade.g = skyshade.g -1;
skyshade.b = skyshade.b -1;

//draw da burd
ellipse (bird.x ,bird.y, bird.size);
//making the bird move
    bird.x = bird.x + 1;
    bird.y = bird.y - 2;
  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();
}

