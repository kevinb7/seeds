(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/kevin/seed/grid/app.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

require("./canvas_extensions");

var Grid = _interopRequire(require("./grid"));

console.log("starting grid");

var canvas = document.getElementById("grid");
var ctx = canvas.getContext("2d");

// matrix coordinates: i, j -> i = row, j = col
// cartesian coordinates: x, y -> x = horizontal position, y = vertical position
// TODO make this a [Symbol.iterator] property on Grid
var cartesian = regeneratorRuntime.mark(function cartesian(width, height) {
    var y, x;
    return regeneratorRuntime.wrap(function cartesian$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                y = 0;

            case 1:
                if (!(y < height)) {
                    context$1$0.next = 12;
                    break;
                }

                x = 0;

            case 3:
                if (!(x < width)) {
                    context$1$0.next = 9;
                    break;
                }

                context$1$0.next = 6;
                return [x, y];

            case 6:
                x++;
                context$1$0.next = 3;
                break;

            case 9:
                y++;
                context$1$0.next = 1;
                break;

            case 12:
            case "end":
                return context$1$0.stop();
        }
    }, cartesian, this);
});

var range = regeneratorRuntime.mark(function range(min, max) {
    var i;
    return regeneratorRuntime.wrap(function range$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                i = min;

            case 1:
                if (!(i <= max)) {
                    context$1$0.next = 7;
                    break;
                }

                context$1$0.next = 4;
                return i;

            case 4:
                i++;
                context$1$0.next = 1;
                break;

            case 7:
            case "end":
                return context$1$0.stop();
        }
    }, range, this);
});

// assumes that we're starting at 0, 0 and working in the first quadrant
var grid = new Grid(10, 5, 50);

// 0-indexing vs 1-indexing
grid.set(5, 5, "blue");
grid.set(8, 3, "blue");

// TODO using intervals to help specify random numbers

function randomInt(max) {
    return Math.floor(max * Math.random());
}

function randomColor() {
    var col = [255, 255, 255].map(randomInt);
    return "rgb(" + col.join(",") + ")";
}

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = range(0, 100)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;

        var pos = [10, 10].map(randomInt);
        grid.set.apply(grid, _toConsumableArray(pos).concat([randomColor()]));
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var GridView = (function () {
    // TODO: need to pull out the transform library into a separate repo

    function GridView(grid, transform) {
        _classCallCheck(this, GridView);

        Object.assign(this, { grid: grid, transform: transform });
    }

    _createClass(GridView, {
        draw: {
            value: function draw(ctx) {
                ctx.save();
                ctx.transform.apply(ctx, _toConsumableArray(this.transform));

                var _grid = this.grid;
                var width = _grid.width;
                var height = _grid.height;
                var size = _grid.cellSize;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {

                    for (var _iterator2 = cartesian(width, height)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value = _slicedToArray(_step2.value, 2);

                        var x = _step2$value[0];
                        var y = _step2$value[1];

                        var color = grid.get(x, y);
                        if (color) {
                            ctx.fillStyle = color;
                            ctx.fillRect(x * size, y * size, size, size);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                            _iterator2["return"]();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                ctx.fillStyle = "black";

                // points
                //for (let [x, y] of cartesian(width + 1, height + 1)) {
                //    ctx.fillCircle(x * size, y * size, 3);
                //}

                // vertical lines
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = range(0, width)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var x = _step3.value;

                        ctx.line(x * size, 0, x * size, height * size);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                            _iterator3["return"]();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                // horizontal lines
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = range(0, height)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var y = _step4.value;

                        ctx.line(0, y * size, width * size, y * size);
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                            _iterator4["return"]();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                ctx.restore();
            }
        },
        getCellAtLocation: {
            value: function getCellAtLocation(mouseX, mouseY) {
                var x = mouseX - this.transform[4];
                var y = mouseY - this.transform[5];

                var cellX = Math.floor(x / this.grid.cellSize);
                var cellY = Math.floor(y / this.grid.cellSize);

                var value = this.grid.get(cellX, cellY);
                console.log("(" + cellX + ", " + cellY + ") = " + value);
                if (value) {
                    // TODO add a clear cell method
                    this.grid.set(cellX, cellY, undefined);
                } else {
                    this.grid.set(cellX, cellY, randomColor());
                }

                // TODO add a clear() method to canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                gridView.draw(ctx);
            }
        }
    });

    return GridView;
})();

var transform = [1, 0, 0, 1, 50, 100];

var gridView = new GridView(grid, transform);

gridView.draw(ctx);

document.addEventListener("click", function (e) {
    console.log(e.pageX, e.pageY);
    gridView.getCellAtLocation(e.pageX, e.pageY);
});

//drawGrid(grid);

console.log("grid = (" + grid.width + ", " + grid.height + ")");

var world = "earth";
console.log("Hello " + world);

},{"./canvas_extensions":"/Users/kevin/seed/grid/canvas_extensions.js","./grid":"/Users/kevin/seed/grid/grid.js"}],"/Users/kevin/seed/grid/canvas_extensions.js":[function(require,module,exports){
"use strict";

CanvasRenderingContext2D.prototype.line = function (x1, y1, x2, y2) {
    this.beginPath();
    this.moveTo(x1, y1);
    this.lineTo(x2, y2);
    this.stroke();
};

CanvasRenderingContext2D.prototype.fillCircle = function (x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.fill();
};

},{}],"/Users/kevin/seed/grid/grid.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// TODO think about renaming this to interval
// then we can have open and closed intervals
// what about half-open, half-closed

var Range = (function () {
    function Range(min, max) {
        _classCallCheck(this, Range);

        Object.assign(this, { min: min, max: max });
    }

    _createClass(Range, {
        clamp: {
            value: function clamp(value) {
                return Math.min(Math.max(value, this.min), this.max);
            }
        },
        contains: {

            // open/closed?

            value: function contains(value) {
                return this.min <= value && value <= this.max;
            }
        }
    });

    return Range;
})();

// where does this grid live in the scene?
// do we have a GridView which keeps track of this stuff?
// TODO create another datastucture like grid w/o a cellSize
// maybe GridView has the cellSize

var Grid = (function () {
    function Grid(width, height, cellSize) {
        _classCallCheck(this, Grid);

        Object.assign(this, { width: width, height: height, cellSize: cellSize });
        this.data = new Array(width * height);
        this.iRange = new Range(0, width);
        this.jRange = new Range(0, height);
    }

    _createClass(Grid, {
        get: {
            value: function get(i, j) {
                if (this.contains(i, j)) {
                    return this.data[this._index(i, j)];
                }
            }
        },
        set: {
            value: function set(i, j, value) {
                if (this.contains(i, j)) {
                    this.data[this._index(i, j)] = value;
                }
            }
        },
        _index: {
            value: function _index(i, j) {
                return j * this.width + i;
            }
        },
        contains: {
            value: function contains(i, j) {
                return this.iRange.contains(i) && this.jRange.contains(j);
            }
        }
    });

    return Grid;
})();

module.exports = Grid;

},{}]},{},["/Users/kevin/seed/grid/app.js"]);
