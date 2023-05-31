let todoItemContainer = document.getElementById("todoitemcontainer");
let orderText = document.getElementById("OrderBYbutton");
let caretUp = document.getElementById("caretUp");
let caretDown = document.getElementById("caretDown");
let deadlineContainer = document.getElementById("deadlineContainer");
let userInput = document.getElementById("userInputId");
let userTime = document.getElementById("userTimeId");
let userDate = document.getElementById("userDateId");
let searchLogoSm=document.getElementById("searchLogoSm");
let searchbarSm=document.getElementById("searchbarSm");
let searchsmall=document.getElementById("searchsmall");
let formSmall=document.getElementById("formsmall");
let searchmd= document.getElementById("searchmd");
function searchTodosm(){
    let input= searchsmall.value;
    let filter= input.toUpperCase();
    
    let ul = document.getElementById("todoitemcontainer");
  
    let li = ul.getElementsByTagName("li");
    for(let i=0; i<li.length; i++){
           
        a = li[i].getElementsByTagName("label")[0];
        // console.log(a.textContent);

       let txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].classList.remove("d-none");
        } else {
          li[i].classList.add("d-none");
        }
        // console.log("display wala chal gya");
    }
    }
searchsmall.addEventListener("keyup", searchTodosm);
// searchmd.addEventListener("change", searchTodomd);

function searchTodomd(){
    let input= searchmd.value;
    let filter= input.toUpperCase();
    
    let ul = document.getElementById("todoitemcontainer");
  
    let li = ul.getElementsByTagName("li");
    for(let i=0; i<li.length; i++){
           
        a = li[i].getElementsByTagName("label")[0];
        // console.log(a.textContent);

       let txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].classList.remove("d-none");
        } else {
          li[i].classList.add("d-none");
        }
        // console.log("display wala chal gya");
    }
}
searchmd.addEventListener("keyup",searchTodomd);
formSmall.addEventListener("submit", function(event){
    event.preventDefault();
});
searchLogoSm.addEventListener("click",function(){
    searchbarSm.classList.remove("d-none");
    searchLogoSm.classList.add("d-none");
});
searchsmall.addEventListener("blur",function(){
    if(searchsmall.value===""){
    // console.log("blurEVenttriggered");
    searchbarSm.classList.add("d-none");
    searchLogoSm.classList.remove("d-none");
}
})
userInput.addEventListener("keyup", function(event){
  if(event.key==="Enter"){
    userDate.focus();
  }
});
userDate.addEventListener("keyup", function(event){
    if(event.key==="Enter"){
        userTime.focus();
    }
  });
  userTime.addEventListener("keyup", function(event){
    if(event.key==="Enter"){
        onClickAdd();
    }
  });
function getTodoData() {
    let todoDataFile = JSON.parse(localStorage.getItem("todoData"));
    if (todoDataFile === null) {
        return [];
    } else {
        return todoDataFile;
    }
}

function getTodoDataarr() {
    let todoDataFile = JSON.parse(localStorage.getItem("todoDataarr"));
    if (todoDataFile === null) {
        return [];
    } else {
        return todoDataFile;
    }
}
function getA_Zdata(){
    let A_Zdatastored= JSON.parse(localStorage.getItem("A_Zdata"));
    if(A_Zdatastored===null){
        return 0;
    }
    else{
        return A_Zdatastored;
    }
}
function orderByStatus(){
      let orderBydatastored= JSON.parse(localStorage.getItem("orderBydata"));
    if(orderBydatastored===null){
        return "Order by";
    }
    else{
        return orderBydatastored;
    }
}
function getZ_Adata(){
    let Z_Adatastored= JSON.parse(localStorage.getItem("Z_Adata"));
    if(Z_Adatastored===null){
        return 0;
    }
    else{
        return Z_Adatastored;
    }
}
function getdeadlinedata(){
    let deadlinedatastored= JSON.parse(localStorage.getItem("deadlinedata"));
    if(deadlinedatastored===null){
        return 0;
    }
    else{
        return deadlinedatastored;
    }
}

