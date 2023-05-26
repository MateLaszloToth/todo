import Project from "../models/project.js";
import Task from "../models/task.js";

export default (() => {
    let projects = [
        Project('https://d1yhils6iwh5l5.cloudfront.net/charts/resized/63221/normal/z_hedgeye_goos.png',
            'Save the birds',
            'Create an animal shelter where birds can be treated till they are ready to go back to the wild.',
            `1`,
            '2023-07-05',
            '1'
        ),
        Project('https://thumbnails.cbc.ca/maven_legacy/thumbnails/488/667/national1_2500kbps_852x480_1006631491920.jpg?crop=1.777xh:h;*,*&downsize=560px:*',
            'Kayak championship',
            'Follow the daily workout plan and diet.',
            `2`,
            '2023-08-11',
            '2'
        )]
    const saveProject = () => {
        const formElement = document.querySelector('form#project');

        const title = formElement.querySelector('#dialog-project-title').value;
        const description = formElement.querySelector('#dialog-project-description').value;
        const iconUrl = formElement.querySelector('#dialog-project-icon-url').value;
        const priority = formElement.querySelector('dialog input[type="radio"][name="priority"]:checked').value;
        const dueDate = formElement.querySelector('dialog input[type="date"]').value;
        const projectId = Math.random().toString()

        if (title && description && priority && iconUrl) {
            projects.push(Project(iconUrl, title, description, priority, dueDate, projectId));
        } else {
            console.log("All fields must be provided");
        }
        return projects;
    }

    const deleteProject= projectId => {
        projects = projects.filter(project => project.getId() !== projectId);
    }

    const getProjectWithId = (id) => projects.find(project => project.getId() === id)

    const getProjects = () => [...projects]

    const saveTask = (project) => {
        const formElement = document.querySelector('form#task');

        const title = formElement.querySelector('#dialog-task-title').value;
        const description = formElement.querySelector('#dialog-task-description').value;
        const taskId = Math.random().toString();

        if (title && description) {
            project.addTask(Task(title, description, false, taskId));
        } else {
            console.log("All fields must be provided");
        }
        return project.getTasks();
    }

    const deleteTask = (projectId, taskId) => {
        projects.find(project => project.getId() === projectId).deleteTask(taskId);
    }

    const toggleTaskCompletion = (projectId, taskId) => {
        projects.find(project => project.getId() === projectId).toggleTaskCompletion(taskId);
    }

        return {saveProject, getProjectWithId, saveTask, getProjects, deleteTask, deleteProject, toggleTaskCompletion};
})();