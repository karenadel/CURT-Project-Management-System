import { useState } from "react";
import TaskForm from "../Tasks/TaskForm";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getTaskById, getUserById, getProjectById } from "../../utils/helpers";
import { useAppContext } from "../../context/useAppContext.js";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";
import NotFound from "../../components/common/NotFound";
import "./TaskDetails.css";

function TasksDetails() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const { tasks, users, projects, updateTask, deleteTask,can,currentUser } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const task = getTaskById(tasks, taskId);
    if (!task) {
        return (<NotFound message="Task not found." backTo="/tasks"/>
        );
    }
    function handleUpdateTask(values) {
        updateTask({...task,...values});
        setIsEditing(false);
    }
    if (isEditing) {
        return (
            <div className="task-details-edit">
                <h2>Edit Task</h2>
                <TaskForm
                    initialValues={{
                        title: task.title,
                        description: task.description,
                        projectId: task.projectId,
                        assignedTo: task.assignedTo || "",
                        status: task.status,
                        priority: task.priority
                    }}
                    submitLabel="Save changes"
                    onSubmit={handleUpdateTask}
                />
                <button className="task-cancel-button" onClick={() => setIsEditing(false)}>
                    Cancel
                </button>
            </div>
        );
    }
    function handleDeleteTask() {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed) { return; }
        deleteTask(task.Id);
        navigate("/tasks");
    }

    const assignedto = task.assignedTo ? getUserById(users, task.assignedTo) : null;
    const project = getProjectById(projects, task.projectId);
    return (
        <div className="task-details">
            <h1>{task.title}</h1>

            <div className="task-details-actions">
                {can(currentUser, "edit_task") && (<button
                    className="task-edit-button"
                    onClick={() => setIsEditing(true)}>
                    Edit task
                </button>)}

                {can(currentUser, "delete_task") && (<button
                    className="task-delete-button"
                    onClick={handleDeleteTask}>
                    Delete task
                </button>)}
            </div>

            <div className="task-details-badges">
                <StatusBadge status={task.status} />
                <PriorityBadge priority={task.priority} />
            </div>

            <div className="task-details-info">
                <p>
                    <strong>Assigned to:</strong>{" "}
                    {assignedto?.name || "Unassigned"}
                </p>

                <p>
                    <strong>Project:</strong>{" "}
                    {project?.name || "Unknown project"}
                </p>

                <p>
                    <strong>Description:</strong>{" "}
                    {task.description || "No description"}
                </p>
            </div>

            <Link className="task-back-link" to="/tasks">
                ← Back to tasks
            </Link>
        </div>
    );
}

export default TasksDetails;