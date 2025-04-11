export function loadGlobals () {
  return {
    LOGO: document.getElementById('logo'),
    MENU: document.getElementById('menu-icon'),
    BUTTONS: document.querySelectorAll('button'),
    LightFrames: document.querySelectorAll(
      '#about_us, .selectFrame > *:not(:first-child)'
    ),
    ListItems: document.querySelectorAll('li strong'),
    videos: document.querySelectorAll('.video-loop')
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
    primary: 'rgb(35, 88, 141)',
    secondary: 'rgb(245, 255, 255)',
    primaryElement: 'rgb(37, 125, 37)',
    secondaryElement: 'rgb(19, 85, 19)'
  },
  noon: {
    primary: 'rgb(100, 100, 100)',
    secondary: 'rgb(255, 254, 245)',
    primaryElement: 'rgb(140, 105, 0)',
    secondaryElement: 'rgb(92, 63, 2)'
  },
  afternoon: {
    primary: 'rgb(104, 65, 25)',
    secondary: 'rgb(255, 252, 248)',
    primaryElement: 'rgb(123, 50, 50)',
    secondaryElement: 'rgb(111, 19, 19)'
  },
  night: {
    primary: 'rgb(70, 70, 70)',
    secondary: 'rgb(252, 248, 255)',
    primaryElement: 'rgb(102, 59, 144)',
    secondaryElement: 'rgb(64, 28, 106)'
  }
}
