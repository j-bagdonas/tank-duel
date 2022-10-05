
import Entity from "./entity.js"

const bulletSize = 10
const bulletVerticalOffset = 20
const bulletHorizontalOffset = 2
const bulletSpeed = 20
const machineGunWingOffset = 20
const bulletHitTolerance = 20
const explosionHeight = 80
const explosionWidth = 80
const debrisSize= 20
const debrisSpeed = 20
const trailSize = 6

export default function shoot(app, enemies, player, gameState, controller){
  
    let machineGunWingOffset = 20
    if(gameState.machineGunAmmo % 2 === 0){
      var projectile = new Entity(bulletSize, bulletSize, player.body.x + machineGunWingOffset, player.body.y - bulletVerticalOffset, "./assets/photon.png")
      // let shot = new Audio('./assets/sounds/gun.mp3');
      // shot.play()
    } else {
      var projectile = new Entity(bulletSize, bulletSize, player.body.x - machineGunWingOffset, player.body.y - bulletVerticalOffset, "./assets/photon.png")
    }

    app.stage.addChild(projectile.body)
    app.ticker.add(function gunTicker (){//projectile movement goes here
      if(!controller.pause){
        projectile.body.y -= bulletSpeed; 
        projectile.body.x += Math.random() * bulletHorizontalOffset
        projectile.body.x -= Math.random() * bulletHorizontalOffset
        if(projectile.body.y < 0){
          app.ticker.remove(gunTicker)
          app.stage.removeChild(projectile.body)  
        }
        gameState.machineGunAmmo --;
        enemies.forEach((enemy, index) => {
        if(Math.abs(projectile.body.x - enemy.body.x) < bulletHitTolerance && Math.abs(projectile.body.y - enemy.body.y) < bulletHitTolerance) {
          app.ticker.remove(gunTicker)
          // app.ticker.remove(missileTicker)
          app.stage.removeChild(projectile.body)
          app.stage.removeChild(enemy.body)
          let explosion = new Entity(explosionHeight, explosionWidth, enemy.body.x, enemy.body.y, "./assets/explosion.png")
          app.stage.addChild(explosion.body)
          for(let i= 0; i < 10; i++){
            let size = Math.random() * debrisSize
            let debris = new Entity(size, size, enemy.body.x, enemy.body.y, "./assets/debris.png")
            app.stage.addChild(debris.body)
            let directionX = (Math.random() * debrisSpeed) - debrisSpeed / 2
            let directionY = (Math.random() * debrisSpeed) - debrisSpeed / 2
            const fragmentDebris = setInterval(() => {
              debris.body.x += directionX
              debris.body.y += directionY
              let debrisTrail = new Entity(trailSize, trailSize, debris.body.x, debris.body.y, "./assets/explosion2.png")
              app.stage.addChild(debrisTrail.body)
              const fadeOut = setInterval(() => {
                debrisTrail.body.alpha -= 0.1;
              }, 30)
              setTimeout(() => {
                app.stage.removeChild(debrisTrail.body)
                clearInterval(fadeOut)
              }, 400);
            }, 20)
            setTimeout(()=>{
              clearInterval(fragmentDebris)
              app.stage.removeChild(debris.body)
            }, 200)
          }
          gameState.enemiesKilled ++;
          gameState.score+=100
          enemies.splice(index, 1)
          const fadeOut = setInterval(() => {
            explosion.body.alpha -= 0.2
          }, 50)
          setTimeout(() => {
            app.stage.removeChild(explosion.body)
          }, 250)
        }
      }) 
      }
      })  

}






// const explosionHeight = 100
// const explosionWidth = 100
// const debrisSize = 20
// const debrisSpeed = 40
// const trailSize = 4
// const bulletSize = 6
// const bulletSpeed = 20
// const bulletHorizontalOffset = 4
// const missileSize = 30
// const missileTrackingToleranceX = 12
// const missileTrackingToleranceY = 2
// const missileHorizontalSpeed = 0.1
// const missileVerticalSpeed = 20 // originally 10
// const bulletVerticalOffset = 50
// const bulletHitTolerance = 20
// const missileTrailWidth = 12;


// export default function shoot(weapon, app, enemies, player, crosshair, gameState, controller) {
//   if(weapon === 'gun'){
//     var projectile = new Entity(bulletSize, bulletSize, player.body.x + bulletHorizontalOffset, player.body.y - bulletVerticalOffset, "./assets/star.png")
//     app.ticker.add(gunTicker)  
//   } else if(weapon === 'missile'){
//     var projectile = new Entity(missileSize, missileSize, player.body.x, player.body.y, "./assets/missileRotated.png")
//     app.ticker.add(missileTicker)  
  
    
//   }
//   app.stage.addChild(projectile.body);
   
