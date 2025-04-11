export function videoLoop (videos) {
  videos.forEach(video => {
    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= 9) {
        video.currentTime = 0
        video.play()
      }
    })
  })
}

export function videoPlay (videos) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target
        if (entry.isIntersecting) {
          video.play()
        } else {
          video.pause()
        }
      })
    },
    {
      threshold: 1
    }
  )

  videos.forEach(video => {
    video.pause()
    observer.observe(video)
  })
}

export function loadVideo (videoID, videoName = null) {
  const checkElementInterval = setInterval(() => {
    const videoElement = document.getElementById(videoID)

    if (videoElement) {
      clearInterval(checkElementInterval)

      if (videoName) {
        videoElement.innerHTML = `
                    <source src="../img/items/showroom/${videoName}.mp4" type="video/mp4" />
                    <source src="../img/items/showroom/${videoName}.webm" type="video/webm" />
                    <source src="../img/items/showroom/${videoName}_h264.mp4" type="video/mp4" />
                `
      } else {
        if (window.innerWidth >= 680) {
          videoElement.innerHTML = `
                        <source src="../img/items/showroom/showcase_PC.mp4" type="video/mp4" />
                        <source src="../img/items/showroom/showcase_PC.webm" type="video/webm" />
                        <source src="../img/items/showroom/showcase_PC_h264.mp4" type="video/mp4" />
                    `
        } else {
          videoElement.innerHTML = `
                        <source src="../img/items/showroom/showcase_Mobile.mp4" type="video/mp4" />
                        <source src="../img/items/showroom/showcase_Mobile.webm" type="video/webm" />
                        <source src="../img/items/showroom/showcase_Mobile_h264.mp4" type="video/mp4" />
                    `
        }
      }
      videoElement.load()
    }
  }, 100) // Mora interval jer nekada ne stigne da napravi taj DIV i onda ne moze da ucita
}
