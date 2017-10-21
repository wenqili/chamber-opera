console.log("Scene No.1");


const particlesNum = 100;
const maxDist = 100;
let particles = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0,0,0);

    for(let i = 0; i < particlesNum; i++){
        particles.push(new Particle(random(width),random(height),i));
    }
}

function draw(){
    // clear();
    background(0,0,0,50);
    

    particles.forEach(function(element) {
        var e = element;
        e.connectNearParticles();
        e.checkEdge();
        e.update();
        e.display();
    }, this);
}

function mouseDragged(){
    particles.forEach(function(element) {
        let mousePos = createVector(mouseX, mouseY);
        element.applyForce(mousePos);
        // console.log(mousePos);
    }, this);
}


