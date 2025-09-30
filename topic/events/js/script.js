const ball = {
    x: 0,
    y: 250,
    size: 50,
    fill: "#ffffff"
}

function setup() {
    createCanvas (500, 500);
}

function draw () {
    background(0);

    ball.x += 1;
    
    push();
    noStroke;
    fill(ball.fill);
    ellipse(ball.x, ball.y. ball.size);
    pop();
}