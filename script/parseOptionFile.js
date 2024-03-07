const optionsDiv = document.getElementById("optionsDiv")
const output = document.getElementById("output")
var optionDefs
var gameFile

document.getElementById("progbalDisp").innerHTML = 50;
document.getElementById("progbalSlider").oninput = function(){
    document.getElementById("progbalDisp").innerHTML = this.value
}

function parseOptionFile(){
    optionsDiv.innerHTML = ""

    console.log("Parsing Option File")
    document.getElementById("output").innerText = ""
    gameFile = document.getElementById("gameChooser").value
    console.log("Loading " + gameFile)

    fetch("./assets/Options/" + gameFile)
        .then(response => response.text())
        .then(text => {
            let shatteredOptions = text.split("\n")
            /*
            shatteredOptions.forEach((string) => {
                var shatteredLine = string.split(" ")
                shatteredLine.forEach((word) => {
                    if (word === "class"){
                        document.getElementById("output").innerText += (string + "\n")
                    }
                })
            })
             */
            for (let i = 0; i < shatteredOptions.length; i++){
                let shatteredLine = shatteredOptions[i].split(" ")
                for (let k = 0; k < shatteredLine.length; k++){
                    if (shatteredLine[k] === "class"){
                        console.log("Found A Class")
                        k++
                        let type = shatteredLine[k].split("(")[1]
                        let id = shatteredLine[k].split("(")[0].replaceAll(" ", "")
                        type = type.split(")")[0]

                        console.log("Detected A " + type + " Class")

                        let name = ""
                        let desc = ""
                        let intialValue = 0;
                        let rangeStart = 0;
                        let rangeEnd = 1;
                        let options = []

                        if (isValidType(type)){
                            let readingDesc = true
                            while (i < shatteredOptions.length){
                                i++
                                if ((shatteredOptions[i] === "" || shatteredOptions[i] === "\r") && !readingDesc){
                                    break
                                }
                                let check = shatteredOptions[i].split("=")

                                if (check[0] === "    display_name "){
                                    console.log("Found An Option Named " + check[1])
                                    name = check[1]
                                }

                                if (check[0] === "    range_start "){
                                    rangeStart = check[1].replaceAll(" ", "").replaceAll("\n", "")
                                }

                                if (check[0] === "    range_end "){
                                    rangeEnd = check[1].replaceAll(" ", "").replaceAll("\n", "")
                                }

                                if (check[0] === "    default "){
                                    intialValue = check[1].replaceAll(" ", "").replaceAll("\n", "")
                                }

                                if (check[0].split("_")[0] === "    option"){
                                    options[Number(check[1].replaceAll(" ", "").replaceAll("\n\r", ""))] = check[0].split("ption_")[1]
                                }

                                if (check.length > 1){
                                    readingDesc = false;
                                }

                                if (readingDesc){
                                    desc += (check[0] + "\n")
                                }
                            }
                        }

                        name = name.replaceAll("\"", "")
                        name = name.replaceAll("'", "")
                        name = name.replace("\r", "")
                        desc = desc.replaceAll("\"", "")
                        desc = desc.replaceAll("'", "")
                        desc = desc.replace("\r\n", "")
                        desc = desc.replace(new RegExp("\r\n$"), "")

                        let optionHolder = document.createElement("div")
                        optionHolder.id = id
                        optionHolder.className = "option"
                        let title = document.createElement("h4")
                        title.innerText = name
                        optionHolder.append(title)
                        let describe = document.createElement("p")
                        describe.innerHTML = desc
                        optionHolder.append(describe)
                        let randomDiv = document.createElement("div")
                        randomDiv.className = "random"
                        let randomLabel = document.createElement("p")
                        randomLabel.innerText = "Random"
                        randomDiv.append(randomLabel)
                        let randomButton = document.createElement("input")
                        randomButton.className = "randomButton"
                        randomButton.type = "checkbox"
                        randomDiv.append(randomButton)

                        let valid = true
                        switch (type){
                            case "Toggle":
                                let checkbox = document.createElement("input")
                                checkbox.type = "checkbox"
                                optionHolder.append(checkbox)
                                break
                            case "DefaultOnToggle":
                                let checkboxOn = document.createElement("input")
                                checkboxOn.type = "checkbox"
                                checkboxOn.click()
                                optionHolder.append(checkboxOn)
                                break
                            case "Range":
                                let sliderHolder = document.createElement("div")
                                sliderHolder.className = "slider"
                                let slider = document.createElement("input")
                                slider.className = "sliderInput"
                                let sliderDisp = document.createElement("p")
                                sliderDisp.className = "sliderDisp"
                                slider.type = "range"
                                slider.min = Number(rangeStart)
                                slider.max = Number(rangeEnd)
                                slider.value = Number(intialValue)
                                sliderDisp.innerText = slider.value
                                slider.oninput = function() {
                                    sliderDisp.innerHTML = this.value
                                }
                                sliderHolder.append(slider)
                                sliderHolder.append(sliderDisp)
                                optionHolder.append(sliderHolder)
                                break
                            case "Choice":
                                let optionSelect = document.createElement("select")
                                optionSelect.className = "choice"
                                options.forEach((option) => {
                                    let newOption = document.createElement("option")
                                    newOption.value = options.indexOf(option)
                                    newOption.text = option
                                    optionSelect.options.add(newOption)
                                })
                                optionSelect.selectedIndex = intialValue
                                optionHolder.append(optionSelect)
                                break
                            default:
                                valid = false
                        }

                        if (valid){
                            optionHolder.append(randomDiv)
                            optionsDiv.append(optionHolder)
                        }
                    }

                    if (shatteredOptions[i] === "@dataclass\r" || shatteredOptions[i] === "@dataclass" ||
                    shatteredOptions[i].split("_")[1] === "options = {\r" ||
                        shatteredOptions[i].split("_")[1] === "options = {") {
                        optionDefs = i;
                    }
                }
            }
        })}

