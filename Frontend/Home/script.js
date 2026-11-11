function email() {
    let url = "https://mail.google.com/mail/?view=cm&fs=1&to=mouadkassi2022@gmail.com"
    window.open(url, "_blank")
}
function wathsape() {
    let url = "https://wa.me/212657593374"
    window.open(url, "_blank")
}

function toggleMenu() {
    let navLink = document.getElementById("nav-links")
    navLink.classList.toggle("active");
    if(innerWidth <= 700){
        document.querySelectorAll("#nav-links a").forEach(e => e.onclick = () => {
            navLink.classList.remove("active")
        } )
    }
}



