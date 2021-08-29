const margin = 10;
const eps = 0.000001;
let dx = 0.1;
let x_min = 0;
let x_max = 3.1415 * 2;
let y_min = 99999;
let y_max = -99999;

let points = [];

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(0);
  for(let i=x_min; i<=x_max+eps; i+=dx){
    let cur_y = f1(i);
    points.push([i, cur_y]);
    y_min = min(cur_y, y_min);
    y_max = max(cur_y, y_max);
  }
  
  stroke(255);
  strokeWeight(4);
  for(let i=0; i<points.length; i++){
    let x = points[i][0];
    let y = points[i][1];
    x = map(x, x_min, x_max, margin, width-margin);
    y = map(y, y_min, y_max, margin, height-margin);
    point(x, y);
  }
}

function f1(x){
  return sin(x);
}