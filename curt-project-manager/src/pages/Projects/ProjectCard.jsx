import { Link } from "react-router-dom";
import "./ProjectCard.css"
import { getUserById, getProjectProgress } from "../../utils/helpers";
function ProjectCard({ project }) {
    const owner = getUserById(project.ownerId);
    const progress = getProjectProgress(project.id);
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