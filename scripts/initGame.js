import Tank from "../classes/tank.js"
import Entity from "../classes/entity.js"
/**
 * Initialize game and all global variables
 */
export default function initGame() {

  globalThis.gameSettings = {
    screenWidth: window.innerWidth,
    screenHeight: (9/16) * window.innerWidth,
    tankSize: window.innerWidth / 16,
    crosshairSize: window.innerWidth / 64
  }

  globalThis.app = new PIXI.Application({
    width: window.gameSettings.screenWidth,
    height: window.gameSettings.screenHeight,
    // resizeTo: window,
    autoDensity: true, // for high DPI screens
    backgroundColor: 0x82734a
  })

  document.body.appendChild(window.app.view)

  globalThis.player = new Tank(gameSettings.tankSize, window.gameSettings.screenWidth / 2, window.gameSettings.screenHeight / 2, './assets/tanks/tankBody.png', "./assets/tanks/tankTurret.png")
  globalThis.crosshair = new Entity(gameSettings.crosshairSize, window.gameSettings.screenWidth / 2, window.gameSettings.screenHeight / 2, "./assets/misc/crosshair.png" )
  globalThis.container = new PIXI.Container()
  /**
   * Default global values
   */
  window.container.interactive = true
  window.crosshair.alpha = 0.5

  

}