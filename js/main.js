let yyy = document.getElementById("xxx");
let context = yyy.getContext("2d");
let os1 = document.getElementById("s1");
let os2 = document.getElementById("s2")

autoSetCanvasSize(yyy);
listenToEvent(yyy);

let eraserEnabled = false;
let eraser = document.getElementById("eraser");
let brush = document.getElementById("brush");
eraser.onclick = function () {
    eraserEnabled = true;
    this.classList.add("active");
    brush.classList.remove("active")
};
brush.onclick = function () {
    eraserEnabled = false;
    this.classList.add("active");
    eraser.classList.remove("active")
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
                console.log(1);
                passiveSupported = true;
            }
        });
        window.addEventListener("test", null, options);
    } catch(err) {}

    canvas.addEventListener("touchstart", function (e) {
        // e = e ||event;
        // e.preventDefault();
        let x = e.touches[0].clientX;//相对于视口的位置不是相对于canvas的位置
        let y = e.touches[0].clientY;
        using = true;
        if (eraserEnabled) {
            let wh=os2.options[os2.options.selectedIndex].value;
            context.clearRect(x, y, wh-0, wh-0);
        } else {
            lastPoint = {
                x: x,
                y: y
            };
        }
        return e;
    }, passiveSupported ? { passive: true } : false);
    canvas.addEventListener("touchmove",function (e) {
        // e = e ||event;
        // e.preventDefault();
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        if (using) {
            if (eraserEnabled) {
                let wh=os2.options[os2.options.selectedIndex].value;
                context.clearRect(x, y, wh-0, wh-0);
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
    canvas.addEventListener("touchend",function () {
        // e = e ||event;
        // e.preventDefault();
        using = false;
    }, passiveSupported ? { passive: true } : false);


    canvas.addEventListener("mousedown",function (e) {
        let x = e.clientX;//相对于视口的位置不是相对于canvas的位置
        let y = e.clientY;
        using = true;
        if (eraserEnabled) {
            let wh=os2.options[os2.options.selectedIndex].value;
            context.clearRect(x, y, wh-0, wh-0);
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
                let wh=os2.options[os2.options.selectedIndex].value;
                context.clearRect(x, y, wh-0, wh-0);
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
        context.strokeStyle = os1.options[os1.options.selectedIndex].value;
        context.moveTo(x1, y1);
        context.lineWidth = os2.options[os2.options.selectedIndex].value;
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }
}
