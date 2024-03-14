var clicking = false
var selected

function test(){
    console.log("Click!")
}

document.onmousemove = mouseHandler
document.onmousedown = () => {
    clicking = true
}
document.onmouseup = () => {
    clicking = false
}

function mouseHandler(event){
    let x = event.clientX
    let y = event.clientY
    let element = document.elementFromPoint(x, y)
    if (clicking){
        if (selected === null && element.class === "windowTab"){
            selected = element
        }

        if (selected !== null){
            selected.style.left = x + "px"
        }
    } else {
        selected = null;
    }
}

function tabIsClicked(){

}