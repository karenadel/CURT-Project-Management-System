import { useAppContext } from "../../context/useAppContext";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import "./Tasks.css";
import { STATUSES, PRIORITIES } from "../../utils/constants";
// import { getTasksForRole } from "../../utils/helpers";
import { useState } from "react";
import { getMyTasks } from "../../utils/helpers.js";
function Tasks() {
    const [activeTab, setActiveTab] = useState("my");
    const {tasks,addTask,currentUser,users} = useAppContext();
    const myTasks = getMyTasks(tasks, currentUser.Id);
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [assigneeFilter, setAssigneeFilter] = useState("all");
    const availableTasks =
        currentUser.role === "admin" && activeTab === "all"?tasks: myTasks;
    const filteredTasks = availableTasks.filter((task) => {
        const matchesStatus =
            statusFilter === "all" || task.status === statusFilter;
        const matchesPriority =
            priorityFilter === "all" || task.priority === priorityFilter;
        const matchesAssignee =
            assigneeFilter === "all" || task.assignedTo === assigneeFilter;
        return matchesStatus && matchesPriority && matchesAssignee;
    });        
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
        <div className="task-filters">
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All statuses</option>

                {STATUSES.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>

            <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}>
                <option value="all">All priorities</option>

                {PRIORITIES.map((priority) => (
                    <option key={priority} value={priority}>
                        {priority}
                    </option>
                ))}
            </select>

            <select
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}>
                <option value="all">All assignees</option>

                {users.map((user) => (
                    <option key={user.Id} value={user.Id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>

        {filteredTasks.length === 0 ? (
            <p className="tasks-empty">No tasks yet.</p>
        ) : (
            <div className="tasks-list">
                {filteredTasks.map((task) => (
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