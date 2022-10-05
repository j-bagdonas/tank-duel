export default class GameState {
  constructor(){
    this.score = 0
    this.enemiesKilled = 0
    this.gameOver = false
    this.level = 1
    this.machineGunAmmo = 1000
    this.missileAmmo = 50
    this.newGame = false
    this.submitScoreDisplayed = false
    this.direction = 0
  } 
}