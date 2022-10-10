function fadeOut(entity, time) {
  const fade = setInterval(() => {
    entity.alpha -= 0.05
    if(entity.alpha <= 0){
      clearInterval(fade)
      window.container.removeChild(entity)
    }
  }, time)
}

function explosion(size, x, y) {
  // const explosion = new Entity(size, x, y, )
}

export {
  fadeOut
}