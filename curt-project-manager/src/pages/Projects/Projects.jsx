import { useAppContext } from "../../context/useAppContext";
import ProjectCard from "./ProjectCard";
function Projects() {
    const { projects } = useAppContext();
    return (
        <div>
            <h1>Projects</h1>
            <div>
                {projects.map(project => (<ProjectCard key={project.Id} project={project}/>))}
            </div>
        </div>
    );
}

export default Projects;