import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const worldElem = document.querySelector('[data-world]')

const MIN_CACTUS_INTERVAL = 800
const MAX_CACTUS_INTERVAL = 2000
const SPEED = .05
let nextCactusTime
let allCactusToshowInteval  
let allCactus 
let cactusImg
let imgSrc
const imgArray = ["cactus0", "cactus1", "cactus2", "big-cactus3", "big-cactus4", "big-cactus5"]

export function setUpCactus(){
        document.querySelectorAll('[data-cactus]').forEach(cactus => cactus.remove())
        nextCactusTime = MIN_CACTUS_INTERVAL
        allCactusToshowInteval = 10000
        allCactus = 6
        

}

export function updateCactus(delta, speedScale){
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(cactus, "--left") <= -100){
            cactus.remove()
        }
     })
     if (nextCactusTime <= 0){
        createCactus()
        nextCactusTime = randomCactusInterval(MAX_CACTUS_INTERVAL, MIN_CACTUS_INTERVAL)/speedScale
     }
     
     nextCactusTime -= delta
     allCactusToshowInteval -= delta
}

function createCactus(){
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true 
    if (allCactusToshowInteval <= 0){ 
       cactusImg = Math.floor(Math.random() * (imgArray.length - 1))
       if (imgArray[cactusImg].startsWith("big")){
        setCustomProperty(cactus, "--height", 30)
       }
       else {
        setCustomProperty(cactus, "--height", 20)
       }
       imgSrc = imgArray[cactusImg]
    }
    else {
        cactusImg = Math.floor(Math.random() * (imgArray.length - 2))
        if (imgArray[cactusImg].startsWith("big")){
            setCustomProperty(cactus, "--height", 30)
           }
           else {
            setCustomProperty(cactus, "--height", 20)
           }
           imgSrc = imgArray[cactusImg]
    }
    cactus.src = `./img/${imgSrc}.png`
    
    console.log(cactus.src)
    cactus.classList.add("cactus") 
    setCustomProperty(cactus, "--left", 100)
    worldElem.append(cactus)
}

export function getCactusRects(){
    return [...document.querySelectorAll('[data-cactus]')].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function randomCactusInterval(max, min){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
