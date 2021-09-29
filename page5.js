/**
 * page5.js - a simple JavaScript file that gets loaded with
 * page 5 of Workbook 2 (CS559)
 * 
 * started by Michael Gleicher, January 2019
 * modified by Florian Heimerl, August 2019
 * 
 * but filled in by STUDENT
 * 
 * Note: the student code should go into the functions
 * wb2_pg5_ex1 and wb2_pg5_ex2
 * 
 */

// we do enable typescript type checking - see
// http://graphics.cs.wisc.edu/WP/cs559-sp2019/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better 
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, esversion:6 */

/**
 * Function for the STUDENT to do exercise 1
 */
function wb2_pg5_ex1() 
{
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("ex1canvas"));
        let context = canvas.getContext('2d');

        let boxofcircles = [];

        let mouseX = -10;
        let mouseY = -10;
        
        //tracking the mouse movement
        canvas.onmousemove = function(event){
                mouseX = event.clientX;
                mouseY = event.clientY;
                let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
                mouseX -= box.left;
                mouseY -= box.top;
        };

        //tracking mouse click
        // document.getElementById("ex1canvas").onclick = function(){
        //        // console.log("click");
        // };

        function ex1animate(){
                context.clearRect(0,0,canvas.width,canvas.height);

                document.getElementById("ex1canvas").onclick = function(){
                        if((mouseX>0) && (mouseY>0) ){
                                boxofcircles.push({ "x":mouseX,"y":mouseY});
                        }
                 };

                 boxofcircles.forEach(function(dot){

                 });

                 boxofcircles.forEach(function(dot){
                        context.fillStyle = "#8888FF88";
                        //if the current circle in the loop is under the mouse
                        if(Math.sqrt( (mouseX - dot.x) *(mouseX - dot.x) + (mouseY - dot.y)*(mouseY - dot.y)) <10 ){
                                context.fillStyle = "#FF000088";
                        }
                         let circle = new Path2D();

                         circle.arc(dot.x, dot.y , 10, 0, Math.PI*2, true);
                         context.fill(circle);
                 });

                 window.requestAnimationFrame(ex1animate);
        }
        ex1animate();

}

/**
 * Function for the STUDENT to do exercise 1
 */
function wb2_pg5_ex2()
{
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("flock"));
        let context = canvas.getContext('2d');

        let boxofelements= [];

        let mouseX = -10;
        let mouseY = -10;
  

        //tracking the mouse movement
        canvas.onmousemove = function(event){
                mouseX = event.clientX;
                mouseY = event.clientY;
                let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();

                mouseX -= box.left;
                mouseY -= box.top;
        };
        //inspired by:
        //https://stackoverflow.com/questions/1484506/random-color-generator
        function getRandomColor() { 
                let letters = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
              }

        function fireworks(){
                context.clearRect(0,0,canvas.width,canvas.height);

                context.save();
                context.fillStyle = '#FFFFFF';
                context.fillRect(0,0,canvas.width,canvas.height);
                context.restore();

                document.getElementById("flock").onclick = function(){
                        if((mouseX>0) && (mouseY>0) ){
                                boxofelements.push({ "x":canvas.width/2,"y":canvas.height,"type":"circle","targetX":mouseX,"targetY":mouseY,"vx":0,"vy":0});

                        }
                 };

                 boxofelements.forEach(function(dot){
                        if(Math.abs(dot.targetX - dot.x) <2 && Math.abs(dot.targetY - dot.y) <2 &&dot.type == "circle"){//if the current circle reached its destination
                                dot.x = -10;
                                dot.y = -10;

                                let i;
                                //adding 10 sparks after the circle
                                let color = getRandomColor();
                                for(i=0;i<100;i++){
                                let vx = (Math.random()-0.5)*3;
                                let vy = (Math.random()-0.5)*3;

                                boxofelements.push({  "x":dot.targetX,"y":dot.targetY,"type":"square","targetX":0,"targetY":0,"vx":vx,"vy":vy ,"time":0, "color":color  });
                                }

                        }
                        //moving the circle towards its target
                        if(dot.type == "circle"){
                              //  let slope = (dot.targetY - box.left/2) / (dot.targetX - box.top) ;
                                let distance = Math.sqrt( (dot.targetX - canvas.width/2) * (dot.targetX - canvas.width/2) + (dot.targetY - canvas.height) * (dot.targetY - canvas.height));
                                let moves = distance/4;
                                
                                let dx = (dot.targetX - canvas.width/2)/moves;
                                let dy =  (dot.targetY - canvas.height)/moves;
                                //console.log(dx);
                                dot.x += dx;
                                dot.y += dy; 

                              

                                context.fillStyle = "#FFE600";
                                let circle = new Path2D();

                                circle.arc(dot.x, dot.y , 2, 0, Math.PI*2, true);
                                context.fill(circle);
                        }
                        if(dot.type == "square"){
                                dot.y -= dot.vy - dot.time/100;
                                dot.x -= dot.vx;
                                dot.time++;
                                let square = new Path2D();
                                context.fillStyle = dot.color;
                                square.rect(dot.x,dot.y,2,2);
                                context.fill(square);
                        }

                 });

                 boxofelements = boxofelements.filter(
                        // this defines a function using "arrow notation"
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
                        dot => ((dot.y>0)&&(dot.x>0)&&(dot.x<canvas.width)&&(dot.y<canvas.height))
                        );
                 window.requestAnimationFrame(fireworks);
        }
        fireworks();

}

/**
 * Function to run the student's code
 */
window.onload = function() {
    
    wb2_pg5_ex2();
};