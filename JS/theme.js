import { ThemeList, ThemeColors } from './globals.js'
export let LOGO
let MENU, LightFrames, BUTTONS, ListItems, selectorFrames

export function themeCycle () {
  const THEME = localStorage.getItem('theme')
  let currentIndex = ThemeList.indexOf(THEME)
  let newIndex = (currentIndex + 1) % ThemeList.length
  localStorage.setItem('theme', ThemeList[newIndex])

  settingTheme(true)
}

export function settingThemeOnload (globals) {
  LOGO = globals.LOGO
  MENU = globals.MENU
  LightFrames = globals.LightFrames
  BUTTONS = globals.BUTTONS
  ListItems = globals.ListItems
  selectorFrames = globals.selectorFrames

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

  //localStorage.setItem('theme', 'noon') // TESTING PURPOSES
  settingTheme()
}

export function settingTheme (Hovered = null) {
  let currentTheme = localStorage.getItem('theme')
  let PresetColors = ThemeColors[currentTheme]
  let logoType
  const dropdownMenus = document.querySelectorAll('#header ul')

  document.body.style.backgroundColor = PresetColors.primary

  LightFrames.forEach(frame => {
    frame.style.backgroundColor = PresetColors.secondary
    if (frame.tagName === 'LI') {
      frame.style.border = `3px solid ${PresetColors.primaryElement}`
      frame.style.boxShadow = `0 0 10px ${PresetColors.primaryElement}, 0 0 10px ${PresetColors.primaryElement}`

      frame.addEventListener('mouseover', () => {
        frame.style.boxShadow = `0 0 15px ${PresetColors.secondaryElement}, 0 0 25px ${PresetColors.secondaryElement}`
      })
      frame.addEventListener('mouseout', () => {
        frame.style.boxShadow = `0 0 10px ${PresetColors.primaryElement}, 0 0 10px ${PresetColors.primaryElement}`
      })
    }
  })

  BUTTONS.forEach(link => {
    link.style.backgroundColor = PresetColors.primaryElement
    if (link.classList.contains('cta-button')) {
      link.style.boxShadow = `5px 5px 20px ${PresetColors.primaryElement}, -5px -5px 20px ${PresetColors.primaryElement}`

      link.addEventListener('mouseover', () => {
        link.style.boxShadow = `0 0 25px ${PresetColors.secondaryElement}, 0 0 50px ${PresetColors.secondaryElement}`
        link.style.backgroundColor = PresetColors.secondaryElement
      })
      link.addEventListener('mouseout', () => {
        link.style.boxShadow = `5px 5px 20px ${PresetColors.primaryElement}, -5px -5px 20px ${PresetColors.primaryElement}`
        link.style.backgroundColor = PresetColors.primaryElement
      })
    }
  })

  ListItems.forEach(item => {
    item.style.color = PresetColors.primaryElement
    item.style.webkitTextStroke = `0.5px ${PresetColors.secondaryElement}`
    item.style.fontWeight = '600'
    item.style.cursor = 'pointer'
    item.style.fontSize = '1.1rem'
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

  LOGO.src = `img/logo/logo_${currentTheme}_${logoType}.webp`
  MENU.src = `img/other/dropdown-menu-${currentTheme}.svg`
}

export function configDropdown (dropdownMenus, primaryColor, secondaryColor) {
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

export function dropdownEleHoverColor (element, color) {
  element.addEventListener('mouseover', () => {
    element.style.backgroundColor = color
  })
  element.addEventListener('mouseout', () => {
    element.style.backgroundColor = ''
  })
}
