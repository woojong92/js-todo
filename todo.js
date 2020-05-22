const   todoForm = document.querySelector(".todo-form"),
        todoInput = todoForm.querySelector("input"),
        todoList = document.querySelector('.todo-list')

const TODO_LS = "todos"
let todos = []

function paintTodo(text) {
    const li = document.createElement("li")
    const delBtn = document.createElement("button")
    const span = document.createElement("span")
    const newId = todos.length + 1

    delBtn.innerHTML= "X";
    delBtn.addEventListener("click", deleteTodo);
    
    span.innerText = text;
    
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);
    
    const todoObj = {
        text : text,
        id : newId
    };
    todos.push(todoObj);
    saveTodos();   
}

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = todos.filter( todo => todo.id !== parseInt(li.id))
    todos = cleanToDos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODO_LS, JSON.stringify(todos))
}

function loadTodos() {
    const loadedToDos = localStorage.getItem(TODO_LS)
    if( loadedToDos !== null ) {
        const parsedToDos = JSON.parse(loadedToDos)
        parsedToDos.forEach(function(todo) {
             paintTodo(todo.text);
        });
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value="";
}

function init() {
    loadTodos()
    todoForm.addEventListener("submit", handleSubmit)
}

init()
