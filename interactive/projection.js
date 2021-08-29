// plotting parameters
let plt;
let slider;
let slider_value;
let x_min = -2;
let x_max = 2;
let rk_points;
const eps = 1e-7;

// t, solution, and predictions
let t, gt, rk;

// generate points for the plot given xs, ys
function generatePoints(xs, ys) {
    let p = [];
    for (let i = 0; i <= xs.length; i ++) {
        p.push(new GPoint(xs[i], ys[i]));
    }
    return p
}

// ODE of the projection model
let model = new SIR(0.7, 0.2);

// run rungekutta, return t, solution, and prediction
function run_analysis(f, init=[7.0], args=[12]) {
    // init: vector of shape N
    // f1, f1_sol: takes in a single element

    // rungekutta: applies f1 over each element of init
    //             to return Matrix of shape (T, N)

    init = Vector.create(init);

    let t_min = 0.0;
    let t_max = 10.0;
    let h = 0.1;
    let t = range(t_min, t_max, h)

    let rk = rungekutta(f, init, t, args);
    return [t, rk];
}

// setup the visualizations for the analyses
function setup() {
    createCanvas(500, 500);

    init_S = createSlider(0.0, 20000.0, 20000.0, 0)
    init_I = createSlider(0.0, 20000.0, 1.0, 0)
    init_R = createSlider(0.0, 20000.0, 0.0, 0)
    init = [init_S.value(), init_I.value(), init_R.value()];
    args = [];

    [t, rk] = run_analysis(model.interact, init, args);
    S_points = generatePoints(t, rk.col(1).elements);
    I_points = generatePoints(t, rk.col(2).elements);
    R_points = generatePoints(t, rk.col(3).elements);

    plt = new GPlot(this, 0, 0, width, height);
    plt.addLayer("S", S_points);
    plt.getLayer("S").setPointColor(color(0, 0, 255));
    plt.addLayer("I", I_points);
    plt.getLayer("I").setPointColor(color(255, 0, 0));
    plt.addLayer("R", R_points);
    plt.getLayer("R").setPointColor(color(0, 255, 0));
    plt.getXAxis().setAxisLabelText("this is x");
    plt.getYAxis().setAxisLabelText("this is y");
    plt.setTitleText("this is title");
    //plt.setYLim(-5.0, 15.0);
}

// draw the plot and update them based on slider value
function draw() {
    if (init[0] != init_S.value() || init[1] != init_I.value() || init[2] != init_R.value()) {
        init = [init_S.value(), init_I.value(), init_R.value()];
        args = [];

        [t, rk] = run_analysis(model.interact, init, args);
        S_points = generatePoints(t, rk.col(1).elements);
        I_points = generatePoints(t, rk.col(2).elements);
        R_points = generatePoints(t, rk.col(3).elements);

        plt.getLayer("S").setPoints(S_points);
        plt.getLayer("I").setPoints(I_points);
        plt.getLayer("R").setPoints(R_points);
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