import Entity from "../classes/entity.js"

const explosionAudio = new Audio("./assets/audio/explosion.mp3")
explosionAudio.volume = 0.4
/**
 * Fadeout takes care of removing children from the container
 */
function fadeOut(entity, time) {
  const fade = setInterval(() => {
    entity.alpha -= 0.05
    if(entity.alpha <= 0){
      clearInterval(fade)
      window.container.removeChild(entity)
    }
  }, time)
}

/**
 * Move objects with wind until they are no longer exist
 */

function moveWithWind(entity, timeOut){
  //for now constant wind speed in north direction
  const windSpeed = window.innerHeight / 200
  const move = setInterval(() => {
    entity.y -= windSpeed
    if(!window.container.children.includes(entity)){
      clearInterval(move)
    }
  }, 100)
}

function explosion(size, x, y) {
  /**
   * blast on hit
   */
  const explosion = new Entity(size, x, y, './assets/effects/explosion.png')
  window.container.addChild(explosion)
  fadeOut(explosion, 7)

  /** 
  * random smoke that dissapates. 
  */
  for (let i = 0; i < 12; i++){ //i smoke clouds 
    let offSetX = Math.random() * (size / 2) - (size / 4)
    let offSetY = Math.random() * (size / 2) - (size / 4)
    const smoke = new Entity(size / 4, x + offSetX,  y + offSetY, "./assets/effects/explosionSmoke.png")
    smoke.alpha = 0.3
    window.container.addChild(smoke)
    fadeOut(smoke, 100)
    moveWithWind(smoke)
    //use this for shrapenel
    // const moveSmoke = setInterval(() => { //clouds move slightly as they dissapate
    //   smoke.x += offSetX / 10
    //   smoke.y += offSetY / 10
    // }, 100)
    /**
     * Sounds 
     */
    explosionAudio.currentTime = 0
    explosionAudio.play()
  }
}
/** 
* creates shell crater in the ground 
*/
function shellCrater(size, x, y){
  const crater = new Entity(size, x, y, './assets/effects/explosion.png')

}

export {
  fadeOut,
  explosion
}