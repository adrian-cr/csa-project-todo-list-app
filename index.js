const main = document.querySelector("main");
const addButton = document.getElementById("add-button");
const addField = document.getElementById("task-title-field");
const errorMessage = document.getElementById("error-message");
const inProgressCounter = document.getElementById("in-progress-counter");
const completedCounter = document.getElementById("completed-counter");
const searchField = document.getElementById("search-field");
const searchButton = document.getElementById("search-icon");

function updateStats() {
  const tasks = main.querySelectorAll(".task-container");
  let inProgress = 0, completed = 0;
  tasks.forEach(task => {
    if (task.classList.contains("completed")) {
      completed++;
    } else {
      inProgress++;
    }
  });
  inProgressCounter.textContent = inProgress;
  completedCounter.textContent = completed;
}
function createTaskElement(title) {
  const container = document.createElement("div");
  container.className = "task-container";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "task-button delete-button";
  deleteBtn.setAttribute("alt", "delete");
  deleteBtn.textContent = "❌";

  const p = document.createElement("p");
  p.className = "task-title";
  p.textContent = title;

  const completeBtn = document.createElement("button");
  completeBtn.className = "task-button complete-button";
  completeBtn.setAttribute("alt", "complete");
  const img = document.createElement("img");
  img.src = "./images/check_icon.svg";
  completeBtn.appendChild(img);

  container.appendChild(deleteBtn);
  container.appendChild(p);
  container.appendChild(completeBtn);

  return container;
}
function addTask() {
  const title = addField.value.trim();
  if (!title) {
    errorMessage.style.display = "block";
    return;
  }
  errorMessage.style.display = "none";
  const task = createTaskElement(title);
  main.insertBefore(task, addField);
  addField.value = "";
  updateStats();
}
function handleTaskButton(e) {
  const target = e.target;
  if (target.closest(".delete-button")) {
    target.closest(".task-container").remove();
    updateStats();
  } else if (target.closest(".complete-button")) {
    const task = target.closest(".task-container");
    task.classList.toggle("completed");
    task.style.display = "none";
    updateStats();
  }
}
function filterTasks() {
  const filter = searchField.value.toLowerCase();
  const tasks = main.querySelectorAll(".task-container");
  tasks.forEach(task => {
    const title = task.querySelector(".task-title").textContent.toLowerCase();
    task.style.display = title.includes(filter) ? "" : "none";
  });
}

main.addEventListener("click", handleTaskButton)
addButton.addEventListener("click", addTask);
addField.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});
searchButton.addEventListener("click", filterTasks);

errorMessage.style.display = "none";
updateStats();
