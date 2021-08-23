import { TaskManager, createTaskHtml } from './taskManager.js';

let table = new TaskManager();
let addTaskForm = document.getElementById('add-task-form');
let showFormButton = document.getElementById('show-form');
let navBarToggleButton = document.getElementById('navbar-toggler');
let navBar = document.getElementById('navbar');
let submitButton = document.getElementById('submit-button');
let tablesContainer = document.getElementById('tables-container');
let tableBody = document.querySelector('#table-body');
let tasksList = document.querySelector('#tasks-list');

//Changes form display from none to block
showFormButton.addEventListener('click', () => {
  addTaskForm.style.display = 'block';
  tablesContainer.style.filter = 'blur(4px)';
});

//Toggles Navbar to be visible by changing right position
navBarToggleButton.addEventListener('click', () => {
  if (navBar.style.left === '-225px') {
    navBarToggleButton.className = 'fas fa-times';
    navBar.style.left = '0';
  } else {
    navBar.style.left = '-225px';
    navBarToggleButton.className = 'fas fa-bars';
  }
});

//Once form is submitted, retrieve input values to process new task
submitButton.addEventListener('click', () => {
  //Store input values in their own variables
  let nameInput = document.querySelector('#inputName');
  let assignedInput = document.querySelector('#inputAssignedTo');
  let dueDateInput = document.querySelector('#inputDueDate');
  let statusInput = document.querySelector('#inputStatus');
  let descriptionInput = document.querySelector('#inputDescription');
  let alert = document.querySelector('#alert');

  let taskHtml = createTaskHtml(
    nameInput.value,
    assignedInput.value,
    dueDateInput.value,
    statusInput.value,
    descriptionInput.value
  );

  //If form is empty, alert user
  if (
    nameInput.value === '' ||
    assignedInput.value === '' ||
    dueDateInput.value === '' ||
    statusInput.value === '' ||
    descriptionInput.value === ''
  ) {
    alert.style.display = 'block';
    //Remove alert after one second
    setTimeout(() => {
      alert.style.display = 'none';
    }, 1000);
  }
  //if form has values call the addTask method and render method to see new task
  else {
    table.addTask(
      nameInput.value,
      assignedInput.value,
      dueDateInput.value,
      statusInput.value,
      descriptionInput.value
    );
    table.render();
    nameInput.value = '';
    assignedInput.value = '';
    dueDateInput.value = '';
    statusInput.value = '';
    descriptionInput.value = '';

    //Hide form and remove blur effect from table
    addTaskForm.style.display = 'none';
    tablesContainer.style.filter = 'initial';
  }
});

//Listen for a click on tasks-list
tasksList.addEventListener('click', (event) => {
  if (event.target.className === 'done-button') {
    let taskId = event.target.parentElement.parentElement.dataset.taskId;
    let task = table.getTaskById(taskId);
    task.status = 'DONE';
    table.render();
  }
});
console.log(table.tasks);
