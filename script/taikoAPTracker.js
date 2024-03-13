import {
    Client, CLIENT_PACKET_TYPE,
    ITEMS_HANDLING_FLAGS,
    SERVER_PACKET_TYPE,
} from "https://unpkg.com/archipelago.js@1.0.0/dist/archipelago.js"

const client = new Client()
const game = "Manual_TaikonoTatsujinWii_Command"
const syncPacket = {
    cmd: CLIENT_PACKET_TYPE.SYNC
}
const output = document.getElementById("locations")

var receivedItems

client.addListener(SERVER_PACKET_TYPE.CONNECTED, (packet) => {
    console.log("Connected to server: ", packet)
})

client.addListener(SERVER_PACKET_TYPE.ROOM_UPDATE, (packet) => {
    console.log("Room update: ", packet)
})

client.addListener(SERVER_PACKET_TYPE.RECEIVED_ITEMS, (packet) => {
    console.log("Received Items: ", packet)
    receivedItems = packet.items
})

function connect(){
    const connectionInfo = {
        hostname: document.getElementById("ip").value,
        port: parseInt(document.getElementById("port").value),
        game: game,
        name: document.getElementById("name").value,
        items_handling: ITEMS_HANDLING_FLAGS.REMOTE_ALL
    }

    client.connect(connectionInfo)
        .then(() => {
            document.getElementById("updateButton").hidden = false
            setInterval(update, 60000)
            update()
        })
        .catch((error) => {
            console.error("Failed to connect: ", error)
        })
}
document.getElementById("connectButton").onclick = connect

function update(){

    document.getElementById("locations").innerText = ""
    let locations = []
    let locationIDs = client.locations.checked
    for (let i = 0; i < locationIDs.length; i++){
        locations.push(client.locations.name(game, locationIDs[i]))
    }

    let items = []

    setTimeout(function(){
        for (let i = 0; i < receivedItems.length; i++){
            let item = client.items.name(game, receivedItems[i].item)
            if (item !== "Don Coin" && item !== "Crown"){
                items.push(item)
            }
        }

        for (let i = 0; i < locations.length; i++){
            if (locations[i].split(" - 1").length <= 1){
                if (items.includes(locations[i].split(" - 0")[0])){
                    let container = document.createElement("div")
                    let song = document.createElement("p")
                    let checkButton = document.createElement("button")
                    let id = client.locations.id(game, locations[i])
                    container.className = "center"
                    song.innerText = (locations[i].split(" - 0")[0] + "\n")
                    song.id = id
                    song.className = "checkButton"
                    checkButton.innerText = "Done"
                    checkButton.className = "checkButton"
                    container.append(song)
                    container.append(checkButton)
                    output.append(container)
                }
            }
        }
    }, 1000)
    client.send(syncPacket)
}
document.getElementById("updateButton").onclick = update

function sendCheck(){
    let id = document.parentElement.getElementsByTagName("p")[0].id
    client.locations.check(id, id+1)
}

window.addEventListener("beforeunload", () => {
    client.disconnect()
})