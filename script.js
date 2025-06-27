/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// create canvas element and append it to document body
var canvas = document.getElementById("can");
document.body.appendChild(canvas);

// some hotfixes... ( ≖_≖)
document.body.style.margin = 0;
//canvas.style.position = 'absolute';

// get canvas 2D context and set to correct size
var ctx = canvas.getContext("2d");
resize();
var left = ctx.canvas.getBoundingClientRect();
// last known position
var pos = { x: 0, y: 0 };

window.addEventListener("resize", resize);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);

// resize canvas
function resize() {
  ctx.canvas.width = 1200;
  ctx.canvas.height = 600;
}

//defining w and h
var w = ctx.canvas.width;
var h = ctx.canvas.height;

// new position from mouse event
function setPosition(e) {
  //round to ensure x and y are integers
  pos.x = e.clientX - left.left;
  pos.y = e.clientY - left.top;
  pos.x /= left.width;
  pos.y /= left.height;
  pos.x *= w;
  pos.y *= h;
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return;

  ctx.beginPath(); // begin

  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = document.getElementById("strk").value;

  ctx.moveTo(pos.x, pos.y); // from
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!
}

//fill canvas function
function fill() {
  ctx.fillStyle = document.getElementById("strk").value;
  ctx.fillRect(0, 0, w, h);
}

//erase function
function erase() {
  ctx.clearRect(0, 0, w, h);
  document.getElementById("canvasimg").style.display = "none";
}

//save function
function save() {
  //have the user name their art
  var name = prompt("Name your masterpiece:");

  window.open(canvas.toDataURL("image/png"));
  var gh = canvas.toDataURL("png");

  var a = document.createElement("a");
  a.href = gh;
  //if the user doesn't enter a name
  if (name == null) a.download = "image.png";

  //download the image as the user defined name .png
  a.download = name + ".png";
  a.click();
}
