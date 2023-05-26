import Task from "./task.js";

export default function Project(iconUrl, title, description, priority, dueDate, id) {

    let tasks = [
        Task('Get ready', 'Review your tasks for the day', true, '1'),
        Task('Emails', 'Read and reply for your emails', false, '2'),
        Task('Workout', 'Swim 2km in open water', true, '3'),
        Task('Prepare for presentation', 'Read through your slides and organize your thoughts', false, '4'),
    ]

    const getIconUrl = () => iconUrl
    const getTitle = () => title
    const getDescription = () => description
    const getDueDate = () => dueDate
    const getPriority = () => {
        if (priority === "1") {
            return "high-priority"
        } else if (priority === "2") {
            return "medium-priority"
        } else {
            return "low-priority"
        }
    }
    const getId = () => id

    const addTask = (newTask) => tasks.push(newTask);

    const deleteTask = (taskId) => {
        tasks = tasks.filter(task => task.getId() !== taskId);
    }

    const toggleTaskCompletion = taskId => {
        tasks.find(task => task.getId() === taskId).toggleTaskCompletion(taskId);
    }

    const getTasks = () => {
        return [...tasks];
    }

    return {
        getId,
        getDueDate,
        addTask,
        deleteTask,
        getTasks,
        getIconUrl,
        getPriority,
        getDescription,
        getTitle,
        toggleTaskCompletion
    }
}