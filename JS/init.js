import { themeCycle, settingThemeOnload } from './theme.js'
import { mouseHoverLogo, mouseHoverDropdown } from './mouse_touch.js'
import { call_contact } from './call_contact.js'
import { loadGlobals } from './globals.js'
import { videoLoop, videoPlay } from './video.js'
import { selecting } from './selecting.js'

async function loadHTML (id, url) {
  const response = await fetch(url)
  const html = await response.text()
  document.getElementById(id).innerHTML = html
}

async function init () {
  await loadHTML('about_us', '../html/about_us.html')
  await loadHTML('catalogue', '../html/catalogue.html')

  const globals = loadGlobals()

  settingThemeOnload(globals)
  mouseHoverLogo(globals.LOGO)
  mouseHoverDropdown()
  videoPlay(globals.videos)
  videoLoop(globals.videos)
  selecting()
}

init()

window.themeCycle = themeCycle
window.call_contact = call_contact
