//prush start button 

// document.getElementById("buttonStart").addEventListener("click", function() {
//     console.log('fff')
//     document.getElementsByClassName("filter").classList.add("visable");


// })

/* cursor*/

const cursor = document.querySelector('.pointer');
document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");
    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})

/*var names*/

const TRAVELER = localStorage.getItem('TRAVELER');

const ZELDA = localStorage.getItem('ZELDA');
const ZELDA2 = localStorage.getItem('ZELDA');
const ZELDA3 = localStorage.getItem('ZELDA');

const GANNON = localStorage.getItem('GANNON');
const GANNON2 = localStorage.getItem('GANNON');

console.log(TRAVELER + " " + ZELDA + " " + GANNON + " " + ZELDA2 + " " + GANNON2 + " " + ZELDA3);

document.getElementById('TRAVELER').innerHTML = ' " ' + TRAVELER + ' " ';

document.getElementById('ZELDA').innerHTML = ZELDA;
document.getElementById('ZELDA2').innerHTML = "THE LEGEND OF " + ZELDA;
document.getElementById('ZELDA3').innerHTML = ' " ' + ZELDA + ' " ';

document.getElementById('GANNON').innerHTML = ' " ' + GANNON + ' " ';
document.getElementById('GANNON2').innerHTML = ' " ' + GANNON + ' " ';