import { getProjects } from "../../utils/storage";
import ProjectCard from "./ProjectCard";
function Projects() {
    const projects = getProjects();
    return (
        <div>
            <h1>Projects</h1>
            <div>
                {projects.map(project => (<ProjectCard key={project.id} project={project}/>))}
            </div>
        </div>
    );
}

export default Projects;