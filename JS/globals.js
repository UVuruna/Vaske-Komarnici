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
        primary: 'rgb(90, 170, 255)',
        secondary: 'rgb(60, 60, 255)',
        tertiary: 'rgb(130, 255, 130)',
        buttons: 'rgb(0, 160, 0)',
        dropdownArrow: 'Images/Other/dropdown-arrow-black.svg'
    },
    afternoon: {
        text: 'rgb(35, 35, 35)',
        primary: 'rgb(255, 190, 130)',
        secondary: 'rgb(255, 170, 90)',
        tertiary: 'rgb(255, 255, 120)',
        buttons: 'rgb(200, 0, 0)',
        dropdownArrow: 'Images/Other/dropdown-arrow-black.svg'
    },
    night: {
        text: 'rgb(255, 255, 255)',
        primary: 'rgb(35, 35, 35)',
        secondary: 'rgb(160, 160, 160)',
        tertiary: 'rgb(29, 0, 60)',
        buttons: 'rgb(100, 0, 200)',
        dropdownArrow: 'Images/Other/dropdown-arrow-white.svg'
    }
}
