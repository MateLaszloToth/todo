export default function Task(title, description, isCompleted, id) {

    const getTitle = () => title;
    const getDescription = () => description;
    const getIsCompleted = () => isCompleted;
    const getId = () => id

    const toggleTaskCompletion = () => isCompleted = !isCompleted;

    return {
        getTitle,
        getDescription,
        getIsCompleted,
        getId,
        toggleTaskCompletion
    }
}