import { useAppContext } from "../../context/useAppContext";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import "./Tasks.css";
import { getTasksForRole } from "../../utils/helpers";
function Tasks() {
    const {tasks,addTask,currentUser} = useAppContext();
    const availableTasks = getTasksForRole(tasks, currentUser);
    function handleCreateTask(values) {
        addTask(values);
    }

    return (
    <div className="tasks-page">
        <h1>Tasks</h1>

        <div className="tasks-form-section">
            <TaskForm onSubmit={handleCreateTask} />
        </div>

        {availableTasks.length === 0 ? (
            <p className="tasks-empty">No tasks yet.</p>
        ) : (
            <div className="tasks-list">
                {availableTasks.map((task) => (
                    <TaskCard
                        key={task.Id}
                        task={task}
                        showProject={true}
                    />
                ))}
            </div>
        )}
    </div>
);
}

export default Tasks;