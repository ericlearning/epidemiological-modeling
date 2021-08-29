let m1 = $M([
    [1, 2, 3],
    [4, 5, 6],
]);
  
let m2 = $M([
    [2, -1, 7],
    [3, 1, 9],
    [0, 3, 4]
]);



function rungekutta(f, y0, ts, args) {
    let temp, temp2;
    let ys = [y0];
    let n = ts.length;
    for (let i = 0; i < n - 1; i++) {
        // yn_prev is a 1D array
        let yn_prev = ys[-1];
        let tn_prev = ts[i];
        let tn = ts[i + 1];
        let h = tn - tn_prev;

        // quite a mess; convert to sylvester later
        temp = yn_prev;
        temp2 = tn_prev;
        let k1 = h * yn_prev.map(y => f(temp, temp2, ...args));

        temp = arrayAdd(yn_prev, arrayDiv(k1, 2));
        temp2 = tn_prev + h / 2;
        let k2 = h * yn_prev.map(y => f(temp, temp2, ...args));

        temp = arrayAdd(yn_prev, arrayDiv(k2, 2));
        temp2 = tn_prev + h / 2;
        let k3 = h * yn_prev.map(y => f(temp, temp2, ...args));

        temp = arrayAdd(yn_prev, k3);
        temp2 = tn;
        let k4 = h * yn_prev.map(y => f(temp, temp2, ...args));

        let yn = []
        for (let j = 0; j < k1.length; j++) {
            let cur_yn = yn_prev[j] + (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]) / 6.0;
            yn.push(cur_yn);
        }
        ys.push([...yn]);
    }
    // array of length ts.length, with each element being 1D array
    return ys;
}

function fillMatrix(h, w, v){
    return Matrix.create(Array.from(Array(h), _ => Array(w).fill(v)));
}

function addElementWise(m, v){
    let m_d = m.dup();
    let dim = m.dimensions();
    let e = m_d.elements;
    for(var i=0; i<dim.rows; i++){
        for(var j=0; j<dim.cols; j++){
            e[i][j] += v;
        }
    }
    return m_d;
}

function multElementWise(m, v){
    let m_d = m.dup();
    let dim = m.dimensions();
    let e = m_d.elements;
    for(var i=0; i<dim.rows; i++){
        for(var j=0; j<dim.cols; j++){
            e[i][j] *= v;
        }
    }
    return m_d;
}

function setup() {
    // print(m1)
    // print(m1.dimensions(), m1.dimensions().rows)
    // print(m1.minor(2, 2, 3, 2))
    // print(m1.dimensions().rows, m1.dimensions().cols)


    let c = m1.dup()
    let ele = c.elements
    for(var i=0; i<m1.dimensions().rows; i++){
        for(var j=0; j<m1.dimensions().cols; j++){
            ele[i][j] += 2;
        }
    }
    print(m1.inspect())
    print(c.inspect())
    // print(m2.inspect())
    // print(m1.multiply(m2).inspect())
    // print(Matrix.create(Array.from(Array(10), _ => Array(5).fill(-2))).inspect())
}