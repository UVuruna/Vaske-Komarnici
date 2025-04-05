
export function loadGlobals () {
  return {
    LOGO: document.getElementById('logo'),
    HOME: document.getElementById('about_us'),
    MENU: document.getElementById('menu-icon'),
    DROPARROW: document.getElementById('dropdown-arrow'),
    BUTTONS: document.querySelectorAll('button')
  }
}

export const ThemeList = ['morning', 'noon', 'afternoon', 'night']

const currentDate = new Date()
const minutes = currentDate.getMinutes()
const Time = currentDate.getHours() + minutes / 60
localStorage.setItem('Time', Time)

if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', ThemeList[1])
}

export const ThemeColors = {
  morning: {
    text: 'rgb(0, 0, 0)',
    primary: 'rgb(100, 180, 250)',
    primaryElement: 'rgb(0, 160, 0)',
    secondary: 'rgb(60, 135, 220)',
    secondaryElement: 'rgb(20, 200, 120)',
    dropdownArrow: 'Images/Other/dropdown-arrow-black.svg'
  },
  noon: {
    text: 'rgb(255, 255, 255)',
    primary: 'rgb(75, 75, 75)',
    primaryElement: 'rgb(145, 115, 0)',
    secondary: 'rgb(200, 200, 180)',
    secondaryElement: 'rgb(255, 179, 0)',
    dropdownArrow: 'Images/Other/dropdown-arrow-white.svg'
  },
  afternoon: {
    text: 'rgb(0, 0, 0)',
    primary: 'rgb(250, 180, 100)',
    primaryElement: 'rgb(230, 40, 40)',
    secondary: 'rgb(220, 135, 60)',
    secondaryElement: 'rgb(255, 100, 100)',
    dropdownArrow: 'Images/Other/dropdown-arrow-black.svg'
  },
  night: {
    text: 'rgb(255, 255, 255)',
    primary: 'rgb(35, 35, 35)',
    primaryElement: 'rgb(100, 0, 200)',
    secondary: 'rgb(160, 160, 160)',
    secondaryElement: 'rgb(180, 140, 250)',
    dropdownArrow: 'Images/Other/dropdown-arrow-white.svg'
  }
}
