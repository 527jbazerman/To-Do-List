// task storage
let tasks = [];

// add task
function addTask() {
  let input = document.getElementById("taskInput").value;
  let category = document.getElementById("categorySelect").value;

  if (input) {
    tasks.push({
      text: input,
      category: category,
    });

    document.getElementById("taskInput").value = "";

    displayTasks();
  }
}

// display tasks
function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let search = document.getElementById("searchInput").value.toLowerCase();
  let filter = document.getElementById("categoryFilter").value;

  tasks.forEach(function (task, i) {
    let taskTextLower = task.text.toLowerCase();
    let matchSearch = taskTextLower.indexOf(search) !== -1;
    let matchCategory = filter === "All" || task.category === filter;

    if (matchSearch && matchCategory) {
      let li = document.createElement("li");

      let categoryClass = task.category.toLowerCase();
      li.className = "list-group-item " + categoryClass;
      li.setAttribute("data-category", task.category);

      let label = document.createElement("span");
      let tag = document.createElement("span");
      tag.className = "tag";
      tag.setAttribute("data-category", task.category);
      tag.textContent = task.category;

      // attach the category tag element to the label
      label.appendChild(tag);
      // attach the task text after the tag
      label.appendChild(document.createTextNode(task.text));

      let removeButton = document.createElement("button");
      removeButton.className = "btn btn-success btn-sm";
      removeButton.textContent = "✔";
      removeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        removeTask(i);
      });

      // attach the label to the list item
      li.appendChild(label);
      // attach the remove button to the list item
      li.appendChild(removeButton);

      li.addEventListener("click", function () {
        this.classList.toggle("completed");
      });

      // attach the completed list item to the task list
      list.appendChild(li);
    }
  });

  updateCounter();
}

// remove task
function removeTask(index) {
  tasks.splice(index, 1);

  displayTasks();
}

// clear all tasks
function clearAllTasks() {
  tasks = [];

  displayTasks();
}

// event listeners
let clearButton = document.getElementById("clearTaskBtn");
let searchInput = document.getElementById("searchInput");
let categoryFilter = document.getElementById("categoryFilter");
let addButton = document.getElementById("addTaskBtn");
let taskInput = document.getElementById("taskInput");

clearButton.addEventListener("click", clearAllTasks);
searchInput.addEventListener("input", displayTasks);
categoryFilter.addEventListener("change", displayTasks);
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// update counter
function updateCounter() {
  let counter = document.getElementById("taskCounter");
  counter.textContent = tasks.length + " tasks";
}

taskInput.focus();
