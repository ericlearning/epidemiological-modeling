// plot configurations
const margin = 10;
const eps = 0.000001;
const dx = 0.1;

// utility variables
let x_min = -3.1415 * 2;
let x_max = 3.1415 * 2;
let y_min = -1;
let y_max = 1;


let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(0.0, 2.0, 1.0, 0.01);
  slider.position(10, 10);
  slider.style('width', '200px');
}

function transform_coords(x, y){
  let new_x = map(x, x_min, x_max, 0, width);
  let new_y = map(y, y_min, y_max, 0, height);
  return [new_x, new_y];
}

function draw() {
  background(0);
  let c = slider.value();

  let points = [];
  for(let i=x_min; i<=x_max+eps; i+=dx){
    let cur_y = f1(i, c);
    points.push([i, cur_y]);
  }
  
  stroke(255);
  strokeWeight(4);

  noFill();
  beginShape();
  for(let i=0; i<points.length; i++){
    let x = points[i][0];
    let y = points[i][1];
    [x, y] = transform_coords(x, y);
    vertex(x, y);
  }
  endShape();
}

function f1(x, c){
  return sin(x) * c;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}