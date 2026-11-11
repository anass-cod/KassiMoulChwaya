let dataPanier = localStorage.dataPanier != null ? JSON.parse(localStorage.dataPanier) : []
let table = document.getElementById("table")
function read() {
    let data = false
    table.innerHTML = ""
    for (let i = 0; i < dataPanier.length; i++) {
        data = true
        table.innerHTML += `
                <tr>
                    <td><img src="${dataPanier[i].img}" alt="${dataPanier[i].name}">
                    <td>${dataPanier[i].name}</td>
                    <td>${dataPanier[i].price}DH</td>
                    <td><div class="quantite"><button ${dataPanier[i].quantity === 1 ? "class='minValue'" : ""} id="moin${i}" onclick="moin(${i} , ${+dataPanier[i].quantity - 1})">-</button> ${dataPanier[i].quantity} <button onclick="plus(${i} , ${+dataPanier[i].quantity + 1})">+</button></div></td>
                    <td>${dataPanier[i].quantity * dataPanier[i].price}DH</td>
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
    localStorage.dataPanier = JSON.stringify(dataPanier)
    read()
}
function moin(index, value) {
    if (value > 0) {
        dataPanier[index].quantity = value
    } else {
        dataPanier[index].quantity = 1
    }
    saveLocalStorageAndRead()
}
function plus(index, value) {
    dataPanier[index].quantity = value
    saveLocalStorageAndRead()
}
function sup(index) {
    dataPanier.splice(index, 1)
    saveLocalStorageAndRead()
}
function gettotal() {
    let total = 0
    for (let i = 0; i < dataPanier.length; i++) {
        total += (dataPanier[i].price * dataPanier[i].quantity)
    }
    return total
}
function spaneTotel() {
    let total = gettotal()
    let totalSpan = document.getElementById("total")
    totalSpan.innerHTML = `${total}DH`
}
function confirme() {
    if (dataPanier.length > 0) {
        showConfirm()
        let div = document.getElementById("commendes")
        div.innerHTML = ""
        for (let i = 0; i < dataPanier.length; i++) {
            div.innerHTML += `
             <span>${dataPanier[i].name} × ${dataPanier[i].quantity} = <strong>${dataPanier[i].quantity * dataPanier[i].price}DH</strong></span>
            `
            if (i === (dataPanier.length - 1)) {
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
        for (let i = 0; i < dataPanier.length; i++) {
            commende += `\n${dataPanier[i].quantity} × ${dataPanier[i].name} = ${dataPanier[i].quantity * dataPanier[i].price}DH`
        }
        let total = gettotal()
        commende += `\nTotal : ${total}DH`
        const message = `Bonjour, je souhaite confirmer ma commande : ${commende} `;

        const phone = NumeroUtilise;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

        dataPanier.splice(0)
        localStorage.dataPanier = JSON.stringify(dataPanier)
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