function isValidType(type){
    switch (type) {
        case "Toggle":
            return true
        case "DefaultOnToggle":
            return true
        case "Range":
            return true
        case "Choice":
            return true
        default:
            console.log("Option Type Not Supported")
            return false
    }
}

function generate(){
    output.innerText = ""
    fetch("./assets/Options/" + gameFile)
        .then(response => response.text())
        .then(text => {
            shatteredOptions = text.split("\n")
            output.innerText += "game: " + gameFile.split(".txt")[0] + "\n"
            let nameOpt = document.getElementById("name")
            let name = nameOpt.getElementsByTagName("input")[0]
            output.innerText += "description: 'Generated on command.net'\n"
            output.innerText += "name: " + name.value + "\n"
            output.innerText += gameFile.split(".txt")[0] + ":\n"
            output.innerHTML += ("  progression_balancing: " + getOption("progression_balancing") + "\n")
            output.innerHTML += ("  accessibility: " + getOption("accessibility") + "\n")

            let i = optionDefs+1
            while (i < shatteredOptions.length){
                i++
                try {
                    if (!checkOptionExists(shatteredOptions[i].split(":")[1].replaceAll(" ", "").replaceAll("\r", "").replaceAll(",", ""))){
                        continue
                    }
                } catch(err){
                    continue
                }
                let option = shatteredOptions[i].split(":")[0].replaceAll("\"", "").replaceAll(" ", "").replaceAll(",", "")
                let input = getOption(shatteredOptions[i].split(":")[1].replaceAll(" ", "").replaceAll("\r", "").replaceAll(",", ""))
                output.innerHTML += ("  " + option + ": " + input + "\n")
            }
        })
}

function getOption(id){
    let div = document.getElementById(id)
    if (div.getElementsByTagName("select").length > 0){
        return div.getElementsByTagName("select")[0].selectedOptions[0].text
    } else if (div.getElementsByTagName("input").length > 0) {
        if (div.getElementsByTagName("input")[0].type !== "checkbox"){
            return div.getElementsByTagName("input")[0].value
        } else {
            if (div.getElementsByTagName("input")[0].checked){
                return "'true'"
            } else {
                return "'false'"
            }
        }
    }
}

function checkOptionExists(id){
    return (document.getElementById(id) != null)
}