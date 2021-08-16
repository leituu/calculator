let n1,n2;

// Add
function add(a,b) {
    return a + b;
}
// Subtract
function subtract(a,b) {
    return a - b;
}
// Div
function div(a,b) {
    if (a%b == 0) {
        return parseInt(a/b);
    }
    else {return Math.round((a/b*10000))/10000}
}
// Mult
function mult(a,b) {
    return a * b;
}

// Sqr
function sqr(a) {
    return Math.pow(a,2);
}

// Sqrt
function sqrt(a) {
    return Math.round((Math.sqrt(a))*10000)/10000;
}

// Inv
function inv(a) {
    return div(1,a);
}

// Percentage
function perc(a) {
    return div(a,100);
}

