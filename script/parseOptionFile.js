const optionsDiv = document.getElementById("optionsDiv")

function parseOptionFile(){
    optionsDiv.innerHTML = ""

    console.log("Parsing Option File")
    document.getElementById("output").innerText = ""
    let gameFile = document.getElementById("gameChooser").value
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
                                if (shatteredOptions[i] === "" || shatteredOptions[i] === "\r"){
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
                                break
                        }

                        if (valid){
                            optionHolder.append(randomDiv)
                            optionsDiv.append(optionHolder)
                        }
                    }
                }
            }
        })
}

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