orderText.textContent= orderByStatus();
let deadline_status = 0;
 let   A_Z = getA_Zdata();
 let   Z_A = getZ_Adata(),
    deadlin = getdeadlinedata();
if(deadlin===1){
    deadlineContainer.classList.remove("d-none");
}
else{
    deadlineContainer.classList.add("d-none");
}
let todoListItems = getTodoData();
let arr = getTodoDataarr();
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

function onClickAdd() {
  
    let userInputValue = userInput.value;
    let userTimeValue = userTime.value;
   
    let userDateValue = userDate.value;
    if (userInputValue === "" || userTimeValue === "" || userDateValue === "") {
        alert("Enter a valid text");
        return;
    }
    arrSize = todoListItems.length;
    let newTodo = {
        text: userInputValue,
        date: userDateValue,
        time: userTimeValue,
        uniqueNum: arrSize,
        isCheked: false
    };
    todoListItems.push(newTodo);
    arr.push(newTodo);
    createAndAppend(newTodo);
    userInput.value = "";
    userTime.value = "";
    userDate.value = "";
    onClickSave();
}

function delete_todo(todoItemContainer, todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemContainer.removeChild(todoElement);
    let indexOfArray = todoListItems.findIndex(
        function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNum;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        }

    );
    todoListItems.splice(indexOfArray, 1);
    arr.splice(indexOfArray, 1);
    onClickSave();

}

function onClickSave() {
    localStorage.setItem("todoData", JSON.stringify(todoListItems));
    localStorage.setItem("todoDataarr", JSON.stringify(arr));
}

function deadlineofDropDown() {
    if (deadlin === 0) {
        deadlineContainer.classList.remove("d-none");
        todoListItems.sort((a, b) => {
            let fa = parseInt(datecalcu(a.date)),
                fb = parseInt(datecalcu(b.date));
            // console.log(fa);
            // console.log(fb);
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            } else {
                let ft = parseInt(timecalcu(a.time)),
                    st = parseInt(timecalcu(b.time));
                if (ft < st) {
                    return -1;
                }
                if (ft > st) {
                    return 1;
                }
                return 0;
            }
        });
        orderText.textContent = "Deadline";
        for (let todos of todoListItems) {
            let todoElement = document.getElementById("todo" + todos.uniqueNum);
            todoItemContainer.removeChild(todoElement);
        }
        // todoListItems.splice(0,todoListItems.length);
        onClickSave();
        for (let todos of todoListItems) {
            createAndAppend(todos)
        }
        deadlin = 1;
        A_Z = 0;
        Z_A = 0;
    } else {
        deadlineContainer.classList.add("d-none");
        caretUp.classList.remove("addcolortocaret");
        caretDown.classList.remove("addcolortocaret");
        orderText.textContent = "Order by";
        todoListItems = arr.slice();
        for (let todos of todoListItems) {
            let todoElement = document.getElementById("todo" + todos.uniqueNum);
            todoItemContainer.removeChild(todoElement);
        }
        // todoListItems.splice(0,todoListItems.length);
        onClickSave();
        for (let todos of todoListItems) {
            createAndAppend(todos)
        }
        deadlin = 0;
    }
     localStorage.setItem("A_Zdata", JSON.stringify(A_Z));
     localStorage.setItem("Z_Adata", JSON.stringify(Z_A));
     localStorage.setItem("deadlinedata", JSON.stringify(deadlin));
     localStorage.setItem("orderBydata", JSON.stringify(orderText.textContent));
}

function Deadlinebutton() {
    if (deadlin === 0) {
        return;
    }
    if (deadline_status === 0) {
        ondecreasingDeadline();

    } else {
        onDeadline();

    }
}

function checkTheCheckbox(checkBoxId, labelId, todoId) {
    // let checkboxelement= document.getElementById(checkBoxId);
    let todositem = document.getElementById(labelId);
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
    let arrIndex = todoListItems.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNum;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoListItems[arrIndex];
    if (todoObject.isCheked === true) {
        todoObject.isCheked = false;
    } else {
        todoObject.isCheked = true;
    }
    onClickSave();
}

