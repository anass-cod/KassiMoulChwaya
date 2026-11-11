

async function getData() {
    try {
        let reponse = await fetch('../../Backend/main.json')
        if (!reponse.ok) {
            throw new Error("error")
        }
        let data = await reponse.json()
        return data
    } catch (err) {
        return "Error"
    }
}
async function classAndActive(id, item, categorie, idItem, taill, parent) {
    let data = await getData()
    if (data != "Error") {
        let prds = data[categorie].find(e => e.id === idItem)
        let pricesTaill = Object.keys(prds.pricesTaill)
        document.querySelector(`#${parent} h3`).innerHTML = `${prds.name} (${taill})`
        document.querySelector(`#${parent} span`).innerHTML = `${prds.pricesTaill[taill]}DH`
        document.querySelector(`#${parent} > button`).outerHTML = `<button onclick="commender(${prds.id} , '${categorie}' , '${taill}' )">Commander</button>`
        document.querySelectorAll(`#${id} button`).forEach(e => e.classList.remove("active"))
        item.classList.add("active")
    } else {
        document.getElementById("error-container").classList.add("active")
    }

}

let setim = null
async function commender(id, catygory, taill) {

    let PanierKassiChwaya = localStorage.PanierKassiChwaya != null ? JSON.parse(localStorage.PanierKassiChwaya) : []
    if (setim != null) {
        clearTimeout(setim)
    }
    let trv = false
    let index = null
    for (let i = 0; i < PanierKassiChwaya.length; i++) {
        if (PanierKassiChwaya[i].id === id || PanierKassiChwaya[i].id === `${id}(${taill})`) {
            trv = true
            index = i
        }
    }

    let alert = document.getElementById('alert')

    if (trv) {
        PanierKassiChwaya[index].quantity += 1
        localStorage.PanierKassiChwaya = JSON.stringify(PanierKassiChwaya)

    } else {
        let data = await getData()
        let produit = data[catygory].find(e => e.id === id)
        if (produit) {
            if (data != "Error") {
                if (taill === undefined) {
                    produit.quantity = 1
                    PanierKassiChwaya.push(produit)
                } else {
                    let object = {
                        id: `${id}(${taill})`,
                        name: `${produit.name} (${taill})`,
                        quantity: 1,
                        price: produit.pricesTaill[taill],
                        img : produit.img

                    }
                    PanierKassiChwaya.push(object)
                }
                localStorage.PanierKassiChwaya = JSON.stringify(PanierKassiChwaya)
            } else {
                document.getElementById("error-container").classList.add("active")
                return
            }
        } else {
            document.getElementById("error-container").classList.add("active")
            return
        }
    }
    alert.classList.add("active")
    setim = setTimeout(() => {
        alert.classList.remove("active")
    }, 5000)
}
function closeAlret() {
    document.getElementById("error-container").classList.remove("active")
}