function download(){
    var download = document.createElement("a")
    download.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(document.getElementById("output").innerText));
    let name = document.getElementById("name").getElementsByTagName("input")[0].value
    download.setAttribute("download", (name + ".yaml"))

    download.style.display = "none"
    document.body.appendChild(download)

    download.click()

    document.body.removeChild(download)
}