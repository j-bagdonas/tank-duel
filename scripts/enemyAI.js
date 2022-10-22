import Tank from "../classes/tank.js";
/**
 * 
 * @param {int} level 
 */
export default function enemyAI(level){
  const enemyTank = new Tank(window.gameSettings.tankSize, window.innerWidth - 200, window.innerHeight / 2, "./assets/tanks/tankBody.png", "./assets/tanks/tankTurret.png")
  window.container.addChild(enemyTank.hull)
  window.container.addChild(enemyTank.turret)
} 