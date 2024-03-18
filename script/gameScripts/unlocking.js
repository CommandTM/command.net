function unlock(storeItem){
    document.getElementById(storeItem + "Text").hidden = false
    document.getElementById(storeItem + "Buy").hidden = false
    document.getElementById(storeItem+"Text").parentElement.style.height = "21px"
}

function lock(storeItem) {
    document.getElementById(storeItem + "Text").hidden = true
    document.getElementById(storeItem + "Buy").hidden = true
    document.getElementById(storeItem+"Text").parentElement.style.height = "0px"
}