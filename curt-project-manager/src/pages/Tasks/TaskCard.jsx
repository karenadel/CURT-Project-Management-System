import "./TaskCard.css"
import {Link} from "react-router-dom"
import StatusBadge from "../../components/common/StatusBadge"
import PriorityBadge from "../../components/common/PriorityBadge"
import {getUserById,getProjectById} from "../../utils/helpers"
import { useAppContext } from "../../context/useAppContext.js";


function TaskCard({task,showProject=false}){
    const { users, projects, updateTaskStatus } = useAppContext();
    function handleStatusChange(event) {
        updateTaskStatus(task.Id, event.target.value);
    }
    return(
        <div className="task-card">
        <Link className="task-card-link" to={`/tasks/${task.Id}`}><h3>{task.title}</h3></Link>
            
                    <div className="task-card-badges">
                        <StatusBadge status={task.status} />
                        <PriorityBadge priority={task.priority} />
                        <select
                            value={task.status}
                            onChange={handleStatusChange}
                            onClick={(event) => event.stopPropagation()}>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                </div>
                <h4>
                    Assigned to:{" "}
                    {task.assignedTo ? getUserById(users, task.assignedTo)?.name : "Unassigned"}
                </h4>
                {showProject && (<h4>Project: {getProjectById(projects, task.projectId)?.name || "Unknown"}</h4>)}
            </div>
        
    );
}

export default TaskCard;