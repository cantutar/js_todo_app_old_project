const form = document.getElementById("todo-form");
// const todoList = document.getElementsByClassName("list-group")[0];
const todoList = document.querySelector(".list-group");
const todoInput = document.getElementById("todo");
const filterInput = document.getElementById("filter");
const firstCardBody = document.getElementsByClassName("card-body")[0];
const secondCardBody = document.getElementsByClassName("card-body")[1];
const clearButton = document.querySelector("#clear-todos");

// eventListeners();

document.addEventListener("DOMContentLoaded", eventListeners);
function eventListeners() {
    form.addEventListener('submit', addTodo);
    loadAllTodosToUI();
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display:none !important");
        } else {
            listItem.setAttribute("style", "display:block !important");
        }
    });
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        // console.log(" silme işlemi");
        e.target.parentElement.parentElement.remove();
        console.log(deleteTodoFromStorage(e.target.parentElement.parentElement.textContent));
        showAlert("success", "Todo deleted successfuly...");
    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();
    // console.log(todos);
    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });

}
function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger", "Please enter a todo...");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "You added successfully a todo...")
    }


    e.preventDefault();
}

function getTodosFromStorage() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

function addTodoToStorage(newTodo) {
    // console.log("buraya girdi.");
    if (newTodo === null) return;
    let todos = getTodosFromStorage();
    // console.log("buraya girdi2.");
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `mt-3 alert alert-${type}`;
    alert.textContent = message;
    setTimeout(function () {
        alert.remove();
    }, 3000);
    firstCardBody.appendChild(alert);
}

function addTodoToUI(newTodo) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    const icon = document.createElement("i");
    icon.className = "fa fa-remove";
    link.append(icon);
    listItem.className = "list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "";
}