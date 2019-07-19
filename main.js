var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

autoSetCanvasSize(canvas);

listenToUser(canvas);

var eraserEnabled = false;
earser.onclick = function(){
  eraserEnabled = true;
  actions.className = "actions x";
}
brush.onclick = function(){
  eraserEnabled = false;
  actions.className = "actions";
}


/***************/
function autoSetCanvasSize(canvas){
  setCanvasSize();
  window.onresize = function(){
    setCanvasSize();
  }
  function setCanvasSize(){
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  canvas.width = pageWidth;
  canvas.height = pageHeight;
    }
  }

//圆
function drewCircle(x,y,radius){
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function drewLine(x1,y1,x2,y2){
  ctx.beginPath();
  ctx.strokeStyle = "black"
  ctx.moveTo(x1,y1);
  ctx.lineWidth = 5;
  ctx.lineTo(x2,y2);
  ctx.stroke();
  ctx.closePath();
}

function listenToUser(canvas){
  var painting = false;
  var lastPoint = {
  "x":undefined,
  "y":undefined
  };
  //特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏手机
    canvas.ontouchstart = function(aaa){ 
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      painting = true;
      if(eraserEnabled){
        ctx.clearRect(x-5,y-5,10,10);
      }else{
        lastPoint = {
          "x": x,
          "y": y
        };
      }
    }
    canvas.ontouchmove = function(aaa){ 
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
    canvas.ontouchend = function(){ 
      painting = false;
    }
  } else { 
    //非触屏设备
    canvas.onmousedown = function(aaa){
      var x = aaa.clientX;
      var y = aaa.clientY;
      painting = true;
      if(eraserEnabled){
        ctx.clearRect(x-5,y-5,10,10);
      }else{
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
    canvas.onmouseup = function(aaa){
      painting = false;
    }
  }
  
  
}


