function range(st, en, step){
    let eps=1e-7;
    let xs = []
    for(let i=st; i<=en+1e-7; i+=step){
        xs.push(i);
    }
    return xs;
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
    for(let i=0; i<dim.rows; i++){
        for(let j=0; j<dim.cols; j++){
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
//     for(let i=0; i<dim.rows; i++){
//         for(let j=0; j<dim.cols; j++){
//             e1[i][j] += e2[i][j];
//         }
//     }
//     return m_d;
// }

function multMatrixEW(m, k){
    let m_d = m.dup();
    let dim = m.dimensions();
    let e = m_d.elements;
    for(let i=0; i<dim.rows; i++){
        for(let j=0; j<dim.cols; j++){
            e[i][j] *= k;
        }
    }
    return m_d;
}

function applyMatrixEW(m, f, args){
    let m_d = m.dup();
    let dim = m.dimensions();
    let e = m_d.elements;
    for(let i=0; i<dim.rows; i++){
        for(let j=0; j<dim.cols; j++){
            e[i][j] = f(e[i][j], ...args);
        }
    }
    return m_d;
}

function addVectorEW(v, k){
    let v_d = v.dup();
    let dim = v.dimensions();
    let e = v_d.elements;
    for(let i=0; i<dim; i++){
        e[i] += k;
    }
    return v_d;
}

// function addTwoVectorEW(v1, v2){
//     let v_d = v1.dup();
//     let dim = v.dimensions();
//     let e1 = v_d.elements;
//     let e2 = v2.elements;
//     for(let i=0; i<dim; i++){
//         e1[i] += e2[i];
//     }
//     return v_d;
// }

function multVectorEW(v, k){
    let v_d = v.dup();
    let dim = v.dimensions();
    let e = v_d.elements;
    for(let i=0; i<dim; i++){
        e[i] *= k;
    }
    return v_d;
}

function applyVectorEW(v, f, args){
    let v_d = v.dup();
    let dim = v.dimensions();
    let e = v_d.elements;
    for(let i=0; i<dim; i++){
        e[i] = f(e[i], ...args);
    }
    return v_d;
}