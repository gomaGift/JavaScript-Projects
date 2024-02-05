let categories = {}
let categoryHeader = document.querySelector(".category-div").innerHTML
const toDolist = document.querySelector(".ul__checkbox")
let catItem=""
const itemsRemaining = document.querySelector(".items-remaining")
const deleteButtom = document.querySelector(".delete-list")
const clearCompletedBtn = document.querySelector(".clear")



const categoryInput = document.querySelector("#category-input")
categoryInput.addEventListener('input', (e) => {
    e.preventDefault()
    // get the input value
    catItem = e.target.value
})

const ulCategory = document.querySelector(".category__item")

const categoryForm = document.querySelector(".cat-form")
categoryForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const li = document.createElement("li")
    const anchorTag = document.createElement("a")
    anchorTag.href = "#"
    anchorTag.className = "categoryTag"
    
    categoryHeader = catItem
    catItem =""

    // create an empty array for each created category
    categories = {
        ...categories, 
        [categoryHeader]:[]
    }
    console.log(categories["Hello"])
    
    anchorTag.innerHTML = categoryHeader
    
    
    // category switch
    anchorTag.addEventListener('click', (e)=> {
    e.preventDefault()
       
       categoryHeader = anchorTag.innerHTML
       
       // set the to-do header to the clicked category
       toDoHeader = document.querySelector(".category-div")
       toDoHeader.innerHTML = categoryHeader

       toDolist.innerHTML = ""
       categories[categoryHeader].map(li => toDolist.appendChild(li))
       itemsRemaining.innerHTML = `${categories[categoryHeader].length} items remaining`
    })
    
    li.appendChild(anchorTag)
    ulCategory.appendChild(li)
    categoryForm.reset()

   
   
    
})

/* To do items section */
const toDoInput = document.querySelector("#to-do-input")
let toDoItem = ""
toDoInput.addEventListener('input', (e) => {
    e.preventDefault()
    toDoItem = e.target.value
    
})


const toDoForm = document.querySelector(".to-do-input")
toDoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // create an li for each input item
  
    const li = document.createElement("li")
    li.className = "checkbox__li"

    const label = document.createElement("label")
    label.className = "checkbox"
   


    const myInput = document.createElement("input")
    myInput.type = "checkbox"
    myInput.className = "input-checkbox"
    label.appendChild(myInput)
    label.append(toDoItem)
   
   
    li.appendChild(label)
    li.addEventListener('click', () => {
        li.style.textDecoration= "line-through"

        
    })
    
    // add the li the current categories existing array
    
    categories[categoryHeader] = [...categories[categoryHeader], li]

    // display the to-do list
    categories[categoryHeader].map(li => toDolist.appendChild(li))
    itemsRemaining.innerHTML = `${categories[categoryHeader].length} items remaining`
    toDoForm.reset()
   
})


/* delete list */
deleteButtom.addEventListener('click', (e) => {
    e.preventDefault()
    // assign the current Category list to an empty array and clear the the list output
    categories[categoryHeader] = []
 
    toDolist.innerHTML = ""
    itemsRemaining.innerHTML = `${categories[categoryHeader].length} items remaining`
})


/* Clear completed items */
clearCompletedBtn.addEventListener('click', () => {
 // get all the current Category items remove items that have a line through
 const listItems = document.querySelectorAll(".checkbox__li");
 for (let i = 0; i < listItems.length; i++){
    const liItem  = listItems[i]
    if (liItem.style.textDecoration === "line-through"){
        liItem.remove() 
        categories[categoryHeader] = categories[categoryHeader].filter(item => item !== liItem);
        
    }
 }
 itemsRemaining.innerHTML = `${categories[categoryHeader].length} items remaining`


})
 







