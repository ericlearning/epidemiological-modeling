function sliderInit(sliderInit) {
    let out = [];
    let initVal = [];
    for (let i = 0; i < sliderInit.length; i++) {
        let cur_slider = createSlider(sliderInit[i][0],
            sliderInit[i][1], sliderInit[i][2], 0);
        cur_slider.position(80, i * 20 + 50);
        cur_slider.style('width', '150px');
        out.push(cur_slider)
        initVal.push(sliderInit[i][2]);
    }
    return [out, initVal];
}

function generatePointsMulti(t, rk, N) {
    let out = [];
    for (i = 0; i < N; i++) {
        out.push(generatePoints(t, rk.col(i + 1).elements));
    }
    return out;
}

function addLayers(plt, layerNames, allPoints, colors) {
    for (i = 0; i < layerNames.length; i++) {
        plt.addLayer(layerNames[i], allPoints[i]);
        plt.getLayer(layerNames[i]).setPointColor(color(...colors[i]));
    }
}

function setLayers(plt, layerNames, allPoints) {
    for (i = 0; i < layerNames.length; i++) {
        plt.getLayer(layerNames[i]).setPoints(allPoints[i]);
    }
}

function getSliderValues(sliders) {
    let out = [];
    for (i = 0; i < sliders.length; i++) {
        out.push(sliders[i].value());
    }
    return out;
}

function checkboxInit(ref, f) {
    checkbox = createCheckbox('', true);
    checkbox.changed(f);
    checkbox.position(ref.x + ref.width + 120, ref.y + 2);
    return checkbox;
}

function drawPlot(plt) {
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

function fixedN() {
    useFixedN = this.checked();
}

function drawUI(sliders, sliderTexts, checkbox, realN, colors) {
    fill(0);
    textSize(14);
    for (let i = 0; i < sliders.length; i++) {
        text(sliderTexts[i], sliders[i].x + sliders[i].width + 25, sliders[i].y + 17);
    }
    text('Fixed N', checkbox.x + 27, sliders[0].y + 17)
    textSize(12);
    text('People', checkbox.x + 73, sliders[0].y + 47)
    textSize(23);
    text(Math.round(realN), checkbox.x + 5, sliders[0].y + 47)

    for (let i = 0; i < sliders.length; i++) {
        fill(...colors[i]);
        circle(sliders[i].x + sliders[i].width + 14, sliders[i].y + 12, 10);
    }
}