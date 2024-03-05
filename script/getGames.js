console.log("Loading Games")
var games = null

fetch("./assets/games.txt")
    .then(response => response.text())
    .then(text => {
        games = text.split("\n")
        games.forEach((game) => {
            console.log("Adding " + game)
            var option = document.createElement("option")
            option.value = game
            option.text = game.split(".")[0]
            document.getElementById("gameChooser").options.add(option)
            console.log("Added " + game)
        })
    })