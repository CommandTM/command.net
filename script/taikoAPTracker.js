import {
    Client,
    ITEMS_HANDLING_FLAGS,
    SERVER_PACKET_TYPE,
} from "https://unpkg.com/archipelago.js@1.0.0/dist/archipelago.js"

const client = new Client()

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
        game: "Manual_TaikonoTatsujinWii_Command",
        name: document.getElementById("name").value,
        items_handling: ITEMS_HANDLING_FLAGS.REMOTE_ALL
    }

    client.connect(connectionInfo)
        .catch((error) => {
            console.error("Failed to connect: ", error)
        })
}

document.getElementById("connectButton").onclick = connect

window.addEventListener("beforeunload", () => {
    client.disconnect()
})