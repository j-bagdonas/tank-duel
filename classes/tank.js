import Entity from "../classes/entity.js"

export default class Tank {
  constructor(size, x, y, pathToHullImage, pathToTurretImage){
    this.hull = new Entity(size, x, y, pathToHullImage)
    this.turret = new Entity(size, x, y, pathToTurretImage)
    this.x = x
    this.y = y
    this.speed = window.innerWidth / 1000
    this.hullRotationSpeed = window.innerWidth / 30000
    this.deadSpaceOffSet = window.innerHeight - (window.innerWidth * (9/16))

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
      let positionRadians = Math.abs(this.hull.rotation % (2 * Math.PI))
      let vectorComponentX = Math.cos(positionRadians) * this.speed
      let vectorComponentY = Math.sin(positionRadians) * this.speed
      if(isForward){
        this.x += vectorComponentX
        this.y -= vectorComponentY
      } else {
        this.x -= vectorComponentX
        this.y += vectorComponentY
      }
      this.syncComponents()
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
  }
};