function openNav() {
    //document.body.style.overflow = "hidden";
    //document.getElementById("opacity").style.opacity = "50%";
    document.getElementById("opacity").style.height = "100vh";
    document.getElementById("sidenav").style.width = "200px";
    //document.body.style.marginLeft = "30vw";
}

function closeNav() {
    //document.body.style.overflow = "auto";
    //document.getElementById("opacity").style.opacity = "100%";
    document.getElementById("opacity").style.height = "0";
    document.getElementById("sidenav").style.width = "0";
    //document.body.style.marginLeft = "0";
}

let i = 0;
let txt = 'Welcome to Yusuf Official Portfolio Website';

/*function typing() {
    if (i < txt.length) {
        document.getElementById("typing").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typing, 50);
    }
}*/

function scrollbar() {
    let winscroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = ( winscroll / height ) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

//window.onload = typing
window.onscroll = scrollbar;

function totop() {
    document.body.scrollTop = "0"
    document.documentElement.scrollTop = "0"
}