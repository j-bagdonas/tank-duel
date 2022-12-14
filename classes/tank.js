import Entity from "../classes/entity.js"
const engine = new Audio("../assets/audio/engineIdle.wav")
const engineRev = new Audio("../assets/audio/engineRev.wav")
const tankTracks = new Audio("../assets/audio/tankTracks.wav")

export default class Tank {
  constructor(size, x, y, pathToHullImage, pathToTurretImage){
    this.hull = new Entity(size, x, y, pathToHullImage)
    this.turret = new Entity(size, x, y, pathToTurretImage)
    this.x = x
    this.y = y
    this.speed = window.innerWidth / 1000
    this.hullRotationSpeed = window.innerWidth / 30000
    this.deadSpaceOffSet = window.innerHeight - (window.innerWidth * (9/16))
    this.obstructedForward = false
    this.obstructedBackward = false
    this.motionState = false
    this.prevMotionState = false
    //Inital audio stuff
    engine.volume = window.gameSettings.engineVolume
    engineRev.volume = window.gameSettings.engineVolume
    engine.load()
    engine.play()
    engine.loop = true;
   

    this.handleAudio = () => {
      if(this.motionState){
        engineRev.play()    
        // tankTracks.play()
        engine.playbackRate = 2.9
        engine.volume = 0.7
      } else {
        engine.playbackRate = 1
        engine.volume = window.gameSettings.enginevolume
      }
      this.prevMotionState = this.motionState
    }


    this.syncComponents = () => {
      this.hull.x = this.x
      this.turret.x = this.x
      this.hull.y = this.y
      this.turret.y = this.y
    }
    /**
    * Move tank using basic(sort of) trig and have the turret follow intended target
    */
    this.move = (isForward) => {
      if(this.motionState != true){
        this.motionState = true
      }
      let positionRadians = Math.abs(this.hull.rotation % (2 * Math.PI))
      let vx = Math.cos(positionRadians) * this.speed
      let vy = Math.sin(positionRadians) * this.speed
      this.checkObstruction(isForward)
      if(isForward){
        this.x += vx
        this.y -= vy
      } else {
        this.x -= vx
        this.y += vy
      }
      this.syncComponents()
      this.handleAudio()
    }

    this.rotateHullRight = () => {
       this.hull.rotation += this.hullRotationSpeed
       this.checkTrigBoundaries()
    }

    this.rotateHullLeft = () => {
      this.hull.rotation -= this.hullRotationSpeed
      this.checkTrigBoundaries()
    }

    this.checkTrigBoundaries = () => {
      if(this.hull.rotation > 0){
        this.hull.rotation -= (2 * Math.PI)
      }
    }

    this.rotateTurret = (targetX, targetY) => {
      let deltaY = targetY - this.y
      let deltaX = targetX - this.x 
      if(deltaX <= 0){
        this.turret.rotation = Math.PI + Math.atan(deltaY / deltaX)
      } else if(deltaX >= 0) {
        this.turret.rotation = Math.atan(deltaY / deltaX)
      }
    }

    this.checkObstruction = (isForward) => {
      obstacles.forEach((obstacle) => {
        if (obstacle !== this){
          let distanceX = Math.abs(this.x - obstacle.x)
          let distanceY = Math.abs(this.y - obstacle.y)
          if(distanceX <= obstacle.size / 2 && distanceY <= obstacle.size / 2){ //check proximity to obstacle
            let positionRadians = Math.abs(this.hull.rotation % (2 * Math.PI)) //Yes this is redundant but avoids maxing out the call stack
            let vx = Math.cos(positionRadians) * this.speed
            let vy = Math.sin(positionRadians) * this.speed
            if(isForward) {
              this.x -= vx * 4
              this.y += vy * 4
            } else {
              this.x += vx * 4
              this.y -= vy * 4
            }
          }
        }
      })
      
    }
  }
};