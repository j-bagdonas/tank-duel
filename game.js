
import initGame from "./scripts/initGame.js"
import shootCannon from "./scripts/shootCannon.js";
import enemyAI from "./scripts/enemyAI.js"
import Controller from "./classes/controller.js";
import GameState from "./classes/gameState.js"
import generateMap from "./scripts/generateMap.js";

const gameState = new GameState()
const controller = new Controller()
initGame()
generateMap()

/**
 * What to do with these
 */
var mouseX, mouseY
var cannonCooldown


document.body.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

//To be moved when game play evolves
window.container.addChild(player.hull)
window.container.addChild(player.turret)
window.container.addChild(crosshair)
app.stage.addChild(container)

enemyAI(1)


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
  if(controller.up){
    player.move(true)
  }   
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


//document.body.style.cursor = 'none'; //** THEN replace cursor with crosshair sort of vibe

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