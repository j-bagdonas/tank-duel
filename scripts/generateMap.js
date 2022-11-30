import Entity from "../classes/entity.js";
import { Container } from "../pixi/pixi.js";

export default function generateMap(){

  //coordinate system for placing objects x 1-24, y 1- 12


  function placeSceneryItem(x, y, size, assetPath, rotation){
    let positionX = (x / 24) * window.innerWidth
    let positionY = (y / 12) * window.innerHeight
    let item = new Entity(size, positionX, positionY, assetPath)
    item.rotation = rotation
    item.zIndex = 1
    container.addChild(item)
    obstacles.push(item)
  }

  
  placeSceneryItem(6, 2, window.gameSettings.foliageSize, "../assets/foliage/f2.png", Math.random() * Math.PI * 2)
  placeSceneryItem(6, 2.5, window.gameSettings.foliageSize, "../assets/foliage/f2.png", Math.random() * Math.PI * 2)
  placeSceneryItem(6, 3, window.gameSettings.foliageSize, "../assets/foliage/f2.png", Math.random() * Math.PI * 2)
  placeSceneryItem(6, 3.5, window.gameSettings.foliageSize, "../assets/foliage/f2.png", Math.random() * Math.PI * 2)
  placeSceneryItem(6, 4, window.gameSettings.foliageSize, "../assets/foliage/f2.png", Math.random() * Math.PI * 2)


  // placeSceneryItem(1, 4, window.gameSettings.buildingSize, "../assets/buildings/building1.png", Math.PI)
  // placeSceneryItem(2, 4, window.gameSettings.buildingSize, "../assets/buildings/building2.png", Math.PI)
  // placeSceneryItem(3, 4, window.gameSettings.buildingSize, "../assets/buildings/building1.png", Math.PI)
  // placeSceneryItem(4, 4, window.gameSettings.buildingSize, "../assets/buildings/building1.png", Math.PI)


  // const building1 = new Entity(window.gameSettings.buildingSize, centerWidth + 100, centerHeight + 100, "../assets/buildings/building1.png")
  // building1.rotation = Math.PI / 2
  // window.container.addChild(building1)
  // window.obstacles.push(building1);
  
  // const building2 = new Entity(window.gameSettings.buildingSize, centerWidth - 100, centerHeight + 100, "../assets/buildings/building1.png")
  // building2.rotation = Math.PI / 2
  // window.container.addChild(building2)
  // window.obstacles.push(building2);

}