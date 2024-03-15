var money = 0
var amount = 1
var mult = 1
var workers = 0
var interval = 1

const amountPrice = 100
const multPrice = 1000
const workerPrice = 10000
const intervalPrice = 100000

var workInterval

function test(){
    console.log("Click!")
}

function increment(){
    money = money + (amount*mult)
}

function purchaseAmount(){
    if (money >= amountPrice){
        money = money - amountPrice
        amount++

        if (amount === 5){
            unlockMult()
        }
    }
}

function purchaseMult(){
    if (money >= multPrice){
        money = money - multPrice
        mult++

        if (mult === 10){
            unlockWorkers()
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
            unlockInterval()
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
            lockInterval()
        }
    }
}

function display(){
    document.getElementById("moneyDisplay").innerText = "$" + money
    document.getElementById("multDisplay").innerText = "Mult: " + mult
    document.getElementById("amountDisplay").innerText = "Amount: " + amount
}

function work(){
    for (let i = 0; i < workers; i++){
        increment()
    }
}

setInterval(display, 1)

const buttonWindow = new Window("buttonWindow");
const moneyWindow = new Window("moneyWindow")
const storeWindow = new Window("storeWindow")
