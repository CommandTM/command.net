console.log("Ah")
forbiddenWords = [" the ", " it ", " at ", " as ", " in ", " is ", " a ", " this ", " to "]
backupImage = "https://i.scdn.co/image/ab67616100005174ba025c8f62612b2ca6bfa375"

function generate(){
    document.getElementById("image").innerText = ""

    prompt = document.getElementById("prompt").value
    prompt = prompt.toLowerCase()
    prompt = " " + prompt
    prompt = prompt + " "
    console.log(prompt)

    forbiddenWords.forEach(word => {
        prompt = prompt.replaceAll(word, "  ")
    })
    console.log(prompt)

    queryWords = prompt.split(" ")
    queryWords = queryWords.filter(item => item !== "")
    console.log(queryWords)

    queryWords.forEach(word => {
        let image = document.createElement("img")

        fetch(baseAPIURL + word)
            .then(r => r.json())
            .then(data => {
                console.log(data.items[0].link)
                image.src = data.items[0].link
            })

        image.className = "Image"
        image.style.left = Math.floor(Math.random() * 1001) + "px"
        image.style.top = Math.floor(Math.random() * 1001) + "px"
        document.getElementById("image").appendChild(image)
    })
}