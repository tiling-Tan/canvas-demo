import $ from 'jquery'

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lineWidth = 3;

autoSetCanvasSize(canvas);

listenToUser(canvas);

var eraserEnabled = false;
pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add("active");
    eraser.classList.remove("active");
}
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add("active");
    pen.classList.remove("active");
}
clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
save.onclick = function () {
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = "my painting";
    a.target = '_blank';
    a.click();
}

let color = $('.colors > li')
for (let i = 0; i < color.length; i++) {
    $(color[i]).click(() => {
        let bgcolor = $(color[i]).css("background-color")
        ctx.strokeStyle = bgcolor.toString();
        ctx.fillStyle = bgcolor.toString();
        $(color[i]).addClass("active").siblings().removeClass("active")
    })
}
$(color[0]).click()

thin.onclick = function () {
    lineWidth = 3;
}
thick.onclick = function () {
    lineWidth = 6;
}

/*画布太小自适应*/
function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function () {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

//圆
function drewCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drewLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = lineWidth;
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function listenToUser(canvas) {
    var painting = false;
    var lastPoint = {
        "x": undefined,
        "y": undefined
    };
    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏手机
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            painting = true;
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                };
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            if (!painting) {
                return
            }
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }

                drewLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function () {
            painting = false;
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX;
            var y = aaa.clientY;
            painting = true;
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                };
            }
        }

        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX;
            var y = aaa.clientY;
            if (!painting) {
                return
            }
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }

                drewLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.onmouseup = function (aaa) {
            painting = false;
        }
    }


}


