import Entity from "./entity.js"

export default class Tank {
  constructor(size, x, y, pathToHullImage, pathToTurretImage){
    this.hull = new Entity(size, x, y, pathToHullImage)
    this.turret = new Entity(size, x, y, pathToTurretImage)
    this.x = x
    this.y = y
    this.setPosition = (positionX, positionY) => {
      //This is ugly but necessary
      this.x = positionX
      this.y = positionY
      this.hull.x = positionX
      this.turret.x = positionX
      this.hull.y = positionY
      this.turret.y = positionY
    }
  }
  
};