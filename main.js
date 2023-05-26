let todoItemContainer=document.getElementById("todoitemcontainer");
let orderText= document.getElementById("OrderBYbutton");
let caretUp= document.getElementById("caretUp");
let caretDown= document.getElementById("caretDown");
function getTodoData(){
    let todoDataFile=   JSON.parse(localStorage.getItem("todoData"));
    if(todoDataFile===null){
        return [];
    }
    else{
        return todoDataFile;
    }
}

function getTodoDataarr(){
    let todoDataFile=   JSON.parse(localStorage.getItem("todoDataarr"));
    if(todoDataFile===null){
        return [];
    }
    else{
        return todoDataFile;
    }
}
let deadline_status=0,A_Z=0,Z_A=0,deadlin=0;
let todoListItems= getTodoData();
let arr=getTodoDataarr();
    // {
    //     text:"Learn HTML",
    //     uniqueNum:0
    // },
    // {
    //     text:"Learn CSS",
    //     uniqueNum:1
    // },
    // {
    //     text:"complete static website course",
    //     uniqueNum:2
    // },
    // {
    //     text:"complete responsive website course",
    //     uniqueNum:3
    // },
    // {
    //     text:"complete dynamic website course",
    //     uniqueNum:4
    // },
    // {
    //     text:"make todo list",
    //     uniqueNum:5
    // },

