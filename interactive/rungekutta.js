function rungekutta(f, y0, ts, args) {
    // f: function(y, t, ...args)
    // y0: vector of shape (N)
    // ts: Array of shape (T)
    // args: Array of arguments

    let ys = [y0];
    let n = ts.length;
    let k1, k2, k3, k4;
    let yn;

    for(let i=0; i<n-1; i++){
        // yn_prev: vector of shape (N)
        let yn_prev = ys[-1];

        // floating point numbers
        let tn_prev = ts[i];
        let tn = ts[i + 1];
        let h = tn - tn_prev;
        
        k1 = applyVectorEW(yn_prev, f, [tn_prev, ...args]);
        k1 = multVectorEW(k1, h);

        k2 = yn_prev.add(multVectorEW(k1, 1/2))
        k2 = applyVectorEW(k2, f, [tn_prev+h/2, ...args]);
        k2 = multVectorEW(k2, h);

        k3 = yn_prev.add(multVectorEW(k2, 1/2))
        k3 = applyVectorEW(k3, f, [tn_prev+h/2, ...args]);
        k3 = multVectorEW(k3, h);

        k4 = yn_prev.add(k3)
        k4 = applyVectorEW(k4, f, [tn, ...args]);
        k4 = multVectorEW(k4, h);

        yn = k1.add(multMatrixEW(k2, 2)).add(multMatrixEW(k3, 2)).add(k4);
        yn = yn_prev.add(multVectorEW(yn, 1/6));

        ys.append(yn.dup());
    }

    // Matrix of shape (T, N)
    ys = Matrix.create(ys.map(yi => yi.elements));
    return ys;
}

function fillMatrix(h, w, k){
    return Matrix.create(Array.from(Array(h), _ => Array(w).fill(k)));
}

function fillVector(h, k){
    return Vector.create(Array(h).fill(k));
}

function addMatrixEW(m, k){
    let m_d = m.dup();
    let dim = m.dimensions();
    let e = m_d.elements;
    for(var i=0; i<dim.rows; i++){
        for(var j=0; j<dim.cols; j++){
            e[i][j] += k;
        }
    }
    return m_d;
}

// function addTwoMatrixEW(m1, m2){
//     let m_d = m1.dup();
//     let dim = m1.dimensions();
//     let e1 = m_d.elements;
//     let e2 = m2.elements;
//     for(var i=0; i<dim.rows; i++){
//         for(var j=0; j<dim.cols; j++){
//             e1[i][j] += e2[i][j];
//         }
//     }
//     return m_d;
// }

function multMatrixEW(m, k){
    let m_d = m.dup();
    let dim = m.dimensions();
    let e = m_d.elements;
    for(var i=0; i<dim.rows; i++){
        for(var j=0; j<dim.cols; j++){
            e[i][j] *= k;
        }
    }
    return m_d;
}

function applyMatrixEW(m, f, args){
    let m_d = m.dup();
    let dim = m.dimensions();
    let e = m_d.elements;
    for(var i=0; i<dim.rows; i++){
        for(var j=0; j<dim.cols; j++){
            e[i][j] = f(e[i][j], ...args);
        }
    }
    return m_d;
}

function addVectorEW(v, k){
    let v_d = v.dup();
    let dim = v.dimensions();
    let e = v_d.elements;
    for(var i=0; i<dim; i++){
        e[i] += k;
    }
    return v_d;
}

// function addTwoVectorEW(v1, v2){
//     let v_d = v1.dup();
//     let dim = v.dimensions();
//     let e1 = v_d.elements;
//     let e2 = v2.elements;
//     for(var i=0; i<dim; i++){
//         e1[i] += e2[i];
//     }
//     return v_d;
// }

function multVectorEW(v, k){
    let v_d = v.dup();
    let dim = v.dimensions();
    let e = v_d.elements;
    for(var i=0; i<dim; i++){
        e[i] *= k;
    }
    return v_d;
}

function applyVectorEW(v, f, args){
    let v_d = v.dup();
    let dim = m.dimensions();
    let e = v_d.elements;
    for(var i=0; i<dim; i++){
        e[i] = f(e[i], ...args);
    }
    return v_d;
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

    print(v1.dimensions())

    // print(m2.inspect())
    // print(m1.multiply(m2).inspect())
    // print(Matrix.create(Array.from(Array(10), _ => Array(5).fill(-2))).inspect())
}