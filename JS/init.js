import { themeCycle, settingThemeOnload } from './theme.js'
import { mouseHoverLogo, mouseHoverDropdown } from './mouse_touch.js'
import { call_contact } from './call_contact.js'
import { loadGlobals } from './globals.js'

async function loadHTML(id, url) {
    const response = await fetch(url)
    const html = await response.text()
    document.getElementById(id).innerHTML = html
}

async function init() {
    await loadHTML('header', '../HTML/header.html')
    await loadHTML('about_us', '../HTML/about_us.html')
    await loadHTML('catalog', '../HTML/catalog.html')
    await loadHTML('footer', '../HTML/footer.html')

    const globals = loadGlobals()

    settingThemeOnload(globals)
    mouseHoverLogo(globals.LOGO)
    mouseHoverDropdown()
}

init()
window.themeCycle = themeCycle
window.call_contact = call_contact