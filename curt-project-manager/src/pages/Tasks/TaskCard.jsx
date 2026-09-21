import "./TaskCard.css"
import {Link} from "react-router-dom"
import StatusBadge from "../../components/common/StatusBadge"
import PriorityBadge from "../../components/common/PriorityBadge"
import {getUserById,getProjectById} from "../../utils/helpers"
import { useAppContext } from "../../context/useAppContext.js";


function TaskCard({task,showProject=false}){
    const { users, projects } = useAppContext();
    return(
        <Link className="task-card" to={`/tasks/${task.Id}`}>
            <div>
                <h3>{task.title}</h3>
                <div className="task-card-badges">
                    <StatusBadge status={task.status} />
                    <PriorityBadge priority={task.priority} />
                </div>
                <h4>
                    Assigned to:{" "}
                    {task.assignedTo ? getUserById(users, task.assignedTo)?.name : "Unassigned"}
                </h4>
                {showProject && (<h4>Project: {getProjectById(projects, task.projectId)?.name || "Unknown"}</h4>)}
            </div>
        </Link>
    );
}

export default TaskCard;