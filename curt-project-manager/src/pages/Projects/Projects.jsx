import { useState } from "react";
import { useAppContext } from "../../context/useAppContext";
// import { getProjectsForRole } from "../../utils/helpers";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import "./Projects.css";
import { getMyProjects } from "../../utils/helpers.js";
function Projects() {
    const {projects,addProject,currentUser,showToast} = useAppContext();
    const [activeTab, setActiveTab] = useState("my");
    const [search, setSearch] = useState("");
    function handleCreateProject(values) {
        addProject(values);
        showToast("Project created successfully!");
    }
    const myProjects = getMyProjects(projects, currentUser.Id);
    const availableProjects =
        currentUser.role === "admin" && activeTab === "all" ? projects : myProjects;
        const filteredProjects = availableProjects.filter((project) =>project.name.toLowerCase().includes(search.toLowerCase()));
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
            <div className="project-search">
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="projects-list">
            {filteredProjects.length === 0 ? (<p className="projects-empty">No projects yet.</p>) : (filteredProjects.map(project => (
                    <ProjectCard
                        key={project.Id}
                        project={project}/>
                ))
            )}
        </div>
        </div>
    );
}

export default Projects;