
// display title, desciription div -start
    let displayOnClickEl = document.getElementById("displayOnClick")
    let addTaskButtonEl = document.getElementById("addTaskButton")


    displayOnClickEl.classList.add('css-display-hide') //Initially it should hide
    addTaskButtonEl.onclick = function() {
        displayOnClickEl.classList.toggle('css-display-hide')
    }
// display title, desciription div -end

// initialising list array
// let todolist =[
//     {
//     uniqueNo: 1,
//     title: "hello",
//     description: "wassup",
//     date : "2022-10-11",
//     isChecked: false,
//     },
//     {
//     uniqueNo: 2,
//     title: "hello!!!!!!!!!!",
//     description: "wassuppppppppp",
//     date : "",
//     isChecked: false,
//     }
// ]

// get the saved Todo List after parsing it 
// if it is null assign '[]' array
// else assign the saved items
function getSavedTodoListFromStorage() {
    let strigifiedTodoList = localStorage.getItem("todolist");
    let parsedTodoList = JSON.parse(strigifiedTodoList)
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todolist = getSavedTodoListFromStorage()
// uniqueNo should be based on the length of the todolist


// finding maximum unique number for assigning id's
function finding_length(todolist) {
    let max_length = todolist.length;
    for (let eachItem of todolist) {
        if (eachItem.uniqueNo>max_length){
            max_length = eachItem.uniqueNo
        }
    }
    console.log(`max-length: ${max_length}`)
    return max_length

}


// saving the todolist in local storage
let saveButtonEl = document.getElementById("saveButton");

saveButtonEl.onclick = function() {
    localStorage.setItem("todolist",JSON.stringify(todolist))
    console.log(todolist)
}


// Main div 
let displayMainTaskEl = document.getElementById("displayMainTask")

// taking inputs from the user
let titleInputEl = document.getElementById("titleInput")   // title input
let descriptionInputEl = document.getElementById("descriptionInput") // description output
let dateInputEl = document.getElementById("dateInput") //dateInput
let clickToAddEl = document.getElementById("clickToAdd") // click to add button




// on clicking "click to add" function they are added "new Todo" object and then it is added to "todoList"

clickToAddEl.onclick = function() {

    if (titleInputEl.value==="") {
        return alert("Must Add title")
        
    }

        // object to be appended into the array and isChecked is default "false"
let newTodo = {
    uniqueNo: "",
    title: "",
    description: "",
    date : "",
    isChecked: false,
}
// finding the maximum unique number so that id's wont get repeated
    let todolength = finding_length(todolist) 
    todolength = todolength+1;
    // adding unique no
    console.log(todolength)
    newTodo.uniqueNo = todolength

    // inserting the input elements into the "newTodo" object
    newTodo.title = titleInputEl.value.toUpperCase();
    // adding description and date to the list if they are not empty else initially they are empty
    if (descriptionInputEl.value!==null) {
        newTodo.description = descriptionInputEl.value;
    }
    if (dateInputEl.value!==null) {
        newTodo.date = dateInputEl.value
    }
    
    todolist.push(newTodo)
    appendTask(newTodo)
    // clearing all values when added to the display
    titleInputEl.value=""
    descriptionInputEl.value = ""
    dateInputEl.value = ""
    displayOnClickEl.classList.add('css-display-hide') 
    console.log(todolist)
}

// STATUS CHANGE FUNCTION 
function statusChange(firstChildInputElementId,secondChildElementId,parentDivElementId) {
    let firstChildInputElement = document.getElementById(firstChildInputElementId)
    let secondChildElement = document.getElementById(secondChildElementId);
    let parentDivElement = document.getElementById(parentDivElementId)

    console.log(`secondchild:${secondChildElement}`)
    secondChildElement.classList.toggle("css-secondchild-element")
    parentDivElement.classList.toggle("css-parent-div-element-toggle")

    let objectIndex = todolist.findIndex(function(eachItem) {
    let todoId = 'firstChildInputElementId'+eachItem.uniqueNo

        if (firstChildInputElementId===todoId) {
            return true
        }else {
            return false
        }
    })
    
    console.log(objectIndex)

    let todoObject = todolist[objectIndex]
    if (todoObject.isChecked===true){
        todoObject.isChecked=false
    }else {
        todoObject.isChecked=true
    }

    console.log(todolist)
}

// DELETE TASK FUNCTION
function deleteTask(parentDivElementId) {

    let parentDivElementDelete = document.getElementById(parentDivElementId);
    // removing the child from the parent DIV
    displayMainTaskEl.removeChild(parentDivElementDelete)
    
    // finding the relevant Id to splic it from the todo list  
    let objectIndexDelete = todolist.findIndex(function(eachItem) {

    let todoDeleteId = 'parentDivElement'+eachItem.uniqueNo

        if (parentDivElementId===todoDeleteId) {
            return true
        }else {
            return false
        }
    })
    
    // splicing the object from the todolist
    todolist.splice(objectIndexDelete,1)



}

// APPEND TASK FUNCTION
function appendTask(eachTodo) {
    let firstChildInputElementId;
    let parentDivElementId;
    let secondChildElementId;
    // creating 1 parent div Element and 3 child Elements
    // 1 parent Element
    let parentDivElement = document.createElement('div')
    parentDivElementId= 'parentDivElement'+eachTodo.uniqueNo // useful for deleting the task
    parentDivElement.id = parentDivElementId
    parentDivElement.classList.add("css-parent-div-element") // adding style properties
    // 3 child Elements 

    // 1st child Element - contains 'input' and 'label' elements
    let firstChildElement = document.createElement('div')
    // input element
    let firstChildInputElement = document.createElement('input')
    firstChildInputElement.type = 'checkbox'
    firstChildInputElement.checked = eachTodo.isChecked      
    firstChildInputElementId= 'firstChildInputElementId'+eachTodo.uniqueNo
    firstChildInputElement.id = firstChildInputElementId


    // label element 
    let firstChildInputLabelElement = document.createElement('label')
    firstChildInputLabelElement.for = firstChildInputElementId
    firstChildInputLabelElement.textContent = "Task Completed"
    firstChildInputLabelElement.classList.add("ml-1")
    firstChildElement.appendChild(firstChildInputElement)
    firstChildElement.appendChild(firstChildInputLabelElement)
    parentDivElement.appendChild(firstChildElement)

    // 2nd child Element - contains 'p' and 'p' and 'p' elements

    let secondChildElement = document.createElement('div')
    // title paragraph element
    let secondChildTitleParagraphElement = document.createElement('p')
    secondChildTitleParagraphElement.textContent = eachTodo.title
    secondChildTitleParagraphElement.classList.add("font-weight-bold","font-size-20")
    // ID secondChildElement
    secondChildElementId= 'secondChildElement'+eachTodo.uniqueNo // useful for deleting the task
    secondChildElement.id = secondChildElementId
    // Description paragraph element
    let secondChildDescriptionParagraphElement = document.createElement('p')
    secondChildDescriptionParagraphElement.textContent = eachTodo.description
    // date paragraph element
    let secondChildDateParagraphElement = document.createElement('p')
    secondChildDateParagraphElement.textContent = eachTodo.date

    secondChildElement.classList.add("d-flex","flex-column","justify-content-start","p-0")

    // appending elements to the child element
    secondChildElement .appendChild(secondChildTitleParagraphElement)  
    secondChildElement .appendChild(secondChildDescriptionParagraphElement)  
    secondChildElement .appendChild(secondChildDateParagraphElement)  
    parentDivElement.appendChild(secondChildElement)

    // 3rd child Element - contains 'deleteIcon' and 'delete' text
    let thirdChildElement = document.createElement('div')
    thirdChildElement.classList.add("css-third-child-element")
    let thirdChildIconElement = document.createElement('i')
    thirdChildIconElement.classList.add("far", "fa-trash-alt", "delete-icon")
    thirdChildIconElementId = "thirdChildIconElement" + eachTodo.uniqueNo
    thirdChildIconElement.id = thirdChildIconElementId

    let thirdChildDeleteElement = document.createElement('label')
    thirdChildDeleteElement.for = thirdChildIconElementId
    thirdChildDeleteElement.textContent = "Delete"
    thirdChildDeleteElement.classList.add("ml-1")
    thirdChildDeleteElement.classList.add("css-third-child-element")


    if (eachTodo.isChecked) {
        secondChildElement.classList.toggle("css-secondchild-element")
        parentDivElement.classList.toggle("css-parent-div-element-toggle")
    }


    // status change
    firstChildInputElement.onclick = function() {
        statusChange(firstChildInputElementId,secondChildElementId,parentDivElementId)
        console.log(firstChildInputElementId)
    }

    // deleting on clicking 'delete' text passing the parentDivId
    thirdChildElement.onclick = function() {
        deleteTask(parentDivElementId)
        console.log('clicked')
    }

    thirdChildElement.appendChild(thirdChildIconElement)
    thirdChildElement.appendChild(thirdChildDeleteElement)

    parentDivElement.appendChild(thirdChildElement)


    // appending the parent div to the display div , It should be in the last so that all the above
    // elements are appended correctly
    displayMainTaskEl.appendChild(parentDivElement)
   
}



// for function to add them to the display to see for the user initally which means this will
// add saved functions
// but everytime we add this forfunction doesnt run hence we need to defined the appendTask function 
// in the "click to add" function itself
for (let eachTodo of todolist) {
    // calling "appendTask" function
    appendTask(eachTodo)
}

// searching the todo tasks
let searchIdEl = document.getElementById("searchId")

searchIdEl.addEventListener("keydown", function(event) {
    if (event.key==="Enter") {
    displayMainTaskEl.textContent=""
    
    let keyWord = searchIdEl.value.toLowerCase()
    console.log(keyWord)
    for (let eachSearched of todolist) {
        let titleTodo = eachSearched.title.toLowerCase()
        console.log(titleTodo)
        if (titleTodo.includes(keyWord)){
            console.log(eachSearched)
            appendTask(eachSearched)
        }
        }
    }
}
)

