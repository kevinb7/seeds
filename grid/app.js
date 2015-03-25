import './canvas_extensions'
import Grid from './grid'
import Rx from 'rx'

console.log('starting grid');


var canvas = document.getElementById('grid');
var ctx = canvas.getContext('2d');


// matrix coordinates: i, j -> i = row, j = col
// cartesian coordinates: x, y -> x = horizontal position, y = vertical position
// TODO make this a [Symbol.iterator] property on Grid 
var cartesian = function* (width, height) {
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            yield [x, y];
        }
    }
};


var range = function* (min, max) {
    for (let i = min; i <= max; i++) {
        yield i;
    }
};


// assumes that we're starting at 0, 0 and working in the first quadrant
var grid = new Grid(3, 3, 100);

// TODO when to use 0-indexing vs 1-indexing
// TODO using intervals to help specify random numbers

function randomInt(max) {
    return Math.floor(max * Math.random());
}

function randomColor() {
    return [255, 255, 255].map(randomInt);
}

for (let i of range(0, 100)) {
    var pos = [10, 10].map(randomInt);
    grid.set(...pos, randomColor());
}


class GridView {
    // TODO: need to pull out the transform library into a separate repo
    constructor(grid, transform) {
        Object.assign(this, { grid, transform });
    }

    draw(ctx) {
        ctx.save();
        ctx.transform(...this.transform);
        
        var { width, height, cellSize: size } = this.grid;
        
        for (let [x, y] of cartesian(width, height)) {
            var color = grid.get(x, y);
            if (color) {
                if (color.join) {
                    ctx.fillStyle = `rgb(${color.join(',')})`;
                    ctx.fillRect(x * size, y * size, size, size);
                } else {
                    debugger;
                }
                
            }
        }

        ctx.fillStyle = 'black';

        // points
        //for (let [x, y] of cartesian(width + 1, height + 1)) {
        //    ctx.fillCircle(x * size, y * size, 3);
        //}

        // vertical lines
        for (let x of range(0, width)) {
            ctx.line(x * size, 0, x * size, height * size);
        }

        // horizontal lines
        for (let y of range(0, height)) {
            ctx.line(0, y * size, width * size, y * size);
        }
        
        ctx.restore();
    }

    getCellAtLocation(mouseX, mouseY) {
        var x = mouseX - this.transform[4];
        var y = mouseY - this.transform[5];
        
        var cellX = Math.floor(x / this.grid.cellSize);
        var cellY = Math.floor(y / this.grid.cellSize);
        
        var value = this.grid.get(cellX, cellY);
        console.log(`(${cellX}, ${cellY}) = ${value}`);
        if (value) {
            // TODO add a clear cell method
            this.grid.set(cellX, cellY, undefined);
        } else {
            this.grid.set(cellX, cellY, randomColor());
        }
        
        // TODO add a clear() method to canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
        gridView.draw(ctx);
    }
}


var transform = [1, 0, 0, 1, 100, 100];

var gridView = new GridView(grid, transform);

gridView.draw(ctx);


function eventToPoint(event) {
    return [event.pageX, event.pageY];
}


var downs = Rx.Observable.fromEvent(document, "mousedown").map(eventToPoint);
var moves = Rx.Observable.fromEvent(document, "mousemove").map(eventToPoint);
var ups = Rx.Observable.fromEvent(document, "mouseup").map(eventToPoint);


function distance(p1, p2) {
    var dx = p2[0] - p1[0];
    var dy = p2[1] - p1[1];
    return Math.sqrt(dx * dx + dy * dy);
}


var taps = downs.flatMap(down => {
    var timer = Rx.Observable.timer(300);
    return ups.take(1).takeUntil(timer).filter(up => distance(down, up) < 10);
});


taps.subscribe(tap => {
    console.log(`tap @ (${tap})`);
    gridView.getCellAtLocation(...tap);
});


//drawGrid(grid);

console.log(`grid = (${grid.width}, ${grid.height})`);

var world = "earth";
console.log(`Hello ${world}`);
