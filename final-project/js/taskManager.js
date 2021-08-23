//creating a class to manage the tasks, adding a method to the class to keep track of tasks in our application, and connecting up the New Task form to create tasks.

const createTaskHtml = (name, description, assignedTo, dueDate, status, id) => {
  const html = `<tr data-task-id="${id}">
  <td><button class="done-button">X</button></td>
    <td>${name}</td>
    <td id="first" class="assigned">${assignedTo}</td>
    <td>${dueDate}</td>
    <td class="status ${
      status === 'TODO'
        ? 'bg-danger'
        : status === 'IN PROGRESS'
        ? 'bg-warning'
        : status === 'REVIEW'
        ? 'bg-success'
        : 'bg-info'
    }">${status}</td>
    <td>
      <button class="btn btn-link" aria-expanded="false" aria-controls="seedSpecial" data-target="#seedSpecial"
        data-toggle="collapse">
        Description...
      </button>
      <p class="collapse" id="seedSpecial">
        ${description}
      </p>
    </td>
  </tr>`;

  return html;
};

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }
  addTask = (name, assignedTo, dueDate, status = 'TODO', description) => {
    this.currentId = this.currentId + 1;
    let task = {
      currentId: this.currentId,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    this.tasks.push(task);
  };

  getTaskById = (taskId) => {
    let foundTask;
    for (let i = 0; i < this.tasks.length; i++) {
      if (taskId == this.tasks[i].currentId) {
        foundTask = this.tasks[i];
        return foundTask;
      }
    }
  };

  render = () => {
    let taskHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const date = new Date(task.dueDate);
      const formattedDate = `${date.getMonth()}/${
        date.getDate() + 1
      }/${date.getFullYear()}`;
      const taskHtml = createTaskHtml(
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status,
        task.currentId
      );
      taskHtmlList.push(taskHtml);
    }
    const tasksHtml = taskHtmlList.join('\n');
    const tasksList = document.querySelector('#table-body');
    tasksList.innerHTML = tasksHtml;
  };
}

export { TaskManager, createTaskHtml };
