/**
 * 4-Matrix-Exercise.js - code for workbook 4 page 4
 * provides a non-working example for students to edit
 *
 * written by Michael Gleicher, January 2019
 * modified by Florian Heimerl, September 2019
 *
 */

// see other files for explanation of these comments
 // @ts-check
/* jshint -W069, esversion:6 */

/**
 * If you want to read up on JavaScript classes, check out your favorite book or...
 * the chapter in the Exploring JS book: http://exploringjs.com/es6/ch_classes.html
 * 
 */
class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     * @param {String} color
     * @param {number} tHit
     */
    constructor(x,y,vx=1,vy=0,color = "black", tHit=0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.tHit = tHit;
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        let angle = Math.atan2(this.vy,this.vx);
        context.save();
        context.fillStyle = this.color;
        context.translate(this.x, this.y);
        context.rotate(angle+Math.PI*0.5);
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(3,10);
        context.lineTo(0,8);
        context.lineTo(-3,10);
        context.fill();
        //context.fillRect(-5,-5,10,10);
        context.restore();
    }
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock) {
		
		// Note - this sample behavior is just to help you understand
		// what a steering function might  do
		// all this one does is have things go in circles, rather than
		// straight lines
		// Something this simple would not count for the bonus points:
		// a "real" steering behavior must consider other boids,
		// or at least obstacles.
		
        // a simple steering behavior: 
        // create a rotation matrix that turns by a small amount
        // 2 degrees per time step
        // const angle = 2 * Math.PI / 180;
        // const s = Math.sin(angle);
        // const c = Math.cos(angle);

        // let ovx = this.vx;
        // let ovy = this.vy;

        // this.vx =  ovx * c + ovy * s;
        // this.vy = -ovx * s + ovy * c;

        let currX = this.x;
        let currY = this.y;
        let currVX = this.vx;
        let currVY = this.vy;
        let currT = this.tHit;

              //loop through all other broids to check for collision
            flock.forEach(function(boid2) {
                // //if they are in close proximity
                
                 let distance = Math.sqrt( Math.pow(boid2.y-currY,2) + Math.pow(boid2.x-currX,2) )
                 //console.log(distance);
                  if(distance<5&&distance>0 ){
                      //console.log("hit");
                    currT = performance.now();
                    let x2 = boid2.x;
                    let y2 = boid2.y;
                    let vx2 = boid2.vx;
                    let vy2 = boid2.vy;
                    //let normalAngle = Math.atan2(currX-x2,y2-currY);
                    let normalAngle = Math.atan2(y2-currY,x2-currX);
                    //normalAngle = Math.PI*0.5 - normalAngle;
                    //console.log(normalAngle*180/Math.PI);
                    //let v1Angle = Math.atan2(currVY,currVX);
                   // console.log(v1Angle*180/Math.PI);
                    //let newAngle = 2*normalAngle - v1Angle;
                   // console.log("new Angle: "+newAngle*180/Math.PI);
                   // let v2Angle = Math.atan2(vy2,vx2);
                    //let newAngle2 = 2* normalAngle - v2Angle;
                    let newAngle = -normalAngle;
                    let newAngle2 = normalAngle;
                    boid2.vx = Math.cos(newAngle2);
                    boid2.vy = Math.sin(newAngle2);
                    currVX = Math.cos(newAngle);
                    currVY = Math.sin(newAngle);


                  }

            } );
        
            this.vx = currVX;
            this.vy = currVY;
            this.tHit = currT;
            if(performance.now() - this.tHit < 100){
                this.color = "red";
             }else{
                this.color = "black";
             }
    }
}

window.onload = function() {
    /** @type Array<Boid> */
    let theBoids = [];

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
    let context = canvas.getContext("2d");

    //let speedSlider =/** @type {HTMLInputElement} */ (document.getElementById("speed"));
    let speedSlider =3;

    function draw() {
        context.clearRect(0,0,canvas.width,canvas.height);
        theBoids.forEach(boid => boid.draw(context));
    }

    /**
     * Create some initial boids
     * STUDENT: may want to replace this
     */
   // theBoids.push(new Boid(100,100));
   //theBoids.push(new Boid(200,200,-1,0));
    //theBoids.push(new Boid(300,300,0,-1));
    //theBoids.push(new Boid(400,400,0,1));

    /**
     * Handle the buttons
     */
    // document.getElementById("add").onclick = function () {
    //     // Students Fill This In
        let canvasH = canvas.height;
        let canvasW = canvas.width;
        for(let i = 0; i<10;i++){
            let posX = Math.random()*canvasW;
            let posY = Math.random()*canvasH;
            let angle = Math.random() * Math.PI * 2;
            let vx = Math.cos(angle);

            let vy = Math.sin(angle);

            theBoids.push(new Boid(posX,posY,vx,vy));
        }


    // };
    // document.getElementById("clear").onclick = function() {
    //     // Student Fill This In
    //     theBoids = [];
    // };


    /**
     * The Actual Execution
     */
    function loop() {
        // change directions
        theBoids.forEach(boid => boid.steer(theBoids));
        // move forward
        let speed = Number(3.0);
        theBoids.forEach(function(boid) {
            boid.x += boid.vx * speed;
            boid.y += boid.vy * speed;
        });
        // make sure that we stay on the screen
        theBoids.forEach(function(boid) {
            /**
             * Students should replace this with collision code
             */

             if(performance.now() - boid.tHit < 100*Number(speedSlider.value)){
                boid.color = "red";
             }else{
                boid.color = "black";
             }

            //left, right edge
            if(boid.x % canvas.width < 5){
                boid.vx = - boid.vx;
                boid.tHit = performance.now();
            }
            //top, bottom edge
            if(boid.y % canvas.height <5){
                boid.vy = - boid.vy;
                boid.tHit = performance.now();
            }
      

            

        });
        // now we can draw
        draw();
        // and loop
        window.requestAnimationFrame(loop);
    
    }
    loop();
};