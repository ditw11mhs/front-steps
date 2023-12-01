const task_input = document.querySelector(".task-input");
const task_container = document.querySelector(".task-list-container");

var task_counter = 0;
var db = new Map();

function btnToFunc(btn_class, func) {
  var btn_list = document.querySelectorAll(`.${btn_class}`);
  btn_list.forEach((btn) => {
    btn.addEventListener("click", func);
  });
}

function deleteTask(event) {
  var btn_id = event.srcElement.id;
  var task_id = btn_id.replace("del-", "");

  db.delete(task_id);
  updateTask();
}

function doneTask(event) {
  var btn_id = event.srcElement.parentElement.id;
  var task_id = btn_id.replace("done-", "");

  var data = db.get(task_id);
  data.done = true;
  db.set(task_id, data);

  updateTask();
}

function undoneTask(event) {
  var btn_id = event.srcElement.parentElement.id;
  var task_id = btn_id.replace("done-", "");

  var data = db.get(task_id);
  data.done = false;
  db.set(task_id, data);

  updateTask();
}

function updateTask() {
  task_container.innerHTML = "";

  if (db.size != 0) {
    for (let [key, value] of db) {
      if (value.done) {
        task_container.innerHTML += `<div id="${key}" class="task-item-block">
        <button id="done-${key}" class="btn btn-done-inactive" type="button">Undo</button>
        <p class="task-item-inactive">${value.task}</p>
        <button id="del-${key}" class="btn btn-delete" type="button">Delete</button>
      </div>
`;
      } else {
        task_container.innerHTML += `<div id="${key}" class="task-item-block">
        <button id="done-${key}" class="btn btn-done" type="button">Done</button>
        <p class="task-item">${value.task}</p>
        <button id="del-${key}" class="btn btn-delete" type="button">Delete</button>
      </div>
`;
      }
    }
  }

  btnToFunc("btn-done", doneTask);
  btnToFunc("btn-done-inactive", undoneTask);
  btnToFunc("btn-delete", deleteTask);
}

function getInput(event) {
  task_counter++;

  db.set(`item-${task_counter}`, { task: event.target.value, done: false });
  updateTask();

  task_input.value = "";
}

updateTask();
task_input.addEventListener("change", getInput);
