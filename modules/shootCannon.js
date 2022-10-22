import Entity from "./entity.js";
import { fadeOut, explosion } from "./effects.js";

const cannonAudio = new Audio("./assets/sounds/cannon.mp3")
const flashSize = window.innerHeight / 64
const tracerSize = window.innerHeight / 32
const cannonVelocity = 15 // can be non relational to window size, constitutes the rate of tracer movement and position checking
const explosionSize = window.innerHeight / 16
const hitTolerance = window.innerHeight / 32
/**
* Function takes in origin(a tank object) and target(an object with x and y values)
*/
export default function shootCannon(origin, target){
  /**
   * Handle all cannon related audio 
   */
  cannonAudio.load()
  cannonAudio.play()

  /**
   * Render muzzle flash relative to turret rotation and origin
   */
  const flash = new Entity(flashSize, origin.x, origin.y, "./assets/muzzleFlash.png")
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
  const tracer = new Entity(tracerSize, origin.x, origin.y, "./assets/cannonTracer.png")
  tracer.rotation = flash.rotation
  tracer.x +=  offsetX
  tracer.y += offsetY
  window.container.addChild(tracer)
  const trajectory = setInterval(() => {
    tracer.x += offsetX
    tracer.y += offsetY
    let distanceX = Math.abs(tracer.x - target.x)
    let distanceY = Math.abs(tracer.y - tracer.y)
    if(distanceX <= hitTolerance && distanceY <= hitTolerance){
      explosion(explosionSize, tracer.x, tracer.y)
      window.container.removeChild(tracer)
      clearInterval(trajectory)
    } else if (tracer.x >= window.innerWidth || tracer.x <= 0 || tracer.y >= window.innerHeight || tracer.y <= 0){ //check boundaries
      window.container.removeChild(tracer)
      clearInterval(trajectory)
    } 
  }, cannonVelocity)

  /**
   * -
   */
  

} 