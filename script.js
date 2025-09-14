let todos = []
let todoIdCounter = 1

function addTodo() {
  const input = document.getElementById("todoInput")
  const text = input.value.trim()

  if (text === "") {
    alert("Please enter a task!")
    return
  }

  const todo = {
    id: todoIdCounter++,
    text: text,
    completed: false,
  }

  todos.push(todo)
  input.value = ""
  renderTodos()
  updateStats()
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    renderTodos()
    updateStats()
  }
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id)
  renderTodos()
  updateStats()
}

function renderTodos() {
  const todoList = document.getElementById("todoList")
  const emptyState = document.getElementById("emptyState")

  if (todos.length === 0) {
    todoList.innerHTML = '<div class="empty-state">No tasks yet. Add one above to get started! 🚀</div>'
    return
  }

  const todosHTML = todos
    .map(
      (todo) => `
        <li class="todo-item ${todo.completed ? "completed" : ""}">
            <input type="checkbox" class="todo-checkbox" 
                   ${todo.completed ? "checked" : ""} 
                   onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        </li>
    `,
    )
    .join("")

  todoList.innerHTML = todosHTML
}

function updateStats() {
  const total = todos.length
  const completed = todos.filter((t) => t.completed).length
  const pending = total - completed

  document.getElementById("totalTasks").textContent = total
  document.getElementById("completedTasks").textContent = completed
  document.getElementById("pendingTasks").textContent = pending
}

// Allow adding todos with Enter key
document.getElementById("todoInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo()
  }
})

// Initialize stats
updateStats()
