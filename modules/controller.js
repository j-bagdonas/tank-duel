export default class Controller {
  constructor(){
    document.addEventListener('keydown', (event) => {
      if(event.code === "Space"){
        this.shoot = true
        event.preventDefault()
      } else if (event.code === "ArrowRight" || event.code === "KeyD"){
        this.right = true
      } else if (event.code === "ArrowLeft" || event.code === "KeyA"){
        this.left = true
      } else if (event.code === "ArrowUp" || event.code === "KeyW"){
        this.up = true
      } else if (event.code === "ArrowDown" || event.code === "KeyS"){
        this.down = true
      } else if (event.code === "ShiftLeft" || event.code === "ShiftRight"){
        this.missile = true
      } else if (event.code === "KeyP") {
        this.pause === true ? this.pause = false : this.pause = true
      }
    }, false);
    document.addEventListener('keyup', (event) => {
      if(event.code === "Space"){   
        this.shoot = false
      } else if (event.code === "ArrowRight" || event.code === "KeyD"){
        this.right = false
      } else if (event.code === "ArrowLeft" || event.code === "KeyA"){
        this.left = false
      } else if (event.code === "ArrowUp" || event.code === "KeyW"){
        this.up = false
      } else if (event.code === "ArrowDown" || event.code === "KeyS"){
        this.down = false
      } else if (event.code === "ShiftLeft" || event.code === "ShiftRight"){
        this.missile = false
      }
    }, false)
    document.onmousemove = (event) => {
      this.mouseX = event.clientX
      this.mouseY = event.clientY
    }
  }
} 