var divs = [];
var draggingIndex;
var isDown = false;
var startX, startY;

// add some divs dynamically
addDiv(1100, 100, 300, 190, 'blue', 'batch1', 'images/p1.png');
addDiv(1100, 205, 300, 200, 'green', 'batch1', 'images/p2.png');
addDiv(1100, 315, 300, 220, 'green', 'batch1', 'images/langone.png');
addDiv(1100, 440, 300, 200, 'green', 'batch1', 'images/flower1.png');
addDiv(1100, 550, 300, 200, 'green', 'batch1', 'images/flower2.png');



// listen to mouse events
window.onmousedown = (function (e) { handleMouseDown(e); });
window.onmousemove = (function (e) { handleMouseMove(e); });
window.onmouseup = (function (e) { handleMouseUp(e); });


function addDiv(x, y, w, h, bk, classname, imageUrl) {
    var img = document.createElement('img');
    img.style.width = w + 'px';
    img.style.height = h + 'px';
    img.className = classname;
    img.style.position = 'absolute';
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    img.src = imageUrl; // Set the image source
    divs.push({ div: img, w: w, h: h });
    document.body.appendChild(img);
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
