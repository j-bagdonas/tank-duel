
export default class Entity extends PIXI.Sprite {
  constructor(size, x, y, pathToImage){
    let texture = PIXI.Texture.from(pathToImage);
    super(texture)
    this.height = size
    this.width = size
    this.anchor.set(0.5)
    this.x = x
    this.y = y
  }
}
