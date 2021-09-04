// plotting parameters
let plt;
let slider;
let slider_value;
let checkbox;
let x_min = -2;
let x_max = 2;
let rk_points;
let h = 0.1;
let N = 20000.0;
let useFixedN = true;
let checkboxElement;
const eps = 1e-7;

// t, solution, and predictions
let t, gt, rk;

// generate points for the plot given xs, ys
function generatePoints(xs, ys) {
    let p = [];
    for (let i = 0; i <= xs.length; i++) {
        p.push(new GPoint(xs[i], ys[i]));
    }
    return p
}

// ODE of the projection model
let model = new SIR(0.7, 0.2);

// setup the visualizations for the analyses
function setup() {
    createCanvas(500, 500);

    init_S = createSlider(0, N, N - 2000, 0)
    init_I = createSlider(0, N, 2000, 0)
    init_R = createSlider(0, N, 0, 0)

    init_S.position(80, 50);
    init_I.position(80, 70);
    init_R.position(80, 90);

    init_S.style('width', '150px');
    init_I.style('width', '150px');
    init_R.style('width', '150px');

    checkbox = createCheckbox('', true);
    checkbox.changed(fixedN);
    checkbox.position(init_S.x + init_S.width + 120, init_S.y + 2);

    init = [init_S.value(), init_I.value(), init_R.value()];
    args = [];

    [t, rk] = run_analysis(model.interact, init, args, h = h);
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
    plt.getXAxis().setAxisLabelText("Time (days)");
    plt.getYAxis().setAxisLabelText("Population");
    plt.setTitleText("SIR Model");
    plt.setYLim(-2000.0, 26000.0);
}

function fixedN() {
    useFixedN = this.checked();
}

// draw the plot and update them based on slider value
function draw() {
    if (init[0] != init_S.value() || init[1] != init_I.value() || init[2] != init_R.value()) {
        init = [init_S.value(), init_I.value(), init_R.value()];
        args = [];

        [t, rk] = run_analysis(model.interact, init, args, h = h);
        S_points = generatePoints(t, rk.col(1).elements);
        I_points = generatePoints(t, rk.col(2).elements);
        R_points = generatePoints(t, rk.col(3).elements);

        plt.getLayer("S").setPoints(S_points);
        plt.getLayer("I").setPoints(I_points);
        plt.getLayer("R").setPoints(R_points);
    }

    let realN = init[0] + init[1] + init[2];
    if (realN != N && useFixedN) {
        let diff = (N - realN) / init.length;
        init_S.value(init[0] + diff);
        init_I.value(init[1] + diff);
        init_R.value(init[2] + diff);
        realN = N;
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

    fill(0);
    textSize(14);
    text('Susceptible', init_S.x + init_S.width + 25, init_S.y + 17)
    text('Infected', init_I.x + init_I.width + 25, init_I.y + 17)
    text('Recovered', init_R.x + init_R.width + 25, init_R.y + 17)
    text('Fixed N', checkbox.x + 27, init_S.y + 17)

    textSize(12);
    text('People', checkbox.x + 73, init_S.y + 47)

    textSize(23);
    text(Math.round(realN), checkbox.x + 5, init_S.y + 47)

    fill(0, 0, 255);
    circle(init_S.x + init_S.width + 14, init_S.y + 12, 10);
    fill(255, 0, 0);
    circle(init_I.x + init_I.width + 14, init_I.y + 12, 10);
    fill(0, 255, 0);
    circle(init_R.x + init_R.width + 14, init_R.y + 12, 10);

}