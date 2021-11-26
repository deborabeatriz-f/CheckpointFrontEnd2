const todoList = document.querySelector('.todo-list');

async function getTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
  return response.json();
}

async function renderTodos() {
  const todos = await getTodos();

  todoList.innerHTML = todos
    .map(
      (todo) => `
        <li>
          <div class="todo">
            <p class="todo-id">
              <strong>Id</strong>: ${todo.id}
            </p>
            <p class="todo-title">
              <span class="${todo.completed ? 'completed' : 'uncompleted'}">
                ${todo.title}
              </span>
            </p>
          </div>
        </li>
      `
    )
    .join('');
}

document.addEventListener('DOMContentLoaded', renderTodos);
