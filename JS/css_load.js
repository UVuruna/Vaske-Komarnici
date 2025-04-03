// LOADING CSS styling
function loadStyle (url) {
  if (!document.querySelector(`link[href="${url}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
  }
}

loadStyle('../CSS/root.css')
loadStyle('../CSS/header.css')

loadStyle('../CSS/contact_us.css')
