import Entity from "../classes/entity.js";
import Tank from "../classes/tank.js";
import { fadeOut, explosion } from "./effects.js";

const cannonAudio = new Audio("./assets/audio/cannon.mp3")
const hitAudio = new Audio("./assets/audio/tankImpact.wav")
hitAudio.volume = 0.5     
const flashSize = window.innerHeight / 64
const tracerSize = window.innerHeight / 32
const cannonVelocity = 15 // can be non relational to window size, constitutes the rate of tracer movement and position checking
const explosionSize = window.innerHeight / 16
const hitTolerance = window.innerHeight / 32
/**
* @param {Entity} origin
* @param {object} target
*/
export default function shootCannon(origin, target){
  /**
   * Handle all cannon related audio 
   */
  cannonAudio.load()
  cannonAudio.play()
  hitAudio.load()
  /**
   * Render muzzle flash relative to turret rotation and origin
   */
  const flash = new Entity(flashSize, origin.x, origin.y, "./assets/effects/muzzleFlash.png")
  window.container.addChild(flash)
  flash.rotation = origin.turret.rotation
  let offsetX = Math.cos(flash.rotation) * origin.hull.height / 2
  let offsetY = Math.sin(flash.rotation) * origin.hull.height / 2
  flash.x +=  offsetX
  flash.y += offsetY
  fadeOut(flash, 2)
  /** 
   * Render tracer and translate it towards target, check for hitting objects... for now. change later to check hitting anything
   */
  const tracer = new Entity(tracerSize, origin.x, origin.y, "./assets/effects/cannonTracer.png")
  tracer.rotation = flash.rotation
  tracer.x +=  offsetX
  tracer.y += offsetY
  window.container.addChild(tracer)
  const trajectory = setInterval(() => {
    tracer.x += offsetX
    tracer.y += offsetY
    if(checkProximity(tracer, target)){
      //bomb crater?
    }
    obstacles.forEach(obstacle => {
      checkProximity(tracer, obstacle)
    })
  }, cannonVelocity)

  function checkProximity(tracer, obstacle){
    let distanceX = Math.abs(tracer.x - obstacle.x)
    let distanceY = Math.abs(tracer.y - obstacle.y)
    if(distanceX <= hitTolerance && distanceY <= hitTolerance){ //check proximity to obstacle
      explosion(explosionSize, tracer.x, tracer.y)
      if(obstacle instanceof Tank){
        renderCrater(target)
        hitAudio.play()
      } 
      window.container.removeChild(tracer)
      clearInterval(trajectory)
      return true
    } else {
      return false
    }
  }
  /**
   * -
   */
  function renderCrater(target){
    let crater = new Entity(gameSettings.craterSize, target.x, target.y, "../assets/effects/crater.png")
    crater.rotation = Math.random() * (2 * Math.PI)
    container.addChild(crater)
  }
  

} 