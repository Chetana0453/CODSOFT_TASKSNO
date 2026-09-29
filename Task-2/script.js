const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCounts = document.querySelector("#task-counts");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");
const tasks = JSON.parse(localStorage.getItem("todo-tasks")) || [];

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  showTasks();
});

function showTasks() {
  localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const matchesSearch = task.text.toLowerCase().includes(searchInput.value.trim().toLowerCase());
    const matchesFilter =
     filterSelect.value === "all" ||
    (filterSelect.value === "completed" && task.completed) ||
    (filterSelect.value === "pending" && !task.completed);

if (!matchesSearch || !matchesFilter) return;
    const item = document.createElement("li");
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark  ${task.text} as completed`);
    
    checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
        showTasks();
  });
     const text = document.createElement("span");
    text.textContent = task.text;

    if (task.completed) {
      text.style.textDecoration = "line-through";
    }
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.setAttribute("aria-label", `Edit ${task.text}`);

    editButton.addEventListener("click", function () {
    const answer = prompt("Edit your task:", task.text);

      if (answer === null) return; 
      const newText = answer.trim();

      if (newText === "") {
      alert("Task cannot be empty.");
      return;
     }
    tasks[index].text = newText;
    showTasks();
});

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
    deleteButton.addEventListener("click", function () {
    tasks.splice(index, 1);
    showTasks();
    });

   item.append(checkbox, text, editButton, deleteButton);
   taskList.appendChild(item);
   });

  const completed = tasks.filter(function (task) {
    return task.completed;
  }).length;

  taskCounts.textContent =
    `Completed: ${completed} | Pending: ${tasks.length - completed}`;}
    
    searchInput.addEventListener("input", showTasks);
    filterSelect.addEventListener("change", showTasks);
    showTasks();

