var money = 0
var amount = 1
var mult = 1
var workers = 0
var interval = 1

var pounds = 0
var severity = 1
var impact = 1

const amountPrice = 100
const multPrice = 1000
const workerPrice = 10000
const intervalPrice = 100000
const severityPrice = 10
const impactPrice = 20

const progressDisplay = document.getElementById("hackProgress")

var workInterval

var hackProgress = 0
var hackInterval

//unlock("hSeverity")
//unlock("hImpact")

function test(){
    console.log("Click!")
}

function increment(){
    money = money + (amount*mult)
}

function hack() {
    if (hackProgress === 0){
        hackInterval = setInterval(hack, 1000)
        console.log("Starting To Hack")
        hackProgress++
    } else if (hackProgress === progressDisplay.max){
        clearInterval(hackInterval)
        hackProgress = 0
        pounds += (severity*impact)
    } else {
        hackProgress++
    }
}

function purchaseAmount(){
    if (money >= amountPrice){
        money = money - amountPrice
        amount++

        if (amount === 5){
            unlock("mult")
        }
    }
}

function purchaseMult(){
    if (money >= multPrice){
        money = money - multPrice
        mult++

        if (mult === 10){
            unlock("worker")
        }
    }
}

function purchaseWorker(){
    if (money >= workerPrice){
        money = money - workerPrice
        workers++
        document.getElementById("workerDisplay").innerText += "☺"

        if (workers === 1){
            workInterval = setInterval(work, 1000)
        }

        if (workers === 20){
            unlock("interval")
        }
    }
}

function purcahseInterval(){
    if (money >= intervalPrice){
        money = money - intervalPrice
        interval -= 0.001
        document.getElementById("intervalDisplay").style.width = (300*interval) + "px"

        clearInterval(workInterval)
        workInterval = setInterval(work, (1000*interval))

        if (interval <= 0.001){
            lock("interval")
        }
    }
}

function purchaseSeverity(){
    if (pounds >= severityPrice){
        pounds -= severityPrice
        progressDisplay.max += 1
        severity++
    }
}

function purchaseImpact(){
    if (pounds >= impactPrice){
        pounds -= impactPrice
        progressDisplay.max = Math.round(progressDisplay.max*1.1)
        impact++
    }
}

function display(){
    document.getElementById("moneyDisplay").innerText = "$" + money
    document.getElementById("multDisplay").innerText = "Mult: " + mult
    document.getElementById("amountDisplay").innerText = "Amount: " + amount
    progressDisplay.value = hackProgress
    document.getElementById("poundsDisplay").innerText = "£" + pounds
    document.getElementById("hSeverityDisplay").innerText = "Severity: " + severity
    document.getElementById("hImpactDisplay").innerText = "Impact: " + impact
}

function work(){
    for (let i = 0; i < workers; i++){
        increment()
    }
}

function cheat(type){
    if (type === 0){
        money += parseInt(document.getElementById("cheat").value)
    } else {
        pounds += parseInt(document.getElementById("cheat").value)
    }
}

setInterval(display, 1)

const buttonWindow = new Window("buttonWindow");
const moneyWindow = new Window("moneyWindow")
const storeWindow = new Window("storeWindow")
const hackWindow = new Window("mainHackWindow")
const cheatWindow = new Window("cheatWindow")