function AZbutton() {
    if (A_Z === 0) {
        deadlineContainer.classList.add("d-none");
        todoListItems.sort((a, b) => {
            let fa = a.text.toLowerCase(),
                fb = b.text.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        orderText.textContent = "A-Z";
        for (let todos of todoListItems) {
            let todoElement = document.getElementById("todo" + todos.uniqueNum);
            todoItemContainer.removeChild(todoElement);
        }
        // todoListItems.splice(0,todoListItems.length);
        onClickSave();
        for (let todos of todoListItems) {
            createAndAppend(todos)
        }
        A_Z = 1;
        Z_A = 0;
        deadlin = 0;
    } else {
        orderText.textContent = "Order by";
        todoListItems = arr.slice();
        for (let todos of todoListItems) {
            let todoElement = document.getElementById("todo" + todos.uniqueNum);
            todoItemContainer.removeChild(todoElement);
        }
        // todoListItems.splice(0,todoListItems.length);
        onClickSave();
        for (let todos of todoListItems) {
            createAndAppend(todos)
        }
        A_Z = 0;
    }
   
     localStorage.setItem("A_Zdata", JSON.stringify(A_Z));
     localStorage.setItem("Z_Adata", JSON.stringify(Z_A));
     localStorage.setItem("deadlinedata", JSON.stringify(deadlin));
     localStorage.setItem("orderBydata", JSON.stringify(orderText.textContent));
}

function ZAbutton() {
    if (Z_A === 0) {
        deadlineContainer.classList.add("d-none");
        todoListItems.sort((a, b) => {
            let fa = a.text.toLowerCase(),
                fb = b.text.toLowerCase();

            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        orderText.textContent = "Z-A";
        for (let todos of todoListItems) {
            let todoElement = document.getElementById("todo" + todos.uniqueNum);
            todoItemContainer.removeChild(todoElement);
        }
        // todoListItems.splice(0,todoListItems.length);
        onClickSave();
        for (let todos of todoListItems) {
            createAndAppend(todos)
        }
        Z_A = 1;
        A_Z = 0;
        deadlin = 0;
    } else {
        orderText.textContent = "Order by";
        todoListItems = arr.slice();
        for (let todos of todoListItems) {
            let todoElement = document.getElementById("todo" + todos.uniqueNum);
            todoItemContainer.removeChild(todoElement);
        }
        // todoListItems.splice(0,todoListItems.length);
        onClickSave();
        for (let todos of todoListItems) {
            createAndAppend(todos)
        }
        Z_A = 0;
    }
     localStorage.setItem("A_Zdata", JSON.stringify(A_Z));
     localStorage.setItem("Z_Adata", JSON.stringify(Z_A));
     localStorage.setItem("deadlinedata", JSON.stringify(deadlin));
     localStorage.setItem("orderBydata", JSON.stringify(orderText.textContent));
}

function datecalcu(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] != '-') {
            sum += str[i];
        }
    }
    return sum
}

function timecalcu(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] != ':') {
            sum += str[i];
        }
    }
    return sum
}

