function parseOptionFile(){
    document.getElementById("output").innerHTML = ""
    var gameFile = document.getElementById("gameChooser").value
    console.log(gameFile)

    fetch("./assets/Options/" + gameFile)
        .then(response => response.text())
        .then(text => {
            var shatteredOptions = text.split("\n")
            shatteredOptions.forEach((string) => {
                var shatteredLine = string.split(" ")
                shatteredLine.forEach((word) => {
                    if (word === "class"){
                        var paragraph = document.createElement("p")
                        paragraph.innerText = string
                        document.getElementById("output").append(paragraph)
                    }
                })
            })
        })
}