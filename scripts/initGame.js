import * as PIXI from '../pixi/pixi.js'
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
    crosshairSize: window.innerWidth / 64,
    buildingSize: window.innerWidth / 16,
    hitTolerance: window.innerHeight / 32,
    obstructionTolerance: window.innerHeight / 16,
    craterSize: window.innerHeight / 64
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
  
  globalThis.obstacles = [player] //and array of entities
  /**
   * Default global values
   */
  crosshair.zIndex = 10;
  window.container.interactive = true
  window.container.sortableChildren = true
  window.crosshair.alpha = 0.5



  //break the map into a grid relational to window height
  const devGrid = new PIXI.Graphics()
  const Ydiv = 1 / 12
  devGrid.zIndex = -10
  // container.addChild(devGrid)
  devGrid.lineStyle(1, 0xffffff)
        //horizontal lines
         .moveTo(0, (window.innerHeight * 1/12))
         .lineTo(window.innerWidth, (window.innerHeight * 1/12))
         .moveTo(0, (window.innerHeight * 2/12))
         .lineTo(window.innerWidth, (window.innerHeight * 2/12))
         .moveTo(0, (window.innerHeight * 3/12))
         .lineTo(window.innerWidth, (window.innerHeight * 3/12))
         .moveTo(0, (window.innerHeight * 4/12))
         .lineTo(window.innerWidth, (window.innerHeight * 4/12))
         .moveTo(0, (window.innerHeight * 5/12))
         .lineTo(window.innerWidth, (window.innerHeight * 5/12))
         .moveTo(0, (window.innerHeight * 6/12))
         .lineTo(window.innerWidth, (window.innerHeight * 6/12))
         .moveTo(0, (window.innerHeight * 7/12))
         .lineTo(window.innerWidth, (window.innerHeight * 7/12))
         .moveTo(0, (window.innerHeight * 8/12))
         .lineTo(window.innerWidth, (window.innerHeight * 8/12))
         .moveTo(0, (window.innerHeight * 9/12))
         .lineTo(window.innerWidth, (window.innerHeight * 9/12)) 
         .moveTo(0, (window.innerHeight * 10/12))
         .lineTo(window.innerWidth, (window.innerHeight * 10/12))
         .moveTo(0, (window.innerHeight * 11/12))
         .lineTo(window.innerWidth, (window.innerHeight * 11/12))
         .moveTo(0, (window.innerHeight * 12/12))
         .lineTo(window.innerWidth, (window.innerHeight * 12/12))
        //vertical lines
        .moveTo(window.innerWidth * 1/24, 0)
        .lineTo(window.innerWidth * 1/24, window.innerHeight)
        .moveTo(window.innerWidth * 2/24, 0)
        .lineTo(window.innerWidth * 2/24, window.innerHeight)
        .moveTo(window.innerWidth * 3/24, 0)
        .lineTo(window.innerWidth * 3/24, window.innerHeight)
        .moveTo(window.innerWidth * 4/24, 0)
        .lineTo(window.innerWidth * 4/24, window.innerHeight)
        .moveTo(window.innerWidth * 5/24, 0)
        .lineTo(window.innerWidth * 5/24, window.innerHeight)
        .moveTo(window.innerWidth * 6/24, 0)
        .lineTo(window.innerWidth * 6/24, window.innerHeight)
        .moveTo(window.innerWidth * 7/24, 0)
        .lineTo(window.innerWidth * 7/24, window.innerHeight)
        .moveTo(window.innerWidth * 8/24, 0)
        .lineTo(window.innerWidth * 8/24, window.innerHeight)
        .moveTo(window.innerWidth * 9/24, 0)
        .lineTo(window.innerWidth * 9/24, window.innerHeight)
        .moveTo(window.innerWidth * 10/24, 0)
        .lineTo(window.innerWidth * 10/24, window.innerHeight)
        .moveTo(window.innerWidth * 11/24, 0)
        .lineTo(window.innerWidth * 11/24, window.innerHeight)
        .moveTo(window.innerWidth * 12/24, 0)
        .lineTo(window.innerWidth * 12/24, window.innerHeight)
        .moveTo(window.innerWidth * 13/24, 0)
        .lineTo(window.innerWidth * 13/24, window.innerHeight)
        .moveTo(window.innerWidth * 14/24, 0)
        .lineTo(window.innerWidth * 14/24, window.innerHeight)
        .moveTo(window.innerWidth * 15/24, 0)
        .lineTo(window.innerWidth * 15/24, window.innerHeight)
        .moveTo(window.innerWidth * 16/24, 0)
        .lineTo(window.innerWidth * 16/24, window.innerHeight)
        .moveTo(window.innerWidth * 17/24, 0)
        .lineTo(window.innerWidth * 17/24, window.innerHeight)
        .moveTo(window.innerWidth * 18/24, 0)
        .lineTo(window.innerWidth * 18/24, window.innerHeight)
        .moveTo(window.innerWidth * 19/24, 0)
        .lineTo(window.innerWidth * 19/24, window.innerHeight)
        .moveTo(window.innerWidth * 20/24, 0)
        .lineTo(window.innerWidth * 20/24, window.innerHeight)
        .moveTo(window.innerWidth * 21/24, 0)
        .lineTo(window.innerWidth * 21/24, window.innerHeight)
        .moveTo(window.innerWidth * 22/24, 0)
        .lineTo(window.innerWidth * 22/24, window.innerHeight)
        .moveTo(window.innerWidth * 23/24, 0)
        .lineTo(window.innerWidth * 23/24, window.innerHeight)
        .moveTo(window.innerWidth * 24/24, 0)
        .lineTo(window.innerWidth * 24/24, window.innerHeight)
}