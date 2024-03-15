class Window {
    constructor(windowID) {
        dragElement(document.getElementById(windowID))
    }
}

var obj
function dragElement(element){
    obj = element
    var pos1 = 0, pos2 = 0, poss3 = 0, pos4 = 0
    document.getElementById(obj.id + "Tab").onmousedown = dragMouseDown;
}

function dragMouseDown(e){
    e = e || window.event
    e.preventDefault()
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
}

function elementDrag(e) {
    e = e || window.event
    e.preventDefault()
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX;
    pos4 = e.clientY;
    obj.style.top = (obj.offsetTop - pos2) + "px"
    obj.style.left = (obj.offsetLeft - pos1) + "px"
}

function closeDragElement(){
    document.onmouseup = null
    document.onmousemove = null
}