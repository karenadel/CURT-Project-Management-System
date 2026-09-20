import {Link,useParams} from "react-router-dom";
import {getTaskById,getUserById,getProjectById} from "../../utils/helpers";
import StatusBadge from "../../components/common/StatusBadge";
import PriorityBadge from "../../components/common/PriorityBadge";
import NotFound from "../../components/common/NotFound";

function TasksDetails() {
    const {taskId} = useParams();
    const task = getTaskById(taskId);
    if (!task) {
        return (<NotFound message="Task not found." backTo="/tasks"/>
        );
    }
    const assignedto = task.assignedTo ? getUserById(task.assignedTo) : null;
    const project = getProjectById(task.projectId);
    return (
        <div>
            <h1>{task.title}</h1>
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
            <p> Assignee: {assignedto?.name || "Unassigned"}</p>
            <p> Project: {project?.name || "Unknown project"}</p>

            <Link to="/tasks">Back to tasks</Link>
        </div>
    );
}

export default TasksDetails;