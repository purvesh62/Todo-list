// Selectors
const todoInput = document.querySelector(".todo-input"); //input
const todoButton = document.querySelector(".todo-button"); //button
const todoList = document.querySelector(".todo-list"); //ul 
const filterOption = document.querySelector(".filter-todo");

// Event Listners

// If everything is loaded then call the function getTodos
document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
    // Prevent from submitting !important
    event.preventDefault();
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Add Todo to localStorage
    saveLocalTodos(todoInput.value);
    // Checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);
    // Clear todoInput value
    todoInput.value = ""
}

// todo-> ul click
function deleteCheck(event) {
    const item = event.target;

    // to find trash button
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        // transitionend waits for transition to get over
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })

    }

    // check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(event) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function checkTodo() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        // Create one
        todos = [];
    } else {
        // Already have? Fetch the todo from localStorage
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

// Saving todos to LocalStorage
function saveLocalTodos(todo) {
    todos = checkTodo();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    todos = checkTodo();
    todos.forEach(function (todo) {
        // Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Checkmark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Append to list
        todoList.appendChild(todoDiv);
        // Clear todoInput value
        todoInput.value = ""

    })
}

function removeLocalTodos(todo) {
    todos = checkTodo();
    const todoIndex = todo.children[0].innerHTML;
    // Deleting the todo element using splice()
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}