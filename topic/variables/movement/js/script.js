/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";
let bird={
    x: 100,
    y: 500,
    size: 20,
    velocity: {
        x: 0,
        y: 0
    },
    minVelocity: {
        x: -5,
        y: -5
    },
    maxVelocity: {
        x: 5,
        y: 5
    },
    acceleration: {
        x: 0.2,
        y: -1
    }
}/**
 
*/
function setup() {
 createCanvas(500, 500);
}


function draw() {
    background(10);

    //draw bird
    push();
    fill(255, 255, 0);
    ellipse(bird.x, bird.y, bird.size);
    pop();
    //move bird
bird.velocity.x= bird.velocity.x + bird.acceleration.x;
bird.velocity.y= bird.velocity.y + bird.acceleration.y; 

//limit velocity
bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);

    bird.x= bird.x + bird.velocity.x;
    bird.y= bird.y + bird.velocity.y;

}