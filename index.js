const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerWidth

const gravity = 0.5

class Player {
  constructor() {
    this.position = {
        x: 100,
        y: 100
    }
    this.velocity = {
        x: 0,
        y: 1
    }

    this.width = 30
    this.height = 30
  }
  draw() {
      c.fillStyle = 'red'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
    else this.velocity.y = 0
    
  }
}

class Platform {
    constructor() {
        this.position = {
            x: 200,
            y: 500,
        }

        this.width = 200
        this.height = 20
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platform = new Platform()

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platform.draw()

    // move keys 'a' and 'd'
    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else player.velocity.x = 0
}

animate()

window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65: 
          keys.left.pressed = true
          break
        case 68: 
          keys.right.pressed = true
          break
        case 87: 
          player.velocity.y -= 20
          break
        case 83: 
          break
    }
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65: 
          keys.left.pressed = false
          break
        case 68: 
          keys.right.pressed = false
          break
        case 87: 
        //   player.velocity.y -= 5
          break
        case 83: 
          break
    }
})