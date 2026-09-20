import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound({message,backTo}) {
    return (
        <div>
            <h2>{message}</h2>
            <Link to={backTo}> ← Back </Link>
        </div>
    );
}

export default NotFound;

{
/* <NotFound
    message="Project not found."
    backTo="/projects"
/> 
<NotFound
    message="Task not found."
    backTo="/tasks"
/>
*/}