async function getData() {
    try {
        let reponse = await fetch('../../Backend/main.json')
        if (!reponse.ok) {
            throw new Error("Error")
        }
        let data = await reponse.json()
        return data
    } catch (err) {
        return "Error"
    }
}
let search = document.getElementById("search")

async function start() {
    let data = await getData()
    if (data != "Error") {
        read(data)
    } else {
        document.getElementById("error-container").classList.add("active")
    }
}
start()

async function isFidevalue() {
    let data = await getData()
    if (data != "Error") {
        if (search.value === "") {
            read(data)
        }
    } else {
        document.getElementById("error-container").classList.add("active")
    }
}
let cards = document.getElementById("cards")
async function read(data) {
    cards.innerHTML = ""
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
        for (let x = 0; x < data[keys[i]].length; x++) {
            let div = document.createElement("div")
            let idParent = `parent${data[keys[i]][x].id}`
            let pricesTaill = data[keys[i]][x].pricesTaill != undefined ? Object.keys(data[keys[i]][x].pricesTaill) : "No"
            if (pricesTaill != "No") {
                let idDiv = ""
                for (let y = 0; y < pricesTaill.length; y++) {
                    idDiv = `${data[keys[i]][x].id}`
                    div.id = `div${idDiv}`
                    div.innerHTML += `<button ${y === 0 ? `class="active"` : ""} onclick="classAndActive('${div.id}' , this , '${keys[i]}'  , ${data[keys[i]][x].id} , '${pricesTaill[y]}', '${idParent}')">${pricesTaill[y]}</button>`

                }

            }
            cards.innerHTML += `
                <div class="product-info" id='${idParent}'>
                    <img src='${data[keys[i]][x].img}' alt='${data[keys[i]][x].name}'>
                    <h3>${data[keys[i]][x].name} ${pricesTaill != "No" ? `(${pricesTaill[0]})` : ""}</h3>
                    ${data[keys[i]][x].description != undefined ? `<p>${data[keys[i]][x].description} </p>` : ""}
                    <span class="price">${pricesTaill === "No" ? data[keys[i]][x].price : data[keys[i]][x].pricesTaill[pricesTaill[0]]}DH</span>
                    ${pricesTaill != "No" ? `<div class="Taill"  id="${div.id}">${div.innerHTML}</div>` : ""}
                    <button onclick="commender(${data[keys[i]][x].id} , '${keys[i]}' , ${pricesTaill != "No" ? `'${pricesTaill[0]}'` : undefined})">Commander</button>
                </div>
            `
        }
    }
}



let categorie = document.getElementById("categorie")
async function CategorieAndoption() {
    let data = await getData()
    if (data != "Error") {
        let keys = Object.keys(data)
        categorie.innerHTML = ""
        for (let i = 0; i < keys.length; i++) {
            if (i === 0) {
                categorie.innerHTML += `<option value="all">toutes les catégories</option> `
            }
            categorie.innerHTML += `<option value="${keys[i]}">${keys[i]}</option> `
        }
    } else {
        document.getElementById("error-container").classList.add("active")
    }
}
CategorieAndoption()
categorie.onchange = async () => {
    let data = await getData()
    if (data != "Error") {
        let dataCaty = data[categorie.value]
        if (categorie.value != "all") {
            let object = { [categorie.value]: dataCaty }
            read(object)
        } else {
            read(data)
        }
    } else {
        document.getElementById("error-container").classList.add("active")
    }
}
async function debutSearch() {
    let motsCle = search.value
    let data = await getData()
    if (data != "Error") {
        let keys = Object.keys(data)
        let searchtrove = false
        let disTrove = false
        let object = {

        }
        for (let i = 0; i < keys.length; i++) {
            for (let x = 0; x < data[keys[i]].length; x++) {
                disTrove = data[keys[i]][x].description != undefined
                if (data[keys[i]][x].name.toLowerCase().includes(motsCle.toLowerCase())) {
                    searchtrove = true
                    if (object[keys[i]] === undefined) {
                        object[keys[i]] = []
                    }
                    object[keys[i]].push(data[keys[i]][x])
                } else if (disTrove) {
                    if (data[keys[i]][x].description.toLowerCase().includes(motsCle.toLowerCase())) {
                        searchtrove = true
                        if (object[keys[i]] === undefined) {
                            object[keys[i]] = []
                        }
                        object[keys[i]].push(data[keys[i]][x])
                    }
                }
            }
        }
        read(object)
        if (!searchtrove) {
            cards.innerHTML = '<p class="no-product">Aucun plat trouvé</p>'
        }
    } else {
        document.getElementById("error-container").classList.add("active")
    }
}

function closeAlret() {
    document.getElementById("error-container").classList.remove("active")
}