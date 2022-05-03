import platform from '../images/platform.png'
import hills from '../images/hills.png'
import background from '../images/background.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

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
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc

    return image
}

const platformImage = createImage(platform)

const player = new Player()
const platforms = [new Platform({
    x: -1, 
    y: 470,
    image: platformImage
}), new Platform({
    x: platformImage.width - 3, 
    y: 470,
    image: platformImage
})]

const genericObject = [
    new GenericObject({
        x: -1,
        y: -1,
        image: createImage(background)
    })
]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    genericObject.forEach((genericObject) => {
        genericObject.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    // move keys 'a' and 'd'
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach((platform) => {
                platform.position.x -= 5
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach((platform) => {
                platform.position.x += 5
            })
        }
    }

    // platform collision detection
    platforms.forEach((platform) => {
    if (
        player.position.y + player.height <= platform.position.y && 
        player.position.y + player.height + player.velocity.y >= platform.position.y && 
        player.position.x + player.width >= platform.position.x && 
        player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0}
    })

    if (scrollOffset > 2000) {

    }
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