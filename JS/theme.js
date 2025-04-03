import {
    BODY,
    LOGO,
    DROPARROW,
    MENU,
    ThemeList,
    ThemeColors,
    BUTTONS
} from './globals.js'

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
    console.log('radi')
    // Uzimanje boja iz objekta ThemeColors preko trenutne teme iz LocalStorage
    let currentTheme = localStorage.getItem('theme')
    let PresetColors = ThemeColors[currentTheme]
    let logoType
    const dropdownMenus = document.querySelectorAll('.dropdownMenu')

    // Postavljanje boja na osnovu trenutne teme (SETTER)
    BODY.style.backgroundColor = PresetColors.primary
    BODY.style.color = PresetColors.text
    DROPARROW.src = PresetColors.dropdownArrow
    BUTTONS.forEach(link => {
        link.style.backgroundColor = PresetColors.secondary
        link.style.color = PresetColors.text
    })

    styleToDropdown(dropdownMenus, PresetColors.primary, PresetColors.secondary)
    window.addEventListener('resize', () => {
        styleToDropdown(dropdownMenus, PresetColors.primary, PresetColors.secondary)
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

// Postavlja bordere na padajuce menije
function styleToDropdown(dropdownMenus, primaryColor, secondaryColor) {
    dropdownMenus.forEach(menu => {
        if (
            !menu.classList.contains('false') ||
            window.matchMedia('(max-width: 550px)').matches
        ) {
            menu.style.border = `3px solid ${secondaryColor}`
            menu.style.backgroundColor = primaryColor

            const menuElements = Array.from(menu.children)
            menuElements.forEach(element => {
                dropdownEleHoverColor(element, secondaryColor)
            })
        } else {
            menu.style.border = `none`
            menu.style.backgroundColor = ''

            const menuElements = Array.from(menu.children)
            menuElements.forEach(element => {
                dropdownEleHoverColor(element, '')
            })
        }
    })
}

// Postavlja color na elemente padajuceg menija
function dropdownEleHoverColor(element, color) {
    element.addEventListener('mouseover', () => {
        element.style.backgroundColor = color
    })
    element.addEventListener('mouseout', () => {
        element.style.backgroundColor = '' // Vraćanje originalne pozadine
    })
}

window.onload = function () {
    settingDayTheme()
}
