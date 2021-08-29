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
        let yn_prev = ys[ys.length-1];

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

        ys.push(yn.dup());
    }

    // Matrix of shape (T, N)
    ys = Matrix.create(ys.map(yi => yi.elements));
    return ys;
}

function f1(y, t, n){
    return n-y;
}

function f1_sol(t, n, init){
    return (init-n) * exp(-t) + n;
}

function setup() {
    let t_min = 0.0;
    let t_max = 10.0;
    let h = 0.01;
    let args = [12];
    let init = 7.0;
    let t = range(t_min, t_max, h)

    let gt = t.map(cur_t => f1_sol(cur_t, ...args, init));
    let rk = rungekutta(f1, Vector.create([init]), t, args);
    rk = rk.col(1).elements;
}