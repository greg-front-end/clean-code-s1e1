const taskInput = document.querySelector("#todo__new-task");
const addButton = document.querySelector("#todo__btn-add-task");
const incompleteTaskHolder = document.querySelector("#todo__incomplete-tasks");
const completedTasksHolder = document.querySelector("#todo__completed-tasks");

const createNewTaskElement = function (taskString) {

  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  listItem.className = "todo__list-item";

  label.innerText = taskString;
  label.className = 'todo__task-name';

  checkBox.type = "checkbox";
  checkBox.className = "todo__checkbox";
  editInput.type = "text";
  editInput.className = "todo__task-input";

  editButton.innerText = "Edit";
  editButton.className = "todo__btn-edit btn";

  deleteButton.className = "todo__btn-delete btn";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'todo__btn-delete-img';
  deleteButtonImg.alt = "remove";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function () {
  console.log("Add Task...");

  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

const editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.todo__task-input');
  const label = listItem.querySelector(".todo__task-name");
  const editBtn = listItem.querySelector(".todo__btn-edit");
  const containsClass = listItem.classList.contains("todo__list-item--edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("todo__list-item--edit-mode");
};

const deleteTask = function () {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);

}

const taskCompleted = function () {
  console.log("Complete Task...");

  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

const taskIncomplete = function () {
  console.log("Incomplete Task...");

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function () {
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  const checkBox = taskListItem.querySelector(".todo__checkbox");
  const editButton = taskListItem.querySelector(".todo__btn-edit");
  const deleteButton = taskListItem.querySelector(".todo__btn-delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}