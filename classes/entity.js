import * as PIXI from "../pixi/pixi.js"
/**
* Default class for creating an element to add to the stage.
* All Graphical elements of the game are extensions of the Enity class
*/
export default class Entity extends PIXI.Sprite {
  constructor(size, x, y, pathToImage){
    let texture = PIXI.Texture.from(pathToImage);
    super(texture)
    this.height = size
    this.width = size
    this.size = size
    this.anchor.set(0.5)
    this.x = x
    this.y = y
  }
}