//   function gunTicker() { //projectile movement goes here
//     if(!controller.pause){
//       projectile.body.y -= bulletSpeed; 
//       projectile.body.x += Math.random() * bulletHorizontalOffset
//       projectile.body.x -= Math.random() * bulletHorizontalOffset
//       if(projectile.body.y < 0){
//         app.ticker.remove(gunTicker)
//         app.stage.removeChild(projectile.body)
//       } 
//       trackProjectiles(gunTicker)
//     }
//   }

//   function missileTicker() {
//     if(!controller.pause){
//       var distanceX = (projectile.body.x - crosshair.body.x)
//       var distanceY = (projectile.body.y - crosshair.body.y)
//       var theta =  Math.atan((distanceY / distanceX))
  
//       if(crosshair.body.x < projectile.body.x){
//         let rotationAngle = (Math.PI / 2) + ((Math.PI / 2) + theta)
//         projectile.body.rotation = rotationAngle 
//       } else if(enemies.length === 0){
//         projectile.body.rotation = ( -Math.PI / 2)
//       } else {
//         projectile.body.rotation = theta
//       }
  
//       if(distanceX > missileTrackingToleranceX){
//         projectile.body.x -= missileHorizontalSpeed * Math.abs(distanceX)
//       } else if (distanceX < -missileTrackingToleranceX) {
//         projectile.body.x += missileHorizontalSpeed * Math.abs(distanceX)
//       } 
//       if(Math.abs(distanceY) > missileTrackingToleranceY){
//         if(crosshair.body.y > projectile.body.y){
//           projectile.body.y += missileVerticalSpeed
//         } else {
//           projectile.body.y -= missileVerticalSpeed
//         }
//       }
      
//       let missileTrail = new Entity(missileTrailWidth, missileTrailWidth, projectile.body.x, projectile.body.y, "./assets/cloud.png")
//       app.stage.addChild(missileTrail.body)
  
//       const fadeOut = setInterval(() => {
//         missileTrail.body.alpha -= 0.1;
//       }, 50)
  
//       setTimeout(() => {
//         app.stage.removeChild(missileTrail.body)
//         clearInterval(fadeOut)
//       }, 500)
  
//       trackProjectiles(missileTicker)
//     }
//   }

//   function trackProjectiles(ticker) {
//     enemies.forEach((enemy, index) => {
//       if(Math.abs(projectile.body.x - enemy.body.x) < bulletHitTolerance && Math.abs(projectile.body.y - enemy.body.y) < bulletHitTolerance) {
//         app.ticker.remove(ticker)
//         // app.ticker.remove(missileTicker)
//         app.stage.removeChild(projectile.body)
//         app.stage.removeChild(enemy.body)
//         let explosion = new Entity(explosionHeight, explosionWidth, enemy.body.x, enemy.body.y, "./assets/explosion.png")
//         app.stage.addChild(explosion.body)
//         for(let i= 0; i < 10; i++){
//           let size = Math.random() * debrisSize
//           let debris = new Entity(size, size, enemy.body.x, enemy.body.y, "./assets/debris.png")
//           app.stage.addChild(debris.body)
//           let directionX = (Math.random() * debrisSpeed) - debrisSpeed / 2
//           let directionY = (Math.random() * debrisSpeed) - debrisSpeed / 2
//           const fragmentDebris = setInterval(() => {
//             debris.body.x += directionX
//             debris.body.y += directionY
//             let debrisTrail = new Entity(trailSize, trailSize, debris.body.x, debris.body.y, "./assets/explosion2.png")
//             app.stage.addChild(debrisTrail.body)
//             const fadeOut = setInterval(() => {
//               debrisTrail.body.alpha -= 0.1;
//             }, 30)
//             setTimeout(() => {
//               app.stage.removeChild(debrisTrail.body)
//               clearInterval(fadeOut)
//             }, 400);
//           }, 20)
//           setTimeout(()=>{
//             clearInterval(fragmentDebris)
//             app.stage.removeChild(debris.body)
//           }, 200)
//         }
//         gameState.enemiesKilled ++;
//         gameState.score+=100
//         enemies.splice(index, 1)
//         const fadeOut = setInterval(() => {
//           explosion.body.alpha -= 0.2
//         }, 50)
//         setTimeout(() => {
//           app.stage.removeChild(explosion.body)
//         }, 250)
//       }
//     }) 
//   }
// }
