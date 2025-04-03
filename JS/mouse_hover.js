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
