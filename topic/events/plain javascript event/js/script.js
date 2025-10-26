/**
 * Title of Project
 * Author Name
 * 
 * experimenting with event handling
 */

"use strict";

//background color
const bg = {
    fill: "#000000",
    fills: {
        black: "#000000",
        white: "#ffffff"
    },
    switchkey: 32 //spacebar

}


//creates canvas
function setup() {
    createCanvas (400, 400);
    //listen for keypress
    window.addEventListener ("keydown", changeBG);
}



function draw() {
    //creates background
    background (bg.fill);

}
//switches the bg from black to white
function changeBG (event) {
        if (event.keyCode === bg.switchkey) {

        if (bg.fill === bg.fills.black) {
            bg.fill = bg.fills.white;
        }
        else {
            bg.fill = bg.fills.black
        }
    }   
}