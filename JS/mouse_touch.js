import { LOGO } from './globals.js'

// Ovaj deo koda se koristi za promenu slike logotipa na hover
// i na izlazak miša sa logotipa

LOGO.addEventListener('mouseover', () => {
    let newSrc
    if (LOGO.src.includes('fire')) {
        newSrc = LOGO.src.replace('fire', 'simple')
    } else {
        newSrc = LOGO.src.replace('simple', 'fire')
    }
    LOGO.src = newSrc
})

LOGO.addEventListener('mouseout', () => {
    let newSrc
    if (LOGO.src.includes('fire')) {
        newSrc = LOGO.src.replace('fire', 'simple')
    } else {
        newSrc = LOGO.src.replace('simple', 'fire')
    }
    LOGO.src = newSrc
})

// HEADER Menu Dropdown
const menuIcon = document.getElementById('menu-icon');
const pagesSpans = document.querySelector('.dropdownMenu'); // Ovo radi samo zato sto treba prvi dropdown menu

// Dodavanje event listener-a za klik na menu-icon
menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    pagesSpans.classList.toggle('show');
});

document.body.addEventListener("click", function() {
    pagesSpans.classList.remove('show'); // Zatvara dropdown bilo koji klik na body
});
document.querySelector(".dropdownMenu").addEventListener("click", function(e) {
    e.stopPropagation(); // Sprečava da klik ide do body
});

