var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

autoSetCanvasSize(canvas);

listenToMouse(canvas);

var eaeserEnabled = false;
earser.onclick = function(){
  eaeserEnabled = true;
  actions.className = "actions x";
}
brush.onclick = function(){
  eaeserEnabled = false;
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
  ctx.moveTo(x1,y2);
  ctx.lineWidth = 5;
  ctx.lineTo(x2,y2);
  ctx.stroke();
  ctx.closePath();
}

function listenToMouse(canvas){
  var painting = false;
  var lastPoint = {
  "x":undefined,
  "y":undefined
   };
  
  canvas.onmousedown = function(aaa){
    var x = aaa.clientX;
    var y = aaa.clientY;
    painting = true;
    if(eaeserEnabled){
      ctx.clearRect(x-5,y-5,10,10);
    }else{
      lastPoint = {"x":x,"y":y};
      drewCircle(x,y,3);
    }
   }
  
  canvas.onmousemove = function(aaa){
    var x = aaa.clientX;
    var y = aaa.clientY;
    if(!painting){
      return
    }
    if(eaeserEnabled){
         ctx.clearRect(x-5,y-5,10,10);     
    }else{    
      var newPoint = {"x":x,"y":y}
      drewCircle(x,y,3);
      drewLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
      lastPoint = newPoint;
    }
 
  canvas.onmouseup = function(aaa){
    painting = false;
    }
  }
}