import { useAppContext } from "../../context/useAppContext";
import { getProjectsForRole } from "../../utils/helpers";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import "./Projects.css";
function Projects() {
    const {projects,addProject,currentUser} = useAppContext();
    const availableProjects = getProjectsForRole(projects, currentUser);
    function handleCreateProject(values) {
        addProject(values);
    }
    return (
        <div className="projects-page">
            <h1>Projects</h1>
            <ProjectForm onSubmit={handleCreateProject} />
            <div className="projects-list">
            {availableProjects.length === 0 ? (<p className="projects-empty">No projects yet.</p>) : (
                availableProjects.map(project => (
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