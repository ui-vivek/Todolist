const mode=document.getElementById("mode")
const icon=document.getElementById("icon")
let theam=document.querySelector('data-theme')
const html = document.querySelector('html');
const theme = localStorage.getItem('theme');

function ChangeMode(){
    if(icon.className=='bx bxs-moon bx-sm'){
        icon.className='bx bxs-sun bx-sm';
        mode.style.backgroundColor="white";
        html.setAttribute('data-theme', 'luxury');
        localStorage.setItem('theme', 'luxury');
    }else{
        icon.className='bx bxs-moon bx-sm'
        mode.style.backgroundColor="black";
        html.setAttribute('data-theme', 'bumblebee');
        localStorage.setItem('theme', 'bumblebee');
    }
}

mode.addEventListener('click',ChangeMode)