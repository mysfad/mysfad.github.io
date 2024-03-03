function openNav() {
    document.getElementById("sidenav").style.width = "100vw";
    //document.body.style.marginLeft = "0";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0";
    //document.body.style.marginLeft = "0";
}

let i = 0
let txt = 'Welcome to Yusuf Official Portfolio Website'

function typing() {
    if (i < txt.length) {
        document.getElementById("typing").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typing, 50);
    }
}

function scrollbar() {
    let winscroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = ( winscroll / height ) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

window.onload = typing
window.onscroll = scrollbar