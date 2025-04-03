// LOADING DIV element
function loadHTML (elementId, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data
    })
    .catch(error => console.error(`Error loading ${filePath}:`, error))
}

loadHTML('header', '../HTML/header.html')
loadHTML('contact_us', '../HTML/contact_us.html')
