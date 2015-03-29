var sqrt = Math.sqrt;

function dot(a,b) {
    return a[0] * b[0] + a[1] * b[1];
}

function len(a) {
    return sqrt(dot(a,a));
}

function dist(a,b) {
    return len(sub(a,b));
}

function smul(k,a) {
    return [k * a[0], k * a[1]];
}

function norm(a) {
    return smul(1 / len(a), a);
}

function perp(a) { 
    // alternate form: [a[1], -a[0]]
    return [a[1], -a[0]]
}

function sub(a,b) {
    return [a[0] - b[0], a[1] - b[1]];
}

function add(a,b) {
    return [a[0] + b[0], a[1] + b[1]];
}

function proj(a,b) {
    var b_hat = norm(b);
    var k = dot(a, b_hat);
    return smul(k, b_hat);
}
