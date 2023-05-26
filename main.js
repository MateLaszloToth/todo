import './style.scss'
import DisplayController from './controllers/display-controller.js'
import TodoController from "./controllers/todo-controller.js";


document.querySelector('#app');
DisplayController.assignEventListeners();
DisplayController.displayProjects(TodoController.getProjects());
