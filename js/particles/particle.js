class Particle{
    constructor(x, y, i){
        this.pos = createVector(x,y);
        this.acc = createVector(0,0);
        this.vel = createVector(0,0);
        this.r = 2;
        this.col = color(255,50);
        this.mass = 200;
        this.idx = i;
        this.connected = [];
    }

    display(){
        noStroke();
        fill(this.col);
        ellipse(this.pos.x, this.pos.y, this.r*2);
        
        if(this.connected.length > 1){
            for(let i = 0; i < this.connected.length; i++){
                strokeWeight(0.5);
                stroke(255,50);
                line(this.connected[i].pos.x,this.connected[i].pos.y,this.pos.x,this.pos.y);
            }
        }
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.x*= 0.889;
        this.vel.y*= 0.899;
        this.acc.x*= 0.99;
        this.acc.y*= 0.99;

        this.acc.x += random(-0.01,0.01);
        this.acc.y += random(-0.01,0.01);
        
    }

    applyForce(mousePos){
        let dir = p5.Vector.sub(mousePos, this.pos);
        dir.normalize();
        let f = p5.Vector.div(dir, this.mass);
        this.acc.add(f);
    }

    checkEdge(){
        if (this.pos.x > width) {
            this.pos.x = width;
            this.vel.x *= -1;
          } else if (this.pos.x < 0) {
            this.vel.x *= -1;
            this.pos.x = 0;
          }

        if (this.pos.y > height) {
            this.vel.y *= -1;
            this.pos.y = height;
          }else if (this.pos.y < 0) {
            this.vel.y *= -1;
            this.pos.y = 0;
          }

    };

    connectNearParticles(){
        for(let i = 0; i < particles.length; i++){
            if(i != this.idx){
                let dist = this.pos.dist(particles[i].pos);

                let alreadyConnected = false;
                for(var j = 0; j < this.connected.length; j++){
                    if(this.connected[j] == particles[i]){
                        if(dist > maxDist){
                            this.connected.splice(j,1);
                        }
                        alreadyConnected = true;
                    };
                }//end of j loop

                if(!alreadyConnected){
                    if(dist < maxDist){
                        this.connected.push(particles[i]);
                    }
                }
            }
        }
    }
}