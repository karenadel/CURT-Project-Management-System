import { useAppContext } from "../../context/useAppContext";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import "./Projects.css";
function Projects() {
    const {projects, addProject} = useAppContext();
    function handleCreateProject(values) {
        addProject(values);
    }
    return (
        <div className="projects-page">
            <h1>Projects</h1>
            <ProjectForm onSubmit={handleCreateProject} />
            <div className="projects-list">
            {projects.length === 0 ? (<p className="projects-empty">No projects yet.</p>) : (
                projects.map(project => (
                    <ProjectCard
                        key={project.Id}
                        project={project}
                    />
                ))
            )}
        </div>
        </div>
    );
}

export default Projects;