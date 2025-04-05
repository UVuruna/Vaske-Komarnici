import { loadGlobals, ThemeList, ThemeColors } from './globals.js'
export let LOGO
let HOME, MENU, DROPARROW, BUTTONS


export function themeCycle() {
    const THEME = localStorage.getItem('theme')
    let currentIndex = ThemeList.indexOf(THEME)
    let newIndex = (currentIndex + 1) % ThemeList.length
    localStorage.setItem('theme', ThemeList[newIndex])

    settingTheme(true)
}


export function settingThemeOnload(globals) {
    LOGO = globals.LOGO;
    HOME = globals.HOME;
    MENU = globals.MENU;
    DROPARROW = globals.DROPARROW;
    BUTTONS = globals.BUTTONS;

    const Time = localStorage.getItem('Time')

    if (Time >= 4 && Time < 9) {
        localStorage.setItem('theme', 'morning')
    } else if (Time >= 9 && Time < 16) {
        localStorage.setItem('theme', 'noon')
    } else if (Time >= 16 && Time < 21) {
        localStorage.setItem('theme', 'afternoon')
    } else {
        localStorage.setItem('theme', 'night')
    }
    
    //localStorage.setItem('theme', 'afternoon') // TESTING PURPOSES
    settingTheme()
}


export function settingTheme(Hovered = null) {

    let currentTheme = localStorage.getItem('theme')
    let PresetColors = ThemeColors[currentTheme]
    let logoType
    const dropdownMenus = document.querySelectorAll('#header ul')

    document.body.style.backgroundColor = PresetColors.primary
    document.body.style.color = PresetColors.text
    HOME.style.backgroundColor = PresetColors.secondary
    DROPARROW.src = PresetColors.dropdownArrow
    BUTTONS.forEach(link => {
        link.style.backgroundColor = PresetColors.primaryElement
        link.style.color = PresetColors.text
    })

    configDropdown(
        dropdownMenus,
        PresetColors.primary,
        PresetColors.primaryElement
    )
    window.addEventListener('resize', () => {
        configDropdown(
            dropdownMenus,
            PresetColors.primary,
            PresetColors.primaryElement
        )
    })

    const Time = localStorage.getItem('Time')
    if (
        (Time >= 6 && Time < 7) ||
        (Time >= 12 && Time < 13) ||
        (Time >= 18 && Time < 19) ||
        Time < 1
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

    LOGO.src = `Images/Logo/logo_${currentTheme}_${logoType}.webp`
    MENU.src = `Images/Other/dropdown-menu-${currentTheme}.svg`
}


export function configDropdown(dropdownMenus, primaryColor, secondaryColor) {
    dropdownMenus.forEach(menu => {
        if (
            !menu.classList.contains('menu') ||
            window.matchMedia('(max-width: 750px)').matches
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


export function dropdownEleHoverColor(element, color) {
    element.addEventListener('mouseover', () => {
        element.style.backgroundColor = color
    })
    element.addEventListener('mouseout', () => {
        element.style.backgroundColor = '' 
    })
}