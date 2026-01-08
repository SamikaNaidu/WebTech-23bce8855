// script.js

let taskIdCounter = 0;

// Add task on button click
document.getElementById("addTaskBtn").addEventListener("click", () => {
  const taskNameInput = document.getElementById("taskName");
  const name = taskNameInput.value.trim();
  if (!name) return;

  createTaskCard(name);
  taskNameInput.value = "";
});

// Create a new draggable task card
function createTaskCard(name) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.draggable = true;
  card.id = "task-" + taskIdCounter++;

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = name;

  const date = document.createElement("div");
  date.className = "task-date";
  const now = new Date();
  date.textContent =
    "Created: " + now.toLocaleDateString() + " " + now.toLocaleTimeString();

  card.appendChild(title);
  card.appendChild(date);

  addDragHandlers(card);

  // Default column is To Do
  document.getElementById("todo").appendChild(card);
}

// Attach drag events to a card
function addDragHandlers(card) {
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", card.id);
  });
}

// Setup drag events for columns
const columns = document.querySelectorAll(".column");

columns.forEach((col) => {
  col.addEventListener("dragover", (e) => {
    e.preventDefault(); // allow drop
    col.classList.add("drag-over");
  });

  col.addEventListener("dragleave", () => {
    col.classList.remove("drag-over");
  });

  col.addEventListener("drop", (e) => {
    e.preventDefault();
    col.classList.remove("drag-over");

    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);
    if (!card) return;

    col.appendChild(card);

    const status = col.dataset.status;
    const messageBox = document.getElementById("message");

    if (status === "Completed") {
      card.classList.add("completed");
      messageBox.textContent = "Task Completed Successfully";
    } else {
      card.classList.remove("completed");
      messageBox.textContent = "";
    }
  });
});
