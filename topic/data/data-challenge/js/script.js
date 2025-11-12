/**
 * Terrible New Car
 * Kerven-laurent
 * 
 * A program to generate new car model names using dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let carData = undefined;
let dinosaurData = undefined;
let langData = undefined;
let lang = "fr";
let dinoData = undefined;
let dinoName = undefined;

// Starts with the instruction
let carName = "Click to generate a car name.";


/**
 * Load the car and dinosaur data
 */
function preload() {
    carData = loadJSON ('assets/data/cars.json');
    dinoData = loadJSON ('assets/data/dinosaurs.json');

}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 400);
}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background(0);

   

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(carName + dinoName, width / 2, height / 2);
    pop();
}

/**
 * Generate a new car name
 */
function mousePressed() {
    //chooses random car
const coolCar = random(carData.cars);
const randomDino = random(dinoData.dinosaurs);
    //randomizes dino and car name
carName = coolCar;
dinoName = randomDino;


}
