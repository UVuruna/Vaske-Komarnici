export function selecting () {
  const type = ['Both', 'One']
  const color = ['White', 'Brown', 'Antracite']
  const shade = ['Light', 'Dark']

  document.querySelectorAll('.selectFrame img, .selectFrame i').forEach(selector => {
    
    selector.onclick = function () {
      
      const section = this.closest('section')

      const image = Array.from(section.children).find(
        child => child.tagName.toLowerCase() === 'img'
      )
      let imageSRC = image.getAttribute('src')

      image.style.opacity = 0
      setTimeout(() => {
        if (this.tagName !== 'I') {
          const name = this.getAttribute('src').split('/').pop().split('.')[0] // White,Brown,Antracite,Light,Dark,Both,One

          if (!imageSRC.includes('_')) {
            imageSRC = imageSRC.replace('.webp', '') + '_White-Light.webp'
          }

          const list = [type, color, shade].find(list => list.includes(name))
          if (list) {
            const change = list.find(item => imageSRC.includes(item))
            if (change) {
              image.src = imageSRC.replace(change, name)
            }
          }
        } else {
          const parts = imageSRC.split('/')
          const change = parts.pop().split('.')[0].split('_')[0]
          const newSRC = parts.join('/')
          image.src = `${newSRC}/${change}.webp`
        }

        setTimeout(() => {
          image.style.opacity = 1
        }, 100)
      }, 500)
    }
  })
}
