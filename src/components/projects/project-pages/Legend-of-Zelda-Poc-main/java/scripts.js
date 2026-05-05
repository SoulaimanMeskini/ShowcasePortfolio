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

// loader // 
var loader

function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function() {
            loadNow(opacity - 0.03)
        }, 100);
    }
}

function displayContent() {
    loader.style.display = 'none';
    // Content is already displayed, no need to show a content element
}

document.addEventListener("DOMContentLoaded", function() {
    loader = document.getElementById('loader');
    loadNow(1)
});