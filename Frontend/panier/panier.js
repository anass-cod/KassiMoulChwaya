let PanierKassiChwaya = localStorage.PanierKassiChwaya != null ? JSON.parse(localStorage.PanierKassiChwaya) : []
let table = document.getElementById("table")
function read() {
    let data = false
    table.innerHTML = ""
    for (let i = 0; i < PanierKassiChwaya.length; i++) {
        data = true
        table.innerHTML += `
                <tr>
                    <td><img src="${PanierKassiChwaya[i].img}" alt="${PanierKassiChwaya[i].name}">
                    <td>${PanierKassiChwaya[i].name}</td>
                    <td>${PanierKassiChwaya[i].price}DH</td>
                    <td><div class="quantite"><button ${PanierKassiChwaya[i].quantity === 1 ? "class='minValue'" : ""} id="moin${i}" onclick="moin(${i} , ${+PanierKassiChwaya[i].quantity - 1})">-</button> ${PanierKassiChwaya[i].quantity} <button onclick="plus(${i} , ${+PanierKassiChwaya[i].quantity + 1})">+</button></div></td>
                    <td>${PanierKassiChwaya[i].quantity * PanierKassiChwaya[i].price}DH</td>
                    <td><button onclick="sup(${i})">Suprimer</button></td>
                </tr>
        `
    }
    if (!data) {
        table.innerHTML = `
            <tr>
                <td colspan="6" rowpan="2"> Aucun plat dans le Panier</td>
            </tr>
        `
    }
    spaneTotel()
}
read()
function saveLocalStorageAndRead() {
    localStorage.PanierKassiChwaya = JSON.stringify(PanierKassiChwaya)
    read()
}
function moin(index, value) {
    if (value > 0) {
        PanierKassiChwaya[index].quantity = value
    } else {
        PanierKassiChwaya[index].quantity = 1
    }
    saveLocalStorageAndRead()
}
function plus(index, value) {
    PanierKassiChwaya[index].quantity = value
    saveLocalStorageAndRead()
}
function sup(index) {
    PanierKassiChwaya.splice(index, 1)
    saveLocalStorageAndRead()
}
function gettotal() {
    let total = 0
    for (let i = 0; i < PanierKassiChwaya.length; i++) {
        total += (PanierKassiChwaya[i].price * PanierKassiChwaya[i].quantity)
    }
    return total
}
function spaneTotel() {
    let total = gettotal()
    let totalSpan = document.getElementById("total")
    totalSpan.innerHTML = `${total}DH`
}
function confirme() {
    if (PanierKassiChwaya.length > 0) {
        showConfirm()
        let div = document.getElementById("commendes")
        div.innerHTML = ""
        for (let i = 0; i < PanierKassiChwaya.length; i++) {
            div.innerHTML += `
             <span>${PanierKassiChwaya[i].name} × ${PanierKassiChwaya[i].quantity} = <strong>${PanierKassiChwaya[i].quantity * PanierKassiChwaya[i].price}DH</strong></span>
            `
            if (i === (PanierKassiChwaya.length - 1)) {
                div.innerHTML += ` <span>Total : <strong>${gettotal()}DH</strong></span>`
            }
        }
    }
}

let confirmBox = document.getElementById("confirm")
let ok = document.getElementById("ok")
let no = document.getElementById("no")

function showConfirm() {
    confirmBox.classList.add("active")
}

ok.onclick = () => {
    document.getElementById('mssgLivrison').style.color = "#666666"
    let NumeroUtilise = null
    document.querySelectorAll("#InputLocalisation input").forEach(e => {
        if (e.checked) {
            if (e.value === "Rwa") {
                NumeroUtilise = "212691516191"
            } else {
                NumeroUtilise = "212657593374"
            }
        }
    })
    if(NumeroUtilise === null){
        document.getElementById('mssgLivrison').style.color = "red"
        return
    }
    confirmBox.classList.remove("active")
    try {
        let commende = ""
        for (let i = 0; i < PanierKassiChwaya.length; i++) {
            commende += `\n${PanierKassiChwaya[i].quantity} × ${PanierKassiChwaya[i].name} = ${PanierKassiChwaya[i].quantity * PanierKassiChwaya[i].price}DH`
        }
        let total = gettotal()
        commende += `\nTotal : ${total}DH`
        const message = `Bonjour, je souhaite confirmer ma commande : ${commende} `;

        const phone = NumeroUtilise;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

        PanierKassiChwaya.splice(0)
        localStorage.PanierKassiChwaya = JSON.stringify(PanierKassiChwaya)
        read()
    } catch (err) {
        showError()
    }


}
function chekedRadio(place){
    document.getElementById(`${place}`).checked = true
}
    document.getElementById(`rwa`).checked = true


no.onclick = () => {
    confirmBox.classList.remove("active")
}
const errorMessage = document.getElementById("errorMessage");

function showError() {
    errorMessage.classList.add("active");

    setTimeout(() => {
        errorMessage.classList.remove("active");
    }, 3000);
}

