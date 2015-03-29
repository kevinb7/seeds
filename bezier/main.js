function createCanvas() {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.body.style.margin = 0;

    return canvas.getContext('2d');
}

var ctx = createCanvas();

with (ctx) {
    
    //var path = [];
    //path.push({ type: 'm', value: [100, 100] });
    //path.push({ type: 'l', value: [300, 50] });
    //path.push({ type: 'l', value: [250, 200] });
    //
    //beginPath();
    //path.forEach(function (cmd) {
    //    var type = cmd.type;
    //    var value = cmd.value;
    //    if (type == 'm') {
    //        moveTo(value[0], value[1]);
    //    }
    //    if (type == 'l') {
    //        lineTo(value[0], value[1]);
    //    }
    //});
    //stroke();
    
    var points = [
        [100, 100],
        [300, 200],
        [300, 400],
        [100, 500]
    ];
    
    var ctrl_points = [
        [400, 250],
        [400, 300]
    ];
    
    var POINT_SIZE = 5;
    var HIT_SIZE = 10;
    
    var draw = function () {
        clear();
        
        line(points[0][0], points[0][1], points[1][0], points[1][1]);
        line(points[2][0], points[2][1], points[3][0], points[3][1]);
        
        beginPath();
        moveTo(points[1][0], points[1][1]);
        bezierCurveTo(
            ctrl_points[0][0], ctrl_points[0][1],
            ctrl_points[1][0], ctrl_points[1][1],
            points[2][0], points[2][1]
        );
        stroke();

        line(points[1][0], points[1][1], ctrl_points[0][0], ctrl_points[0][1]);
        line(points[2][0], points[2][1], ctrl_points[1][0], ctrl_points[1][1]);

        //if (selection != null && points.indexOf(selection) == -1) {
        //    line(points[1][0], points[1][1], selection[0], selection[1]);
        //}

        fillStyle = 'blue';
        points.forEach(function (point) {
            fillCircle(point[0], point[1], POINT_SIZE);
        });
        
        fillStyle = 'green';
        ctrl_points.forEach(function (p) {
            fillCircle(p[0], p[1], POINT_SIZE);
        });
        
        requestAnimationFrame(draw);
    };
    
    var selection = null;
    var down = false;
    
    document.addEventListener('mousedown', function (e) {
        var mouse = [e.pageX, e.pageY];
        down = true;
        points.forEach(function (point) {
            if (dist(point, mouse) < HIT_SIZE) {
                selection = point;
            }
        });
        ctrl_points.forEach(function (point) {
            if (dist(point, mouse) < HIT_SIZE) {
                selection = point;
            }
        });
        //if (selection == null) {
        //    selection = mouse;
        //}
    });
    
    document.addEventListener('mousemove', function (e) {
        var p, point;
        if (down) {
            var mouse = [e.pageX, e.pageY];
            if (points.indexOf(selection) != -1) {
                selection[0] = mouse[0];
                selection[1] = mouse[1];
            } else if (ctrl_points.indexOf(selection) != -1) {
                if (selection == ctrl_points[0]) {
                    p = proj(sub(mouse, points[1]), sub(points[1], points[0]));
                    point = add(points[1], p);
                    selection[0] = point[0];
                    selection[1] = point[1];
                } else if (selection == ctrl_points[1]) {
                    p = proj(sub(mouse, points[2]), sub(points[2], points[3]));
                    point = add(points[2], p);
                    selection[0] = point[0];
                    selection[1] = point[1];
                }
            }
        }
    });
    
    document.addEventListener('mouseup', function (e) {
        if (down) {
            down = false;
            selection = null;
        } 
    });
    
    draw();    
}
