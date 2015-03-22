import './canvas_extensions'
import Grid from './grid'

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
var grid = new Grid(10, 5, 50);

// 0-indexing vs 1-indexing
grid.set(5,5,'blue');
grid.set(8,3,'blue');


// TODO using intervals to help specify random numbers

function randomInt(max) {
    return Math.floor(max * Math.random());
}

function randomColor() {
    var col = [255, 255, 255].map(randomInt);
    return `rgb(${col.join(',')})`;
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
                ctx.fillStyle = color;
                ctx.fillRect(x * size, y * size, size, size);
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


var transform = [1, 0, 0, 1, 50, 100];

var gridView = new GridView(grid, transform);

gridView.draw(ctx);

document.addEventListener('click', function(e) {
    console.log(e.pageX, e.pageY);
    gridView.getCellAtLocation(e.pageX, e.pageY);
});

//drawGrid(grid);

console.log(`grid = (${grid.width}, ${grid.height})`);

var world = "earth";
console.log(`Hello ${world}`);
