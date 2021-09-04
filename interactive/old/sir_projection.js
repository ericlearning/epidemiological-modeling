// plotting parameters
let plt;
let sliders;
let checkbox;
let h = 0.1;
let N = 20000.0;
let useFixedN = true;
let colors = [[0, 0, 255], [255, 0, 0], [0, 255, 0]];

// t, solution, and predictions
let t, gt, rk;

// ODE of the projection model
let model = new SIR(0.7, 0.2);

// setup the visualizations for the analyses
function setup() {
    createCanvas(500, 500);

    [sliders, init] = sliderInit([[0, N, N - 2000], [0, N, 2000], [0, N, 0]]);
    checkbox = checkboxInit(sliders[0], fixedN);

    args = [];
    [t, rk] = run_analysis(model.interact, init, args, h = h);
    points = generatePointsMulti(t, rk, sliders.length);

    plt = new GPlot(this, 0, 0, width, height);
    plt.setTitleText("SIR Model");
    plt.getXAxis().setAxisLabelText("Time (days)");
    plt.getYAxis().setAxisLabelText("Population");
    plt.setYLim(-2000.0, 26000.0);
    addLayers(plt, ["S", "I", "R"], points, colors);
}

// draw the plot and update them based on slider value
function draw() {
    if (JSON.stringify(init) != JSON.stringify(getSliderValues(sliders))) {
        init = getSliderValues(sliders);
        args = [];
        [t, rk] = run_analysis(model.interact, init, args, h = h);
        points = generatePointsMulti(t, rk, sliders.length);
        setLayers(plt, ["S", "I", "R"], points);
    }

    let realN = init.reduce((a, b) => a + b, 0);
    if (realN != N && useFixedN) {
        let diff = (N - realN) / init.length;
        for (let i = 0; i < sliders.length; i++) {
            sliders[i].value(init[i] + diff);
        }
        realN = N;
    }

    drawPlot(plt);
    drawUI(sliders, ["Susceptible", "Infected", "Recovered"],
        checkbox, realN, colors);
}