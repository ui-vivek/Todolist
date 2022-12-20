const mode=document.getElementById("mode")
const icon=document.getElementById("icon")
let theam=document.querySelector('data-theme')
const html = document.querySelector('html');
const theme = localStorage.getItem('theme');

html.setAttribute('data-theme',theme);
if(theme=='luxury'){
    icon.className='bx bxs-sun bx-sm';
    mode.style.backgroundColor="white";
    html.setAttribute('data-theme', 'luxury');

}else{
    html.setAttribute('data-theme', 'bumblebee');
    icon.className='bx bxs-moon bx-sm'
    mode.style.backgroundColor="black";
}

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
