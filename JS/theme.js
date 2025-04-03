import { BODY, LOGO, DROPARROW, MENU, ThemeList, ThemeColors, BUTTONS } from './globals.js'

// Logo dugme koje menja temu (SWAP PRESETS)
function themeSwapper() {
    const THEME = localStorage.getItem('theme')
    let currentIndex = ThemeList.indexOf(THEME)

    // Iteracija kroz listu tema
    // Ako je trenutna tema poslednja u listi, postavi na prvu temu
    let newIndex = (currentIndex + 1) % ThemeList.length
    let newTheme = ThemeList[newIndex]
    localStorage.setItem('theme', newTheme)

    let Time = parseFloat(localStorage.getItem('Time'))
    let newTime = (Time + 8) % 24

    localStorage.setItem('Time', newTime)
    settingTheme(newTime, true)
}
window.themeSwapper = themeSwapper // Izlaganje funkcije za globalnu upotrebu

// Promena teme na osnovu trenutnog vremena
function settingDayTheme() {
    const Time = localStorage.getItem('Time')

    if (Time >= 4 && Time < 12) {
        localStorage.setItem('theme', 'morning')
    } else if (Time >= 12 && Time < 20) {
        localStorage.setItem('theme', 'afternoon')
    } else {
        localStorage.setItem('theme', 'night')
    }
    settingTheme(Time)
}

// Postavljanje teme na osnovu dobijenog argumenta (SETTER)
function settingTheme(Time, Hovered = null) {
    // Uzimanje boja iz objekta ThemeColors preko trenutne teme iz LocalStorage
    let currentTheme = localStorage.getItem('theme')
    let PresetColors = ThemeColors[currentTheme]
    let logoType

    // Postavljanje boja na osnovu trenutne teme (SETTER)
    BODY.style.backgroundColor = PresetColors.primary
    BODY.style.color = PresetColors.text
    DROPARROW.src = PresetColors.dropdownArrow
    BUTTONS.forEach(link => {
        link.style.backgroundColor = PresetColors.buttons
        link.style.color = PresetColors.text
    })

    // Promena LOGO-a na osnovu trenutnog vremena i hover stanja
    if (
        (Time >= 23 && Time < 24) || // 23:00 - 24:00
        (Time >= 0 && Time < 1) || //  0:00 -  1:00
        (Time >= 7 && Time < 9) || //  7:00 -  9:00
        (Time >= 15 && Time < 17) // 15:00 - 17:00
    ) {
        if (!Hovered) {
            logoType = 'fire'
        } else {
            logoType = 'simple'
        }
    } else {
        if (!Hovered) {
            logoType = 'simple'
        } else {
            logoType = 'fire'
        }
    }

    // Postavljanje LOGO-a (SETTER)
    LOGO.src = `Images/Logo/logo_${currentTheme}_${logoType}.webp`
    MENU.src = `Images/Other/dropdown-menu-${currentTheme}.svg`
}

window.onload = function () {
    settingDayTheme()
}
