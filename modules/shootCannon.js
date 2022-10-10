import Entity from "./entity.js";
import { fadeOut } from "./effects.js";

const cannonAudio = new Audio("./assets/sounds/cannon.mp3")
const flashSize = window.innerHeight / 64
const tracerSize = window.innerHeight / 32
const cannonVelocity = 15
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
   * Render tracer and translate it towards target
   */
  const tracer = new Entity(tracerSize, origin.x, origin.y, "./assets/cannonTracer.png")
  tracer.rotation = flash.rotation
  tracer.x +=  offsetX
  tracer.y += offsetY
  window.container.addChild(tracer)
  const trajectory = setInterval(() => {
    tracer.x += offsetX
    tracer.y += offsetY
    if(tracer.x >= window.innerWidth || tracer.x <= 0){ // Do not have to check with y axis b/c tracer will eventually intersect x boundaries
      window.container.removeChild(tracer)
      clearInterval(trajectory)
    }
  }, cannonVelocity)

  /**
   * -
   */
  

} 