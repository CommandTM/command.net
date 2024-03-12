import {
    Client,
    ITEMS_HANDLING_FLAGS,
    SERVER_PACKET_TYPE,
} from "https://unpkg.com/archipelago.js@1.0.0/dist/archipelago.js"

const client = new Client()
const game = "Manual_TaikonoTatsujinWii_Command"

client.addListener(SERVER_PACKET_TYPE.CONNECTED, (packet) => {
    console.log("Connected to server: ", packet)
})

client.addListener(SERVER_PACKET_TYPE.ROOM_UPDATE, (packet) => {
    console.log("Room update: ", packet)
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
    let locationIDs = client.locations.missing
    for (let i = 0; i < locationIDs.length; i++){
        locations.push(client.locations.name(game, locationIDs[i]).split(" - 0")[0])
    }

    for (let i = 0; i < locations.length; i++){
        if (locations[i].split(" - ").length <= 1){
            document.getElementById("locations").innerText += (locations[i].split(" - 0")[0] + "\n")
        }
    }
}
document.getElementById("updateButton").onclick = update

window.addEventListener("beforeunload", () => {
    client.disconnect()
})