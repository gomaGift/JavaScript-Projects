
import { getCactusRects, setUpCactus, updateCactus } from "./cactus.js"
import { getDinoRect, setUpDino, updateDino, setDinoLose } from "./dino.js"
import { setUpGround, updateGround } from "./ground.js"


const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = .00001


 

const worldElement = document.querySelector('[data-world')
const scoreElem = document.querySelector('[data-score]')
window.addEventListener('resize', scaleToWindow)


let lastTime
let speedScale 
let score 

// scale screen
function scaleToWindow(){
    let scaleRatio
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT){
        scaleRatio = window.innerWidth / WORLD_WIDTH
    }

    else 
       scaleRatio = window.innerHeight / WORLD_HEIGHT

    worldElement.style.width = `${WORLD_WIDTH * scaleRatio}px`
    worldElement.style.height = `${WORLD_HEIGHT * scaleRatio}px`
}

function update (time){
    if (lastTime == null){
         lastTime = time
         window.requestAnimationFrame(update)
         return
    }
    const delta = time - lastTime

    updateGround(delta, speedScale)
    updateSpeedScale(delta)
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)
    updateSpeed(delta)
    if (checkLose()) {
        return handleLose()
    }
    lastTime = time
    window.requestAnimationFrame(update)
    
}
function handleStart() {
    document.querySelector(".start-screen").classList.add("hide")
    lastTime = null
    speedScale = 1
    score = 1
    setUpGround()
    setUpDino()
    setUpCactus()
    window.requestAnimationFrame(update) 
}



function updateSpeedScale (delta){
    speedScale += delta * SPEED_SCALE_INCREASE
}

function updateSpeed(delta) {
    score += delta * .01
    scoreElem.textContent = Math.floor(score)
}

function checkLose() {
   const dinoRect = getDinoRect()
   return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2){
    return rect1.left < rect2.right &&
           rect1.right > rect2.left &&
           rect1.top < rect2.bottom &&
           rect1.bottom > rect2.top
}

function handleLose(){
    setDinoLose()
    setTimeout(() => {
        document.addEventListener('keydown', handleStart,{once: true})
        document.querySelector(".start-screen").classList.remove("hide")
    },100)
}

document.addEventListener('keydown', handleStart,{once: true})
