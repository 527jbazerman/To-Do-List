// task storage
// We keep two simple lists: one for the task text and one for the category.
let tasks = [];
let categories = [];

// add task
function addTask() {
  let input = document.getElementById("taskInput").value;
  let category = document.getElementById("categorySelect").value;

  // only add if the user typed something
  if (input) {
    tasks.push(input);
    categories.push(category);

    // clear the input field after adding
    document.getElementById("taskInput").value = "";

    displayTasks();
  }
}

// display tasks
function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = ""; // start with an empty list

  let search = document.getElementById("searchInput").value.toLowerCase();
  let filter = document.getElementById("categoryFilter").value;

  // loop through each saved task by index
  for (let i = 0; i < tasks.length; i++) {
    let taskText = tasks[i];
    let taskCategory = categories[i];

    let taskTextLower = taskText.toLowerCase();
    let matchSearch = taskTextLower.indexOf(search) !== -1;
    let matchCategory = filter === "All" || taskCategory === filter;

    // only show tasks that match the search and category filter
    if (matchSearch && matchCategory) {
      let li = document.createElement("li");

      let categoryClass = taskCategory.toLowerCase();
      li.className = "list-group-item " + categoryClass;

      let label = document.createElement("span");
      let tag = document.createElement("span");
      tag.className = "tag " + categoryClass;
      tag.textContent = taskCategory;

      // each subject category gets a different color style in the CSS
      // the tag gets a class like "tag school", "tag work", or "tag personal"
      // the list item also gets a class like "list-group-item school"
      // so we can style the left color bar and tag based on subject
      label.appendChild(tag);
      label.appendChild(document.createTextNode(taskText));

      let removeButton = document.createElement("button");
      removeButton.className = "btn btn-success btn-sm";
      removeButton.textContent = "✔";

      removeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        removeTask(i);
      });

      // add task label and delete button to the item
      li.appendChild(label);
      li.appendChild(removeButton);

      // mark task as completed when you click the whole item
      // this adds or removes the "completed" class
      // the CSS for .completed makes the task look blurred/faded
      li.addEventListener("click", function () {
        li.classList.toggle("completed");
      });

      list.appendChild(li);
    }
  }

  updateCounter();
}

// remove task
function removeTask(index) {
  // remove matching task text and category by index
  tasks.splice(index, 1);
  categories.splice(index, 1);

  displayTasks();
}

// clear all tasks
function clearAllTasks() {
  tasks = [];
  categories = [];

  displayTasks();
}

// event listeners
let clearButton = document.getElementById("clearTaskBtn");
let searchInput = document.getElementById("searchInput");
let categoryFilter = document.getElementById("categoryFilter");
let addButton = document.getElementById("addTaskBtn");
let taskInput = document.getElementById("taskInput");

clearButton.addEventListener("click", clearAllTasks); // clear all tasks button
searchInput.addEventListener("input", displayTasks); // filter tasks while typing
categoryFilter.addEventListener("change", displayTasks); // filter by category
addButton.addEventListener("click", addTask); // add task button

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask(); // let Enter add the task too
  }
});

// update counter
function updateCounter() {
  let counter = document.getElementById("taskCounter");
  counter.textContent = tasks.length + " tasks";
}

taskInput.focus(); // put the cursor in the task box when the page loads
