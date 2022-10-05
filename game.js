

import Controller from "./modules/controller.js";
import Entity from "./modules/entity.js"
import GameState from "./modules/gameState.js"
import shoot from "./modules/shoot.js";
import Tank from "./modules/tank.js";


const tankSize = window.innerWidth / 16

/*------ Initialize Game ------ */
// document.addEventListener("visibilitychange", () => {
//   if(document.visibilityState === 'hidden'){
//     controller.pause = true
//   }
// })
const gameState = new GameState()
const controller = new Controller()

const screenWidth = window.innerWidth
const screenHeight = (9/16) * screenWidth

const app = new PIXI.Application({
  width: screenWidth,
  height: screenHeight,
  // resizeTo: window,
  autoDensity: true, // Handles high DPI screens
  backgroundColor: 0x82734a
})
document.body.appendChild(app.view)
const player = new Tank(tankSize, screenWidth / 2, screenHeight / 2, './assets/hull2.png', "./assets/turret.png")
const container = new PIXI.Container()
container.addChild(player.hull)
container.addChild(player.turret)
app.stage.addChild(container)

// window.onresize = scaleScreen

// function scaleScreen(app){
//   container.width = window.innerWidth
//   // container.children.forEach((child) => {
//   //   child.scale.set(window.innerWidth / 1000) 
//   // })
// }

//main game loop
app.ticker.add(() => {
  if(!controller.pause && !gameState.gameOver){
    interfaceWithController() 
    
    
  } 
});

/**
* Move tank with user input. Uses basic trig to have the turret follow the mouse around the map
* Events come from the controller function
*/

const tankSettings = {
  hullRotationSpeed: window.innerWidth / 30000,
  speed: 2
}
function interfaceWithController() {
  let deltaY = controller.mouseY - player.y
  let deltaX = controller.mouseX - player.x
  if(deltaX <= 0){
    player.turret.rotation = Math.PI + Math.atan(deltaY / deltaX)
  } else if(deltaX >= 0){
    player.turret.rotation = Math.atan(deltaY / deltaX)
  } else { //deltaX undefined, face turret front
    player.turret.rotation = 3 * Math.PI / 2
  }
  if(controller.right){player.hull.rotation += tankSettings.hullRotationSpeed}
  if(controller.left){player.hull.rotation -= tankSettings.hullRotationSpeed}
  if(player.hull.rotation > 0){
    player.hull.rotation -= (2 * Math.PI)
  }
  let positionRadians = Math.abs(player.hull.rotation % (2 * Math.PI))
  if(controller.up){

    let positionX = player.x + Math.cos(positionRadians)
    let positionY = player.y - Math.sin(positionRadians)
    player.setPosition(positionX, positionY)
 }
}

//document.body.style.cursor = 'none'; ** THEN replace cursor with crosshair sort of vibe

