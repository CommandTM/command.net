if (document.cookie === "miku=yes"){
    activateMikuMode()
}

function activateMikuMode() {
    document.head.innerHTML += "<link rel=\"stylesheet\" href=\"style/mikuMode.css\"/>"
    document.getElementById("mikuModeButton").hidden = true
    document.getElementById("introHeader").innerText = document.getElementById("introHeader").innerText.replace("Command", "Hatsune Miku")
    const d = new Date();
    d.setTime(d.getDate() + 31556952000)
    document.cookie = "miku=yes; " + d.toUTCString()
}