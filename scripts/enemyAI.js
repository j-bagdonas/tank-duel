import Tank from "../classes/tank.js";
import shootCannon from "./shootCannon.js";
/**
 * 
 * @param {int} level 
 */
export default function enemyAI(level){
  const tank = new Tank(window.gameSettings.tankSize, window.innerWidth - 200, window.innerHeight / 2, "./assets/tanks/tankBody.png", "./assets/tanks/tankTurret.png")
  window.container.addChild(tank.hull)
  window.container.addChild(tank.turret)
  obstacles.push(tank)

  //initial position
  tank.hull.rotation = Math.PI

  //aim turret towards player
  setInterval(()=> {
    tank.rotateTurret(player.x, player.y)

  }, 100)
  setInterval(()=> {
    shootCannon(tank, player);
    
  }, 4000)



}