const task_input = document.querySelector('input');
const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');
const alert_message = document.querySelector('.alert-message');
const delete_all_btn = document.querySelector('.delete-all-btn');
//local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

window.addEventListener('DOMContentLoaded', showAllTodos);

// visitor counter
const visiter_count=document.getElementById('count')

const api=fetch("https://api.countapi.xyz/hit/to-do-list.com/visits");
api.then((req)=>{
    return req.json();
}).then((res)=>{
    visiter_count.innerHTML=res.value;
})

//get random unique id
function getRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function addToDo(task_input) {
    let task = {
        id: getRandomId(),
        task: task_input.value,
        completed: false,
        diseble:'undisabled',
        check:'unchecked'
    }
    todos.push(task);
}

task_input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && task_input.value.length > 0) {
        addToDo(task_input);
        saveToLocalStorage();
        task_input.value = '';
        showAllTodos();
    }
});

add_btn.addEventListener('click', () => {
    if (task_input.value === '') {
        showAlertMessage('Please enter a task', 'error');
    } else {
        addToDo(task_input);
        saveToLocalStorage();
        showAllTodos();
        task_input.value = '';
        showAlertMessage('Task added successfully', 'info');
    }
});
delete_all_btn.addEventListener('click', clearAllTodos);
//show all todos
function showAllTodos() {
    todos_list.innerHTML = '';
    todos.forEach((todo) => {
        todos_list.innerHTML += `
            <li class="todo-item" data-id="${todo.id}">
            <label class="cursor-pointer label" >
            <input type="checkbox" ${todo.check} ${todo.diseble}  onclick="Check_Box('${todo.id}')" class="checkbox" />
            <p class="task-body m-2 " id="${todo.id}"> ${todo.task}</p>
             </label>
                <div class="todo-actions">
                    <button class="btn btn-info" onclick="editTodo('${todo.id}')">
                        <i class="bx bx-edit-alt bx-sm"></i>    
                    </button>
                    <button class="btn btn-error" onclick="deleteTodo('${todo.id}')">
                        <i class="bx bx-trash bx-sm"></i>
                    </button>
                </div>
            </li>
        `;
    });
}
// Check Box
function Check_Box(id){
    const todo = todos.find(todo => todo.id === id);
    if(todo.check!='checked'){
        showAlertMessage('Task Completed', 'success');
    }
    todo.diseble='disabled'
    todo.check='checked'
    document.getElementById(id).style.textDecoration="line-through"
    saveToLocalStorage();
}

//save todos to local storage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//show alert message
function showAlertMessage(message, type) {
    let alert_box = `
        <div class="alert alert-${type} shadow-lg mb-5 w-full">
            <div>
                <span>
                    ${message}
                </span>
            </div>
        </div>
    `
    alert_message.innerHTML = alert_box;
    alert_message.classList.remove('hide');
    alert_message.classList.add('show');
    setTimeout(() => {
        alert_message.classList.remove('show');
        alert_message.classList.add('hide');
    }, 3000);
}

//delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    showAlertMessage('Todo task deleted', 'error');
    showAllTodos();
}

//edit todo
function editTodo(id) {
    console.log(id);
    let todo = todos.find(todo => todo.id === id);
    task_input.value = todo.task;
    todos = todos.filter(todo => todo.id !== id);
    add_btn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
    saveToLocalStorage();
    add_btn.addEventListener('click', () => {
        add_btn.innerHTML = "<i class='bx bx-plus bx-sm'></i>"; 
        showAlertMessage('Task updated', 'info');
    });
}

//clear all todos
function clearAllTodos() {
    if(todos.length > 0) {
        todos = [];
        saveToLocalStorage();
        showAlertMessage('All Tasks cleared', 'error');
        showAllTodos();
    }else{
        showAlertMessage('No todos to clear', 'error');
    }
}
