
// Canvas setUp
let board;
let context;
const boardWidth = 370
const boardHeight = 580

// Flapp Bird SetUp
const birdImage = new Image()
birdImage.src = "./flappybird.png"
const birdWidth = 32
const birdHeight = 24
const birdY = boardHeight/2
const birdX = 20
const bird = {
    image: birdImage,
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

//Pipes SetUp
let pipes = [] // Pipe storage
const pipeWidth = 64
const pipeHeight = 512

const topPipeImage = new Image()
topPipeImage.src = "./toppipe.png"

const bottomPipeImage = new Image()
bottomPipeImage.src = "./bottompipe.png"

const velocityX = -2 // negative velocity for moving the pipe to the left
const spaceBetween = pipeHeight / 4   
let velocityY = 0 // distance for moving the bird up
const gravity = .4 // distance for moving the bird down

let gameOver = false
let score = 0

window.onload = function () {
    // set the canvas parameters
    board = document.querySelector(".board")
    board.width = boardWidth
    board.height = boardHeight
    
    // context used for drawing on the screen
    context = board.getContext("2d")
    
    // Draw the bird to the canvas on Bird Load
    context.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height)

    

    requestAnimationFrame(update)
    setInterval(placePipes, 1500)
    
    // event listener for moving the bird up
    document.addEventListener('keydown', jump)
    document.addEventListener('click', jumpWithMouse)
   

}

// Main function Loop
function update() {
    requestAnimationFrame(update)
    if (gameOver) {
        return
    }
    // clear the previous frame
    context.clearRect(0, 0, boardWidth, boardHeight)
    
    // Bird
    velocityY += gravity
    bird.y = Math.max(bird.y + velocityY, 0) // prevents the bird from going beyond the board
    context.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height)
    if (bird.y > boardHeight) {
        gameOver = true
    }
    
    // Pipes
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i]
        pipe.x += velocityX
        context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height)
        
        if (!pipe.passed &&  bird.x > pipe.x + pipe.width) {
            score += .5
            pipe.passed = true
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true
        }
    }
    
    // score
    context.fillStyle  = "white"
    context.font = "30px Arial"
    context.fillText(score, 8, 30) 

    // game over
    if (gameOver){
        context.fillText("Game Over", 110, 250)   
    }
    
}


function placePipes() {
    if (gameOver){
        return 
    }
    let randomY = 0 - (pipeHeight/2) - Math.random() * (pipeHeight / 4)
    
    const topPipe = {
        image: topPipeImage,
        x: boardWidth,
        y: randomY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipes.push(topPipe)

    const bottomPipe = {
        image: bottomPipeImage,
        x: boardWidth,
        y: randomY + pipeHeight + spaceBetween,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipes.push(bottomPipe)
}

/* Move up and Reset */
function jump(e) {
   if (e.code == "Space"  || e.code == "ArrowUp"  || e.code == "KeyX"){
    //jump
    velocityY = -4
    
    //reset
    if (gameOver){
        gameOver = false
        bird.y = birdY
        pipes = []
        score = 0
    }
   }
}

function jumpWithMouse() {
    velocityY = -4
    
    //reset
    if (gameOver){
        gameOver = false
        bird.y = birdY
        pipes = []
        score = 0
    }
}

/* Detection Collision */
function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y

}