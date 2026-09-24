import { useAppContext } from "../../context/useAppContext";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import "./Tasks.css";
// import { getTasksForRole } from "../../utils/helpers";
import { useState } from "react";
import { getMyTasks } from "../../utils/helpers.js";
function Tasks() {
    const [activeTab, setActiveTab] = useState("my");
    const {tasks,addTask,currentUser} = useAppContext();
    const myTasks = getMyTasks(tasks, currentUser.Id);
    const availableTasks =
        currentUser.role === "admin" && activeTab === "all"
            ? tasks
            : myTasks;
    function handleCreateTask(values) {
        addTask(values);
    }

    return (
    <div className="tasks-page">
        <h1>Tasks</h1>

        <div className="tasks-form-section">
            <TaskForm onSubmit={handleCreateTask} />
        </div>
        {currentUser.role === "admin" && (
            <div className="task-tabs">
                <button
                    onClick={() => setActiveTab("my")}
                    className={activeTab === "my" ? "active" : ""}>
                    My Tasks
                </button>

                <button
                    onClick={() => setActiveTab("all")}
                    className={activeTab === "all" ? "active" : ""}>
                    All Tasks
                </button>
            </div>
        )}

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