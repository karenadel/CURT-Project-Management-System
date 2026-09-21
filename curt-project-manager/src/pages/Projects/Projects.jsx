import { useAppContext } from "../../context/useAppContext";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
function Projects() {
    const {projects, addProject} = useAppContext();
    function handleCreateProject(values) {
        addProject(values);
    }
    return (
        <div>
            <h1>Projects</h1>
            <ProjectForm onSubmit={handleCreateProject} />
            <div>
                {projects.map(project => (<ProjectCard key={project.Id} project={project}/>))}
            </div>
        </div>
    );
}

export default Projects;