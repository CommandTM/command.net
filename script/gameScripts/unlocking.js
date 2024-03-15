function unlockMult(){
    document.getElementById("multText").hidden = false
    document.getElementById("multBuy").hidden = false
}

function unlockWorkers(){
    document.getElementById("workerText").hidden = false
    document.getElementById("workerBuy").hidden = false
}

function unlockInterval(){
    document.getElementById("intervalText").hidden = false
    document.getElementById("intervalBuy").hidden = false
}

function lockInterval(){
    document.getElementById("intervalText").hidden = true
    document.getElementById("intervalBuy").hidden = true
}