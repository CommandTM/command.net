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
                        let title = document.createElement("h4")
                        title.innerText = name
                        optionHolder.append(title)
                        let describe = document.createElement("p")
                        describe.innerText = desc
                        optionHolder.append(describe)

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
                                let slider = document.createElement("input")
                                let sliderDisp = document.createElement("p")
                                slider.type = "range"
                                slider.min = Number(rangeStart)
                                slider.max = Number(rangeEnd)
                                slider.value = Number(intialValue)
                                sliderDisp.innerText = slider.value
                                optionHolder.append(slider)
                                optionHolder.append(sliderDisp)
                                break
                        }

                        optionsDiv.append(optionHolder)
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
            return true;
        default:
            console.log("Option Type Not Supported")
            return false
    }
}