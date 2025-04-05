export async function loadHTML(id, url) {
    const response = await fetch(url)
    const html = await response.text()
    document.getElementById(id).innerHTML = html
}
