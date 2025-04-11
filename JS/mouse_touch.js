export function mouseHoverLogo (LOGO) {
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
}

export function mouseHoverDropdown () {
  const menuIcon = document.getElementById('menu-icon')
  const pagesSpans = document.querySelector('.menu')

  menuIcon.addEventListener('click', e => {
    e.stopPropagation()
    pagesSpans.classList.toggle('show')
  })

  document.body.addEventListener('click', () => {
    pagesSpans.classList.remove('show')
  })

  document.querySelector('nav').addEventListener('click', e => {
    e.stopPropagation()
  })
}
