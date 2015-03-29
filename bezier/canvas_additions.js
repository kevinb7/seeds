var tau = 2 * Math.PI;

CanvasRenderingContext2D.prototype.fillCircle = function(x, y, r) {
    this.beginPath();
    this.arc(x, y, r, 0, tau, false);
    this.fill();
};

CanvasRenderingContext2D.prototype.strokeCircle = function(x, y, r) {
    this.beginPath();
    this.arc(x, y, r, 0, tau, false);
    this.stroke();
};

CanvasRenderingContext2D.prototype.line = function(x1, y1, x2, y2) {
    this.beginPath();
    this.moveTo(x1, y1);
    this.lineTo(x2, y2);
    this.stroke();
};

CanvasRenderingContext2D.prototype.clear = function() {
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

