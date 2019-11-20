let yyy = document.getElementById("xxx");
let context = yyy.getContext("2d");

autoSetCanvasSize(yyy);
listenToMouse(yyy);

let eraserEnabled = false;
let eraser = document.getElementById("eraser");
let brush = document.getElementById("brush");
let actions = document.getElementById("actions");
eraser.onclick = function () {
    eraserEnabled = true;
    actions.className = "actions x";
    console.log(actions);
};
brush.onclick = function(){
    eraserEnabled = false;
    actions.className = "actions";
    console.log(actions);
};

function autoSetCanvasSize(canvas) {
    setCanvasSize();

    window.onresize = function () {
        setCanvasSize();
    };

    function setCanvasSize() {
        let pageWidth = document.documentElement.clientWidth;
        let pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function listenToMouse(canvas,) {
    let using = false;
    let lastPoint = {x: undefined, y: undefined};

    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.strokeStyle = "black";
        context.moveTo(x1, y1);
        context.lineWidth = 5;
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }

    canvas.onmousedown = function (aaa) {
        let x = aaa.clientX;//相对于视口的位置不是相对于canvas的位置
        let y = aaa.clientY;
        using = true;
        if (eraserEnabled) {
            context.clearRect(x, y, 10, 10);
        } else {
            lastPoint = {
                x: x,
                y: y
            };
        }
    };
    canvas.onmousemove = function (aaa) {
        let x = aaa.clientX;
        let y = aaa.clientY;
        if (using) {
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                let newPoint = {
                    x: x,
                    y: y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
    };
    canvas.onmouseup = function () {
        using = false;
    };
}
