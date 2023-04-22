let todos = [];
const TODO_KEY = 'TODO_KEY';


const todosContainer = document.getElementById('days');
const nextTodo = document.querySelector('.todo__day')


function loadData() {
  const todosString = localStorage.getItem(TODO_KEY);
  const todoArray = JSON.parse(todosString);
  if (Array.isArray(todoArray)) {
    todos = todoArray;
  }
}

function saveData() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function rerender() {
  todosContainer.innerHTML = '';
  for (const index in todos) {
    const element = document.createElement('div');
    element.classList.add('todo');
    element.id = index
    if (todos[index][1] === "todo") {
      element.innerHTML = `<div class="todo__day">Дело ${Number(index) + 1}</div>
                <div class="todo__comment">${todos[index][0]}</div>
                <div class="todo__checkbox"><input type="checkbox", name="completeTodo", onclick="completeTodo(${index})"></input></div>
                <button class="todo__delete" onclick="deleteTodo(${index})">
                  <img src="./images/delete.svg" alt="Удалить дело ${index + 1}" />
                </button>`;
    } else if (todos[index][1] === "completed") {
      element.innerHTML = `<div class="todo__day">Дело ${Number(index) + 1}</div>
                <div class="todo__comment">${todos[index][0]}</div>
                <div class="todo__checkbox"><input type="checkbox", name="completeTodo", onclick="completeTodo(${index})", checked></input></div>
                <button class="todo__delete" onclick="deleteTodo(${index})">
                  <img src="./images/delete.svg" alt="Удалить дело ${index + 1}" />
                </button>`;
      element.classList.add("finished__todo")
    }
    todosContainer.appendChild(element);
  }
  nextTodo.innerHTML = `Дело ${todos.length + 1}`;
}


/* work with todos */
function addTodo(event) {
  event.preventDefault();
  
  const data = event.target['comment'].value
  if (!data) {
    return;
  }

  let dataArray = [data, 'todo'];
  
  todos.push(dataArray)
  event.target['comment'].value = '';
  
  rerender();
  saveData();
}

function completeTodo(index) {
  element = document.getElementById(index)
  element.classList.toggle("finished__todo");

  if (todos[index][1] === "todo"){
    todos[index][1] = "completed"
  } else {
    todos[index][1] = "todo"
  }

  saveData();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  rerender();
  saveData();
}


/* init */
(() => {
  loadData();
  rerender();
})();