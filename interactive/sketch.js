// plotting parameters
let plt;
let slider;
let slider_value;
let x_min = -2;
let x_max = 2;
let gt_points, eu_points, rk_points;
const eps = 1e-7;

// t, solution, and predictions
let t, gt, eu, rk;

// generate points for the plot given xs, ys
function generatePoints(xs, ys) {
    let p = [];
    for (let i = 0; i <= xs.length; i ++) {
        p.push(new GPoint(xs[i], ys[i]));
    }
    return p
}

// ODE and a known solution
function f1(y, t, n) {
    return n - y;
}

function f1_sol(t, n, init) {
    return (init - n) * exp(-t) + n;
}

// run rungekutta, return t, solution, and prediction
function run_analysis(init=[7.0], args=[12]) {
    // init: vector of shape N
    // f1, f1_sol: takes in a single element

    // rungekutta: applies f1 over each element of init
    //             to return Matrix of shape (T, N)
    // batchinf: same job as rungekutta, but just
    //            inference on f1_sol's elements

    init = Vector.create(init);

    let t_min = 0.0;
    let t_max = 10.0;
    let h = 0.1;
    let t = range(t_min, t_max, h)

    let gt = batchinf(f1_sol, init, t, args);
    let eu = euler(f1, init, t, args);
    let rk = rungekutta(f1, init, t, args);
    gt = gt.col(1).elements;
    eu = eu.col(1).elements;
    rk = rk.col(1).elements;
    return [t, gt, eu, rk];
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    init_slider = createSlider(-20.0, 20.0, 7.0, 0)
    args_slider = createSlider(-20.0, 20.0, 12.0, 0)
    init = [init_slider.value()];
    args = [args_slider.value()];

    [t, gt, eu, rk] = run_analysis(init, args);
    gt_points = generatePoints(t, gt);
    eu_points = generatePoints(t, eu);
    rk_points = generatePoints(t, rk);

    plt = new GPlot(this, 0, 0, width, height);
    plt.addLayer("gt_points", gt_points);
    plt.getLayer("gt_points").setPointColor(color(255, 0, 0));
    plt.addLayer("eu_points", eu_points);
    plt.getLayer("eu_points").setPointColor(color(0, 255, 0));
    plt.addLayer("rk_points", rk_points);
    plt.getLayer("rk_points").setPointColor(color(0, 0, 255));
    plt.getXAxis().setAxisLabelText("this is x");
    plt.getYAxis().setAxisLabelText("this is y");
    plt.setTitleText("this is title");
}

function draw() {
    if (init[0] != init_slider.value() || args[0] != args_slider.value()) {
        init = [init_slider.value()];
        args = [args_slider.value()];

        [t, gt, eu, rk] = run_analysis(init, args);
        gt_points = generatePoints(t, gt);
        eu_points = generatePoints(t, eu);
        rk_points = generatePoints(t, rk);

        plt.getLayer("gt_points").setPoints(gt_points);
        plt.getLayer("eu_points").setPoints(eu_points);
        plt.getLayer("rk_points").setPoints(rk_points);
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
    plt.drawLines();
    plt.endDraw();
}