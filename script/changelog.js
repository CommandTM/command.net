let index = 0
let word = "Changing"

title()
var t = setInterval(title, 500)

function title(){
    document.title += word.charAt(index)

    if (index === 8){
        index = 1
        document.title = "C"
    } else {
        index++
    }
}