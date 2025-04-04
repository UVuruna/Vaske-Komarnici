export const LOGO = document.getElementById('logo') // Logo Icon
export const BODY = document.getElementsByTagName('body')[0] // Body
export const MENU = document.getElementById('menu-icon') // Menu Icon
export const DROPARROW = document.getElementById('dropdown-arrow') // Dropdown Arrow
export const ThemeList = ['morning', 'afternoon', 'night'] // Available Themes
export const BUTTONS = document.querySelectorAll('button') // All Buttons

if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', ThemeList[0])
}

// Login Time - for day theme
const currentDate = new Date()
const minutes = currentDate.getMinutes()
const Time = currentDate.getHours() + minutes / 60
localStorage.setItem('Time', Time)

// Dict for Themes (Color Pallete)
export const ThemeColors = {
    morning: {
        text: 'rgb(35, 35, 35)',
        primary: 'rgb(100, 180, 250)',
        primaryElement: 'rgb(0, 160, 0)',
        secondary: 'rgb(20, 80, 180)',
        secondaryElement: 'rgb(20, 200, 120)',
        dropdownArrow: 'Images/Other/dropdown-arrow-black.svg'
    },
    afternoon: {
        text: 'rgb(35, 35, 35)',
        primary: 'rgb(250, 180, 100)',
        primaryElement: 'rgb(200, 0, 0)',
        secondary: 'rgb(255, 255, 120)',
        secondaryElement: 'rgb(20, 200, 120)',
        dropdownArrow: 'Images/Other/dropdown-arrow-black.svg'
    },
    night: {
        text: 'rgb(255, 255, 255)',
        primary: 'rgb(35, 35, 35)',
        primaryElement: 'rgb(100, 0, 200)',
        secondary: 'rgb(100, 100, 100)',
        secondaryElement: 'rgb(180, 140, 250)',
        dropdownArrow: 'Images/Other/dropdown-arrow-white.svg'
    }
}
