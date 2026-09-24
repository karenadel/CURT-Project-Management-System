import { useState } from "react";
import { useAppContext } from "../../context/useAppContext";
// import { getProjectsForRole } from "../../utils/helpers";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import "./Projects.css";
import { getMyProjects } from "../../utils/helpers.js";
function Projects() {
    const {projects,addProject,currentUser} = useAppContext();
    const [activeTab, setActiveTab] = useState("my");
    function handleCreateProject(values) {
        addProject(values);
    }
    const myProjects = getMyProjects(projects, currentUser.Id);
    const availableProjects =
        currentUser.role === "admin" && activeTab === "all" ? projects : myProjects;
    return (
        <div className="projects-page">
            <h1>Projects</h1>
            <ProjectForm onSubmit={handleCreateProject} />
            {currentUser.role === "admin" && (
                <div className="project-tabs">
                    <button
                        onClick={() => setActiveTab("my")}
                        className={activeTab === "my" ? "active" : ""}>
                        My Projects
                    </button>
                    <button
                        onClick={() => setActiveTab("all")}
                        className={activeTab === "all" ? "active" : ""}>
                        All Projects
                    </button>
                </div>
            )}            
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