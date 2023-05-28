import TodoController from "./todo-controller.js";

export default (() => {
  const mainContainer = document.querySelector("main");
  const projectDialog = document.querySelector("#project-dialog");
  const taskDialog = document.querySelector("#task-dialog");
  const DATA_PROJECT_ID = "data-project-id";
  const DATA_TASK_ID = "data-task-id";

  const displayProjects = (projects) => {
    mainContainer.replaceChildren([]);
    for (const project of projects) {
      const projectCard = document.createElement("div");
      projectCard.classList.add("project", `${project.getPriority()}`);
      projectCard.id = project.getId();
      projectCard.innerHTML = `
            <img class="icon" src="${project.getIconUrl()}" alt="random image"/>
            <div class="card-info">
              <h2 class="card-title">${project.getTitle()}</h2>
              <p class="description">${project.getDescription()}</p>
              <span class="due-date">Due date: ${project.getDueDate()}</span>
            </div>
            `;

      const deleteProjectButton = document.createElement("button");
      deleteProjectButton.textContent = "X";
      deleteProjectButton.classList.add("delete-project");
      deleteProjectButton.addEventListener("click", (e) =>
        deleteProject(e, project.getId())
      );
      projectCard.append(deleteProjectButton);

      projectCard.addEventListener("click", openProjectDetails);
      mainContainer.append(projectCard);
    }
  };

  const createProjectWrapper = (project) => {
    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");

    const tasks = project.getTasks();
    for (const task of tasks) {
      const taskElement = document.createElement("li");
      taskElement.classList.add("task");

      const taskContent = document.createElement("div");
      taskContent.setAttribute(DATA_TASK_ID, task.getId());
      taskContent.classList.add("task-content");
      taskContent.innerHTML = `
        <h3>${task.getTitle()}</h3>
        <p>${task.getDescription()}</p>
      `;
      if (task.getIsCompleted()) {
        taskContent.classList.add("completed");
      }
      taskContent.addEventListener("click", (e) =>
        toggleTaskIsCompleted(project.getId(), e)
      );

      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.classList.add("delete-task");
      deleteTaskButton.textContent = "X";
      deleteTaskButton.addEventListener("click", () =>
        deleteTask(project.getId(), task.getId())
      );

      taskElement.append(taskContent, deleteTaskButton);

      taskList.append(taskElement);
    }

    const projectWrapper = document.createElement("div");
    projectWrapper.setAttribute(DATA_PROJECT_ID, project.getId());
    projectWrapper.classList.add("project-tasks");

    const pageTitle = document.createElement("h2");
    pageTitle.textContent = project.getTitle();

    const buttons = document.createElement("div");
    buttons.classList.add("task-buttons");
    buttons.append(getGoBackButton(), getNewTaskButton());

    projectWrapper.append(pageTitle, taskList, buttons);

    return projectWrapper;
  };

  const openProjectDetails = (event) => {
    const projectId = event.currentTarget.id;
    const project = TodoController.getProjectWithId(projectId);
    mainContainer.replaceChildren(createProjectWrapper(project));
  };

  const displayProjectDetails = (tasks, projectId) => {
    const project = TodoController.getProjectWithId(projectId);
    mainContainer.replaceChildren(createProjectWrapper(project));
  };

  const renderProjectDialog = () => {
    projectDialog.showModal();
  };

  const closeProjectDialog = () => {
    projectDialog.close();
  };

  const deleteProject = (event, projectId) => {
    event.stopPropagation();
    TodoController.deleteProject(projectId);
    displayProjects(TodoController.getProjects());
  };

  const getNewTaskButton = () => {
    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.addEventListener("click", renderTaskDialog);
    return addButton;
  };

  const deleteTask = (projectId, taskId) => {
    TodoController.deleteTask(projectId, taskId);
    const tasks = TodoController.getProjectWithId(projectId).getTasks();
    displayProjectDetails(tasks, projectId);
  };

  const getGoBackButton = () => {
    const backButton = document.createElement("button");
    backButton.textContent = "Go Back";
    backButton.addEventListener("click", goToProjects);
    return backButton;
  };

  const goToProjects = (event) => {
    event.preventDefault();
    taskDialog.close();
    displayProjects(TodoController.getProjects());
  };

  const renderTaskDialog = (event) => {
    event.preventDefault();
    taskDialog.showModal();
  };

  const closeTaskDialog = (event) => {
    event.preventDefault();
    taskDialog.close();
  };

  const saveNewProject = (event) => {
    event.preventDefault();
    const projects = TodoController.saveProject();
    displayProjects(projects);
    projectDialog.close();
  };

  const saveNewTask = (event) => {
    event.preventDefault();
    const projectWrapper = document.querySelector(`div[${DATA_PROJECT_ID}]`);
    const projectId = projectWrapper.getAttribute(DATA_PROJECT_ID);
    const tasks = TodoController.saveTask(
      TodoController.getProjectWithId(projectId)
    );
    displayProjectDetails(tasks, projectId);
    taskDialog.close();
  };

  const toggleTaskIsCompleted = (projectId, event) => {
    const taskElement = event.currentTarget;
    taskElement.classList.toggle("completed");
    const taskId = taskElement.getAttribute(DATA_TASK_ID);
    TodoController.toggleTaskCompletion(projectId, taskId);
  };

  const assignEventListeners = () => {
    const newProjectButton = document.querySelector("button#new-button");
    newProjectButton.addEventListener("click", renderProjectDialog);

    const projectDialogCancelButton = document.querySelector(
      "button#project-dialog-cancel"
    );
    projectDialogCancelButton.addEventListener("click", closeProjectDialog);

    const projectDialogSaveButton = document.querySelector(
      "button#project-dialog-save"
    );
    projectDialogSaveButton.addEventListener("click", saveNewProject);

    const taskDialogCancelButton = document.querySelector(
      "button#task-dialog-cancel"
    );
    taskDialogCancelButton.addEventListener("click", closeTaskDialog);

    const taskDialogSaveButton = document.querySelector(
      "button#task-dialog-save"
    );
    taskDialogSaveButton.addEventListener("click", saveNewTask);
  };

  return {
    assignEventListeners,
    displayProjects,
  };
})();