function onDeadline() {
    deadline_status = 0;
    caretUp.classList.add("addcolortocaret");
    caretDown.classList.remove("addcolortocaret");
    // if(deadlin===0){
    todoListItems.sort((a, b) => {
        let fa = parseInt(datecalcu(a.date)),
            fb = parseInt(datecalcu(b.date));
        // console.log(fa);
        // console.log(fb);
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        } else {
            let ft = parseInt(timecalcu(a.time)),
                st = parseInt(timecalcu(b.time));
            if (ft < st) {
                return -1;
            }
            if (ft > st) {
                return 1;
            }
            return 0;
        }
    });

    for (let todos of todoListItems) {
        let todoElement = document.getElementById("todo" + todos.uniqueNum);
        todoItemContainer.removeChild(todoElement);
    }
    // todoListItems.splice(0,todoListItems.length);
    onClickSave();
    for (let todos of todoListItems) {
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

function ondecreasingDeadline() {
    caretUp.classList.remove("addcolortocaret");
    caretDown.classList.add("addcolortocaret");
    todoListItems.sort((a, b) => {
        let fa = parseInt(datecalcu(a.date)),
            fb = parseInt(datecalcu(b.date));
        // console.log(fa);
        // console.log(fb);
        if (fa > fb) {
            return -1;
        }
        if (fa < fb) {
            return 1;
        } else {
            let ft = parseInt(timecalcu(a.time)),
                st = parseInt(timecalcu(b.time));
            if (ft < st) {
                return -1;
            }
            if (ft > st) {
                return 1;
            }
            return 0;
        }
    });

    for (let todos of todoListItems) {
        let todoElement = document.getElementById("todo" + todos.uniqueNum);
        todoItemContainer.removeChild(todoElement);
    }
    // todoListItems.splice(0,todoListItems.length);
    onClickSave();
    for (let todos of todoListItems) {
        createAndAppend(todos)
    }
    deadline_status = 1;
}
// let bgElement= document.getElementById("bgcontainer");
// // console.log(parseInt(bgElement.style.height-"vh"));
// bgheight=parseInt(bgElement.style.height)/2;
function createAndAppend(todos) {
    let todoId = "todo" + todos.uniqueNum;

    
    let listItem = document.createElement("li");
    listItem.classList.add("d-flex", "flex-row");
    listItem.id = todoId;
    todoItemContainer.appendChild(listItem);

    let checkBoxId = "checkbox" + todos.uniqueNum;
    let labelId = "label" + todos.uniqueNum;
    let inputItem = document.createElement("input");
    inputItem.type = "checkbox";
    inputItem.id = checkBoxId;
    inputItem.classList.add("check_box_input");
    listItem.appendChild(inputItem);
    let listContainer = document.createElement("div");
    listContainer.classList.add("d-flex", "flex-column", "list_container", "mb-2");
    let labelDiv = document.createElement("div");
    labelDiv.classList.add("d-flex", "flex-row", "mb-2");
    listItem.appendChild(listContainer);
    listContainer.appendChild(labelDiv);
    let labelname = document.createElement("label");
    labelname.setAttribute("for", checkBoxId);
    labelname.classList.add("label_containers");
    labelname.textContent = todos.text;
    // let labelText= document.createElement("div");
    let labelTime = document.createElement("div");
    let labelDate = document.createElement("div");
    // labelText.textContent=todos.text;
    labelTime.textContent = todos.time;
    labelDate.textContent = todos.date;
    labelTime.classList.add("ml-5");
    // labelname.appendChild(labelText);
    labelTime.classList.add("label_date_and_time", "d-none", "d-md-block");
    labelDate.classList.add("label_date_and_time", "d-none", "d-md-block");
    labelname.id = labelId;
    labelDiv.appendChild(labelname);
    labelDiv.appendChild(labelDate);
    labelDiv.appendChild(labelTime);

    // listItem.style.textDecoration= "line-through";
    inputItem.checked = todos.isCheked;
    if (todos.isCheked === true) {
        labelname.classList.add("checked");
    } else {
        labelname.classList.remove("checked");
    }
    inputItem.onclick = function() {
        checkTheCheckbox(checkBoxId, labelId, todoId);
        // labelname.style.textDecoration= "line-through";
    };
    let trashContainer = document.createElement("div");
    trashContainer.classList.add("deleted_trash");
    labelDiv.appendChild(trashContainer);
    let deletedIcon = document.createElement("i");
    deletedIcon.classList.add("fa-solid", "fa-trash-can", "trash_container");
    trashContainer.appendChild(deletedIcon);
    deletedIcon.onclick = function() {
        delete_todo(todoItemContainer, todoId);
    }
    let md_labelTime = document.createElement("div");
    let md_labelDate = document.createElement("div");
    md_labelTime.textContent = todos.time;
    md_labelDate.textContent = todos.date;
    md_labelTime.classList.add("label_date_and_time", "d-md-none", "pt-4");
    md_labelDate.classList.add("label_date_and_time", "d-md-none");
    listContainer.appendChild(md_labelDate);
    listContainer.appendChild(md_labelTime);
}

for (let todos of todoListItems) {
    createAndAppend(todos)
}
// checkTheCheckbox("checkbox"+2,"label"+2 )

// document.getElementById("label"+2).style.textDecoration="line-through";