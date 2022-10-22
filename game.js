

import Controller from "./modules/controller.js";
import Entity from "./modules/entity.js";
import GameState from "./modules/gameState.js"
import shootCannon from "./modules/shootCannon.js";
import Tank from "./modules/tank.js";

const tankSize = window.innerWidth / 16
const crosshairSize = window.innerWidth / 32


const gameState = new GameState()
const controller = new Controller()
const screenWidth = window.innerWidth
const screenHeight = (9/16) * screenWidth
var mouseX, mouseY
var cannonCooldown

globalThis.app = new PIXI.Application({
  width: screenWidth,
  height: screenHeight,
  // resizeTo: window,
  autoDensity: true, // for high DPI screens
  backgroundColor: 0x82734a
})

document.body.appendChild(app.view)
const player = new Tank(tankSize, screenWidth / 2, screenHeight / 2, './assets/tankBody.png', "./assets/tankTurret.png")
const crosshair = new Entity(crosshairSize, screenWidth / 2, screenHeight / 2, "./assets/crosshair.png" )
crosshair.alpha = 0.5
globalThis.container = new PIXI.Container()
window.container.interactive = true
window.container.on('mousemove', function (e) {
  mouseX = e.data.global.x
  mouseY = e.data.global.y
});
window.container.addChild(player.hull)
window.container.addChild(player.turret)
window.container.addChild(crosshair)
app.stage.addChild(container)


//main game loop
app.ticker.add(() => {
  if(!controller.pause && !gameState.gameOver){
    interfaceWithController() 
    
    
  } 
});

/**
* Move tank with user input. 
* Events come from the controller function
*/
function interfaceWithController() {
  let target = {
    x: mouseX,
    y: mouseY
  }
  if(controller.right){player.rotateHullRight()}
  if(controller.left){player.rotateHullLeft()}
  if(controller.up){player.move(true)}
  if(controller.down){player.move(false)}
  if(controller.shoot && !cannonCooldown){
    shootCannon(player, target)
    cannonCooldown = true
    setTimeout(() => {
      cannonCooldown = false
    }, 2000)
  }
  player.rotateTurret(mouseX, mouseY)
  crosshair.x = target.x
  crosshair.y = target.y
}


document.body.style.cursor = 'none'; //** THEN replace cursor with crosshair sort of vibe

/*------ Initialize Game ------ */
// document.addEventListener("visibilitychange", () => {
//   if(document.visibilityState === 'hidden'){
//     controller.pause = true
//   }
// })



// window.onresize = scaleScreen

// function scaleScreen(app){
//   container.width = window.innerWidth
//   // container.children.forEach((child) => {
//   //   child.scale.set(window.innerWidth / 1000) 
//   // })
// }