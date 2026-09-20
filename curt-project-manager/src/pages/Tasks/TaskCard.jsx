import "./TaskCard.css"
import {Link} from "react-router-dom"
import {StatusBadge} from "../../components/common/StatusBadge"
import {PriorityBadge} from "../../components/common/PriorityBadge"
import {getUserById} from "../../utils/helpers"
import {getProjectById} from "../../utils/helpers"

function TaskCard({task}){
    return(
        <Link className="task-card" to={`/tasks/${task.id}`}>
            <div>
                <h3>{task.title}</h3>
                <div className="task-card-badges">
                    <StatusBadge status={task.status} />
                    <PriorityBadge priority={task.priority} />
                </div>
                <h4>
                    Assigned to:{" "}
                    {task.assignedTo ? getUserById(task.assignedTo)?.name : "Unassigned"}
                </h4>
                <h4>Project: {getProjectById(task.projectId).name}</h4>
            </div>
        </Link>
    );
}

export default TaskCard;