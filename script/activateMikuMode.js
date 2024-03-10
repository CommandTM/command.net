if (document.cookie === "miku=yes"){
    activateMikuMode()
}

function activateMikuMode(){
    document.head.innerHTML += "<link rel=\"stylesheet\" href=\"style/mikuMode.css\"/>"
    document.getElementById("mikuModeButton").hidden = true
    document.getElementById("introHeader").innerText = document.getElementById("introHeader").innerText.replace("Command", "Hatsune Miku")
    document.cookie = "miku=yes"
}