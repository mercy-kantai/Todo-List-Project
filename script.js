const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const newTask = todoInput.value;
  if (newTask === '') {
      alert('Please enter a task!');
      return;
  }
  todoInput.value = '';
  addTask(newTask);
});
function addTask(task) {
  const listItem = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = task;
  listItem.appendChild(taskText);
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  listItem.appendChild(checkBox);
  const startButton = document.createElement('button');
  startButton.textContent= 'Start';
  listItem.appendChild(startButton);
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  listItem.appendChild(resetButton);
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  listItem.appendChild(editButton);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);
  checkBox.addEventListener('change', function() {
      if (this.checked) {
          taskText.style.textDecoration = 'line-through';
      } else {
          taskText.style.textDecoration = 'none';
      }
  });
  deleteButton.addEventListener('click', function() {
      todoList.removeChild(listItem);
      saveTasksToLocalStorage();
  });
  editButton.addEventListener('click', function() {
      const isEditing = listItem.classList.contains('editing');
      if (isEditing) {
          taskText.textContent = this.previousSibling.value;
          listItem.classList.remove('editing');
          editButton.textContent = 'Edit';
      } else {
          const input = document.createElement('input');
          input.type = 'text';
          input.value = taskText.textContent;
          listItem.insertBefore(input, taskText);
          listItem.removeChild(taskText);
          listItem.classList.add('editing');
          editButton.textContent = 'Save';
      }
  });
  saveTasksToLocalStorage();
}
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach(task => {
      const taskText = task.querySelector('span').textContent;
      const isCompleted = task.classList.contains('completed');
      tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
document.addEventListener('DOMContentLoaded', function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
      addTask(task.text);
  });
});
const initBtn = document.querySelector('button[textContent="Start"]');
const resetBtn = document.querySelector('button[textContent="Reset"]');
const timerOutput = document.querySelector('.stoper__time');
let now = JSON.parse(localStorage.getItem("time")) || 0;
let records = JSON.parse(localStorage.getItem("records")) || [];
let i = (JSON.parse(localStorage.getItem("i")) + 1) || 1;
let active = false;
let intervalId;
const initTimer = () => {
  if (!active) {
    active = !active;
    initBtn.textContent = 'PAUSE';
    intervalId = setInterval(startTimer, 1000);
  } else {
    active = !active;
    initBtn.textContent = 'START';
    clearInterval(intervalId);
  };
};
let newRecord = "";
const startTimer = () => {
  var time = now;
  var hours = Math.floor(time / 3600);
  time -= hours * 3600;
  var mins = Math.floor(time / 60);
  time -= mins * 60;
  var secs = time;
  // Update the display timer
  if (hours < 10) {
    hours = +hours;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }
  timerOutput.innerHTML = hours + "." + mins + "." + secs;
  newRecord = timerOutput.textContent;
  localStorage.setItem("time", JSON.stringify(now));
  now++;
};
function resetTimer(e) {
  now = 0;
  active = false;
  initBtn.textContent = 'START';
  timerOutput.textContent = '0.00.00';
  clearInterval(intervalId);
  localStorage.removeItem("time")
  localStorage.setItem("i", JSON.stringify(i));
  if (!newRecord) return;
  records = document.createElement('div');
  records.innerHTML = `<li> Measurement ${i} is equal to <strong>${newRecord}</strong></li>`;
  ul.appendChild(records);
  newRecord = "";
  i++;
  records.push(records.innerHTML);
  updateRecords(records, ul);
};
function updateRecords(records = [], ul) {
  ul.innerHTML = records.map((record) => {
    console.log(record);
    return record;
  }).join('');
  localStorage.setItem("records", JSON.stringify(records));
};
initBtn.addEventListener('click', initTimer);
resetBtn.addEventListener('click', resetTimer);
startTimer();