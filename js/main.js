let yyy = document.getElementById("xxx");
let context = yyy.getContext("2d");

autoSetCanvasSize(yyy);
listenToEvent(yyy);

let eraserEnabled = false;
let eraser = document.getElementById("eraser");
let brush = document.getElementById("brush");
let actions = document.getElementById("actions");
eraser.onclick = function () {
    eraserEnabled = true;
    actions.className = "actions x";
};
brush.onclick = function () {
    eraserEnabled = false;
    actions.className = "actions";
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

function listenToEvent(canvas) {
    let using = false;
    let lastPoint = {x: undefined, y: undefined};

    let passiveSupported = false;
    try {
        let options = Object.defineProperty({}, "passive", {
            get: function() {
                passiveSupported = true;
            }
        });
        window.addEventListener("test", null, options);
    } catch(err) {}

    canvas.addEventListener("touchstart", e => {
        e.preventDefault();
        let x = e.touches[0].clientX;//相对于视口的位置不是相对于canvas的位置
        let y = e.touches[0].clientY;
        using = true;
        if (eraserEnabled) {
            context.clearRect(x, y, 10, 10);
        } else {
            lastPoint = {
                x: x,
                y: y
            };
        }
        return e;
    }, passiveSupported ? { passive: true } : false);
    canvas.addEventListener("touchmove", e => {
        e.preventDefault();
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
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
    }, passiveSupported ? { passive: true } : false);
    canvas.addEventListener("touchend", e => {
        e.preventDefault();
        using = false;
    }, passiveSupported ? { passive: true } : false);


    canvas.addEventListener("mousedown", e => {
        let x = e.clientX;//相对于视口的位置不是相对于canvas的位置
        let y = e.clientY;
        using = true;
        if (eraserEnabled) {
            context.clearRect(x, y, 10, 10);
        } else {
            lastPoint = {
                x: x,
                y: y
            };
        }
        return e;
    }, passiveSupported ? { passive: true } : false);
    canvas.addEventListener("mousemove", e => {
        let x = e.clientX;
        let y = e.clientY;
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
    }, passiveSupported ? { passive: true } : false);
    canvas.addEventListener("mouseup", () => {
        using = false;
    }, passiveSupported ? { passive: true } : false);
    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.strokeStyle = "black";
        context.moveTo(x1, y1);
        context.lineWidth = 5;
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }
}
