import { useAppContext } from "../../context/useAppContext";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
function Tasks() {
    const {tasks,addTask} = useAppContext();
    function handleCreateTask(values) {
        addTask(values);
    }

    return (
        <div>
            <h1>Tasks</h1>
            <TaskForm onSubmit={handleCreateTask} />
            <div>
                {tasks.map(task => (
                    <TaskCard key={task.Id} task={task} showProject={true}/>
                ))}
            </div>
        </div>
    );
}

export default Tasks;