function onClickAdd(){
 let userInput= document.getElementById("userInputId");
 let userTime=document.getElementById("userTimeId");
 let userInputValue = userInput.value;
 let userTimeValue= userTime.value;
 let userDate=document.getElementById("userDateId");
 let userDateValue = userDate.value;
 if(userInputValue==="" || userTimeValue==="" || userDateValue==="" ){
    alert("Enter a valid text");
    return;
 }
 arrSize = todoListItems.length;
 let newTodo={
    text:userInputValue,
    date:userDateValue,
    time:userTimeValue,
    uniqueNum:arrSize,
    isCheked:false
 };
 todoListItems.push(newTodo);
 arr.push(newTodo);
 createAndAppend(newTodo);
 userInput.value= "";
 userTime.value="";
 userDate.value="";
 onClickSave();
}
function delete_todo(todoItemContainer, todoId){
    let todoElement= document.getElementById(todoId);
    todoItemContainer.removeChild(todoElement);
    let indexOfArray= todoListItems.findIndex(
    function(eachTodo){
        let eachTodoId= "todo"+eachTodo.uniqueNum;
        if(eachTodoId===todoId){
            return true;
        } 
        else{
            return false;
        }
    }
   
    );
    todoListItems.splice(indexOfArray,1);
    arr.splice(indexOfArray,1);
    onClickSave();

}
function onClickSave(){
    localStorage.setItem("todoData",JSON.stringify(todoListItems));
    localStorage.setItem("todoDataarr",JSON.stringify(arr));
}
function deadlineofDropDown(){
 if(deadlin===0){
    todoListItems.sort((a,b)=>
    {
    let fa = parseInt(datecalcu(a.date)),
        fb = parseInt(datecalcu(b.date));
    // console.log(fa);
    // console.log(fb);
    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    else{
       let ft=parseInt(timecalcu(a.time)),
       st=parseInt(timecalcu(b.time));
       if (ft < st) {
        return -1;
    }
    if (ft > st) {
        return 1;
    }
    return 0;
    }
    }
    );
    orderText.textContent="Deadline";
    for(let todos of todoListItems){
        let todoElement= document.getElementById("todo"+todos.uniqueNum);
        todoItemContainer.removeChild(todoElement);
    }
    // todoListItems.splice(0,todoListItems.length);
    onClickSave();
    for(let todos of todoListItems){
        createAndAppend(todos)
    }
    deadlin=1;A_Z=0;Z_A=0;
}
    else{
        caretUp.classList.remove("addcolortocaret");
        caretDown.classList.remove("addcolortocaret");
        orderText.textContent="Order by";
        todoListItems=arr.slice();
        for(let todos of todoListItems){
            let todoElement= document.getElementById("todo"+todos.uniqueNum);
            todoItemContainer.removeChild(todoElement);
        }
        // todoListItems.splice(0,todoListItems.length);
        onClickSave();
        for(let todos of todoListItems){
            createAndAppend(todos)
        }
        deadlin=0;
       }
}
function Deadlinebutton(){
    if(deadlin===0){
        return;
    }
  if (deadline_status===0 ){
    ondecreasingDeadline();
    
  }
  else{
    onDeadline();
   
  }
}
function checkTheCheckbox(checkBoxId, labelId, todoId){
    // let checkboxelement= document.getElementById(checkBoxId);
    let todositem= document.getElementById(labelId);
    // console.log(checkboxelement.checked);
    // if(checkboxelement.checked===true){
        // console.log("add");
    //    todositem.classList.add("checked");
       todositem.classList.toggle("checked");
    // }
    // else{
        // console.log("remove");
        // todositem.classList.remove("checked");
    // }
   let arrIndex= todoListItems.findIndex(function(eachTodo){
    let eachTodoId= "todo"+eachTodo.uniqueNum;
    if(eachTodoId===todoId){
        return true;
    } 
    else{
        return false;
    }
   });
   let todoObject= todoListItems[arrIndex];
   if(todoObject.isCheked===true){
    todoObject.isCheked=false;
   }
   else{
    todoObject.isCheked=true;
   }
}
function AZbutton(){
  if(A_Z===0){
    todoListItems.sort((a,b)=>
    {
    let fa = a.text.toLowerCase(),
        fb = b.text.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
    }
    );
    orderText.textContent="A-Z";
    for(let todos of todoListItems){
        let todoElement= document.getElementById("todo"+todos.uniqueNum);
        todoItemContainer.removeChild(todoElement);
    }
    // todoListItems.splice(0,todoListItems.length);
    onClickSave();
    for(let todos of todoListItems){
        createAndAppend(todos)
    }
    A_Z=1;Z_A=0;deadlin=0;
  }
   else{
    orderText.textContent="Order by";
    todoListItems=arr.slice();
    for(let todos of todoListItems){
        let todoElement= document.getElementById("todo"+todos.uniqueNum);
        todoItemContainer.removeChild(todoElement);
    }
    // todoListItems.splice(0,todoListItems.length);
    onClickSave();
    for(let todos of todoListItems){
        createAndAppend(todos)
    }
    A_Z=0;
   }
}
function ZAbutton(){
   if(Z_A===0){
    todoListItems.sort((a,b)=>
    {
    let fa = a.text.toLowerCase(),
        fb = b.text.toLowerCase();

    if (fa > fb) {
        return -1;
    }
    if (fa < fb) {
        return 1;
    }
    return 0;
    }
    );
    orderText.textContent="Z-A";
    for(let todos of todoListItems){
        let todoElement= document.getElementById("todo"+todos.uniqueNum);
        todoItemContainer.removeChild(todoElement);
    }
    // todoListItems.splice(0,todoListItems.length);
    onClickSave();
    for(let todos of todoListItems){
        createAndAppend(todos)
    }
    Z_A=1;A_Z=0; deadlin=0;
   }
    else{
        orderText.textContent="Order by";
        todoListItems=arr.slice();
        for(let todos of todoListItems){
            let todoElement= document.getElementById("todo"+todos.uniqueNum);
            todoItemContainer.removeChild(todoElement);
        }
        // todoListItems.splice(0,todoListItems.length);
        onClickSave();
        for(let todos of todoListItems){
            createAndAppend(todos)
        }
        Z_A=0;
       }
   
}
function datecalcu(str){
    let sum=0;
    for(let i=0; i<str.length; i++){
     if(str[i]!='-'){
        sum+=str[i];
     }
    }
    return sum
}
function timecalcu(str){
    let sum=0;
    for(let i=0; i<str.length; i++){
     if(str[i]!=':'){
        sum+=str[i];
     }
    }
    return sum
}
function onDeadline(){
    deadline_status=0;
    caretUp.classList.add("addcolortocaret");
    caretDown.classList.remove("addcolortocaret");
    // if(deadlin===0){
    todoListItems.sort((a,b)=>
    {
    let fa = parseInt(datecalcu(a.date)),
        fb = parseInt(datecalcu(b.date));
    // console.log(fa);
    // console.log(fb);
    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    else{
       let ft=parseInt(timecalcu(a.time)),
       st=parseInt(timecalcu(b.time));
       if (ft < st) {
        return -1;
    }
    if (ft > st) {
        return 1;
    }
    return 0;
    }
    }
    );
   
    for(let todos of todoListItems){
        let todoElement= document.getElementById("todo"+todos.uniqueNum);
        todoItemContainer.removeChild(todoElement);
    }
    // todoListItems.splice(0,todoListItems.length);
    onClickSave();
    for(let todos of todoListItems){
        createAndAppend(todos)
    }
//     deadlin=1;
// }
    // else{
    //     todoListItems=arr.slice();
    //     for(let todos of todoListItems){
    //         let todoElement= document.getElementById("todo"+todos.uniqueNum);
    //         todoItemContainer.removeChild(todoElement);
    //     }
    //     // todoListItems.splice(0,todoListItems.length);
    //     onClickSave();
    //     for(let todos of todoListItems){
    //         createAndAppend(todos)
    //     }
    //     deadlin=0;
    //    }
}
function ondecreasingDeadline(){
    caretUp.classList.remove("addcolortocaret");
    caretDown.classList.add("addcolortocaret");
    todoListItems.sort((a,b)=>
    {
    let fa = parseInt(datecalcu(a.date)),
        fb = parseInt(datecalcu(b.date));
    // console.log(fa);
    // console.log(fb);
    if (fa > fb) {
        return -1;
    }
    if (fa < fb) {
        return 1;
    }
    else{
       let ft=parseInt(timecalcu(a.time)),
       st=parseInt(timecalcu(b.time));
       if (ft < st) {
        return -1;
    }
    if (ft > st) {
        return 1;
    }
    return 0;
    }
    }
    );
   
    for(let todos of todoListItems){
        let todoElement= document.getElementById("todo"+todos.uniqueNum);
        todoItemContainer.removeChild(todoElement);
    }
    // todoListItems.splice(0,todoListItems.length);
    onClickSave();
    for(let todos of todoListItems){
        createAndAppend(todos)
    }
    deadline_status=1; 
}
// let bgElement= document.getElementById("bgcontainer");
// // console.log(parseInt(bgElement.style.height-"vh"));
// bgheight=parseInt(bgElement.style.height)/2;
function createAndAppend(todos)
{
let todoId= "todo"+todos.uniqueNum;


let listItem = document.createElement("li");
listItem.classList.add("d-flex" , "flex-row");
listItem.id= todoId;
todoItemContainer.appendChild(listItem);

let checkBoxId= "checkbox"+todos.uniqueNum;
let labelId="label"+todos.uniqueNum;
let inputItem= document.createElement("input");
inputItem.type="checkbox";
inputItem.id= checkBoxId;
inputItem.classList.add("check_box_input");
listItem.appendChild(inputItem);
let listContainer= document.createElement("div");
listContainer.classList.add("d-flex" ,"flex-row" ,"list_container", "mb-2");
listItem.appendChild(listContainer);
let labelname= document.createElement("label");
labelname.setAttribute("for",checkBoxId);
labelname.classList.add("label_containers");
labelname.textContent=todos.text;
// let labelText= document.createElement("div");
let labelTime= document.createElement("div");
let labelDate= document.createElement("div");
// labelText.textContent=todos.text;
labelTime.textContent=todos.time;
labelDate.textContent=todos.date;
labelTime.classList.add("ml-5");
// labelname.appendChild(labelText);
labelTime.classList.add("label_date_and_time");
labelDate.classList.add("label_date_and_time");
labelname.id=labelId;
listContainer.appendChild(labelname);
listContainer.appendChild(labelDate);
listContainer.appendChild(labelTime);

// listItem.style.textDecoration= "line-through";
inputItem.checked=todos.isCheked;
if(todos.isCheked === true){
    labelname.classList.add("checked");
}
else{
    labelname.classList.remove("checked");
}
inputItem.onclick = function(){
    checkTheCheckbox(checkBoxId,labelId, todoId);
    // labelname.style.textDecoration= "line-through";
};
let trashContainer=document.createElement("div");
trashContainer.classList.add("deleted_trash");
listContainer.appendChild(trashContainer);
let deletedIcon= document.createElement("i");
deletedIcon.classList.add("fa-solid","fa-trash-can","trash_container");
trashContainer.appendChild(deletedIcon);
deletedIcon.onclick= function(){
    delete_todo(todoItemContainer, todoId);
}

}

for(let todos of todoListItems){
    createAndAppend(todos)
}
// checkTheCheckbox("checkbox"+2,"label"+2 )

// document.getElementById("label"+2).style.textDecoration="line-through";
