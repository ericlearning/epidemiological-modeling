let plt;
let slider;
let slider_value;
let points = [];
let x_min = -2;
let x_max = 2;
const eps = 1e-7;

function f(x, c) {
  return sin(x) * c;
}

function generatePoints(f, h, c) {
  let p = [];
  for (let i = x_min; i <= x_max + eps; i += h) {
    p.push(new GPoint(i, f(i, c)))
  }
  return p
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(-2.0, 2.0, 1.0, 0)
  slider_value = slider.value();
  points = generatePoints(f, 0.1, slider_value);

  plt = new GPlot(this, 0, 0, width, height);
  plt.setPoints(points);
  plt.getXAxis().setAxisLabelText("this is x");
  plt.getYAxis().setAxisLabelText("this is y");
  plt.setTitleText("this is title");
  plt.setYLim(-2, 2);
}

function draw() {
  if(slider_value != slider.value()){
    slider_value = slider.value();
    points = generatePoints(f, 0.1, slider_value);
    plt.setPoints(points);
  }

  background(255);
  plt.beginDraw();
  plt.drawBackground();
  plt.drawBox();
  plt.drawXAxis();
  plt.drawYAxis();
  plt.drawTopAxis();
  plt.drawRightAxis();
  plt.drawTitle();
  plt.drawPoints();
  plt.endDraw();
}