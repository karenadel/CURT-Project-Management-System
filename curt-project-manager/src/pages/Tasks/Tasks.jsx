import { getTasks } from "../../utils/storage";
import TaskCard from "./TaskCard";
function Tasks() {
    const tasks = getTasks();
    return (
        <div>
            <h1>Tasks</h1>
            <div>
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} showProject={true}/>
                ))}
            </div>
        </div>
    );
}

export default Tasks;