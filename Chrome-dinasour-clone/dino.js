import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const dinoElem = document.querySelector('[data-dino]')

const JUMP_SPEED = .35
const GRAVITY = .0013
const FRAME_TIME  = 100
let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setUpDino() {
   isJumping = false
   dinoFrame = 0
   currentFrameTime = 0
   yVelocity = 0
   setCustomProperty(dinoElem,"--bottom", 0)
   document.removeEventListener("keydown", onJump)
   document.addEventListener("keydown", onJump)

}

export function updateDino(delta, speedScale){
    handleRun(delta, speedScale)
    handleJump(delta)
}
export function getDinoRect(){
   return dinoElem.getBoundingClientRect()
   
}

export function setDinoLose(){
    dinoElem.src ="./img/dino-dead.png"
}

function handleRun(delta, speedScale){
    if (isJumping) {
        dinoElem.src = "./img/dino.png"
        return
    }
    if (currentFrameTime >= FRAME_TIME){
        dinoFrame = dinoFrame == 1 ? 2: 1
        dinoElem.src = `./img/dino-run${dinoFrame}.png`
        currentFrameTime = 0
    }
    currentFrameTime += delta * speedScale

}

function handleJump(delta){
    if (!isJumping) 
       return

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta )
    if (getCustomProperty(dinoElem, "--bottom") <= 0)
    {
        setCustomProperty(dinoElem,"--bottom", 0)
        isJumping = false
    }
    yVelocity -= delta * GRAVITY


}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return
    yVelocity = JUMP_SPEED
    isJumping = true
}