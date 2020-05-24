const   todoForm = document.querySelector(".todo-form"),
        todoInput = todoForm.querySelector("input"),
        todoList = document.querySelector('.todo-list')

const TODO_LS = "todos"
let todos = []

function paintTodo(text, toggled) {
    const li = document.createElement("li")
    const toggleBtn = document.createElement("div")
    const delBtn = document.createElement("div")
    const span = document.createElement("span")
    const newId = todos.length + 1

    toggleBtn.classList.add("toggle-btn")
    toggleBtn.addEventListener("click", toggleTodo)

    delBtn.classList.add("del-btn")
    delBtn.innerHTML= "X";
    delBtn.addEventListener("click", deleteTodo);
    
    span.innerText = text;
    if( toggled ) {
        toggleBtn.classList.add("toggled")
        span.classList.add("toggled")
    }
    
    li.appendChild(toggleBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);
    
    const todoObj = {
        text : text,
        id : newId,
        toggled: false,
    };
    todos.push(todoObj);
    saveTodos();   
}

function toggleTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span")
    
    if( btn.classList.contains("toggled") ) {
        btn.classList.remove("toggled")
        span.classList.remove("toggled")
    }else {
        btn.classList.add("toggled")
        span.classList.add("toggled")
    }

    const changedToDos = todos.map( todo => todo.id !== parseInt(li.id) ? { ...todo} : { ...todo, toggled: !todo.toggled})
    todos = changedToDos;
    saveTodos()
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
             paintTodo(todo.text, todo.toggled);
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
