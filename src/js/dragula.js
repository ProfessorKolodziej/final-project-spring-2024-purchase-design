// Allow drag and drop from left to right
const drake = dragula([document.querySelector('#products'), document.querySelector('#cart')]);

function onDrop(el, target, source, sibling) {
  console.log("The item is:", el);
  console.log("The target of this item (where it ends up) is:", target);
  console.log("The source of this item is:", source);
  console.log("The sibling of this item is:", sibling);
  alert("Check the console for information about this drop event.");
}

drake.on("drop", onDrop);


var divs = [];
var draggingIndex;
var isDown = false;
var startX, startY;

// add some divs dynamically
addDiv(50, 50, 100, 75, 'blue', 'batch1');
addDiv(250, 50, 50, 38, 'green', 'batch1');

// listen to mouse events
window.onmousedown = (function (e) { handleMouseDown(e); });
window.onmousemove = (function (e) { handleMouseMove(e); });
window.onmouseup = (function (e) { handleMouseUp(e); });


function addDiv(x, y, w, h, bk, classname) {
  var div = document.createElement('div');
  div.style.width = w + 'px';
  div.style.height = h + 'px';
  div.className = classname;
  div.style.position = 'absolute';
  div.style.left = x + 'px';
  div.style.top = y + 'px';
  div.style.background = bk;
  divs.push({ div: div, w: w, h: h });
  document.body.appendChild(div);
}


function handleMouseDown(e) {
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // get mouse position
  startX = parseInt(e.clientX);
  startY = parseInt(e.clientY);
  // Is any div under the mouse?
  draggingIndex = undefined;
  for (var i = 0; i < divs.length; i++) {
    var d = divs[i];
    var x = parseInt(d.div.style.left);
    var y = parseInt(d.div.style.top);
    if (startX > x && startX < x + d.w && startY > y && startY < y + d.h) {
      draggingIndex = i;
      isDown = true;
      break;
    }
  }
}

function handleMouseUp(e) {
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  isDown = false;
}

function handleMouseMove(e) {
  if (!isDown) { return; }
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // get mouse position
  mouseX = parseInt(e.clientX);
  mouseY = parseInt(e.clientY);
  // move the dragging div by the distance the mouse has moved
  var dragging = divs[draggingIndex].div;
  var dx = mouseX - startX;
  var dy = mouseY - startY;
  startX = mouseX;
  startY = mouseY;
  dragging.style.left = (parseInt(dragging.style.left) + dx) + 'px';
  dragging.style.top = (parseInt(dragging.style.top) + dy) + 'px';
}