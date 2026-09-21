import { Link } from "react-router-dom";
import "./ProjectCard.css"
import { getUserById, getProjectProgress } from "../../utils/helpers";
import { useAppContext } from "../../context/useAppContext.js";

function ProjectCard({ project }) {
    const { users, tasks } = useAppContext();
    const owner = getUserById(users, project.ownerId);
    const progress = getProjectProgress(tasks, project.Id);
    return (
        <div className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p> Owner: {owner?.name || "Unknown"}</p>
            <p>Progress: {progress}%</p>
            <Link to={`/projects/${project.Id}`}>View project</Link>
        </div>
    );
}

export default ProjectCard;