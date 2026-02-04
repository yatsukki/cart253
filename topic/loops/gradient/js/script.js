/**
 * gradient
 * Kerven
 * 
 * Drawing a gradient 
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
createCanvas(600, 300);

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/

//draw the gradient
function draw() {
    background(0);



    let y = 0;
    randomSeed(1)
    for (let x =0; x<=width; x+=1){
        const shade = map(x, 0, width, 0,255)

        push();
        stroke(shade);
        line(x, y, x, height);
        pop();

        y += random (0, 2)
    }
   

}


//draws random star

