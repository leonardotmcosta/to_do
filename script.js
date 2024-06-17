document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addTaskButton").addEventListener("click", addTask);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (task) {
    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    taskInput.value = "";
  }
}

function addTaskToDOM(task) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  li.className = "task";
  li.appendChild(document.createTextNode(task));

  const deleteButton = document.createElement("button");

  deleteButton.className = "delete-button";
  deleteButton.appendChild(document.createTextNode("Delete"));
  deleteButton.addEventListener("click", () => {
    removeTaskFromDOM(li);
    removeTaskFromLocalStorage(task);
  });

  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => addTaskToDOM(task));
}

function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromDOM(taskElement) {
  const taskList = document.getElementById("taskList");
  taskList.removeChild(taskElement);
}

function removeTaskFromLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}