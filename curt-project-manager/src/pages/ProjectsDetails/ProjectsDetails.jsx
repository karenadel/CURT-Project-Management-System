import { useState } from "react";
import ProjectForm from "../Projects/ProjectForm";
import { useParams, Link,useNavigate } from "react-router-dom";
import { getProjectById, getProjectProgress, getProjectTasks, getProjectUserIds, getUserById } from "../../utils/helpers";
import { useAppContext } from "../../context/useAppContext.js";
import TaskCard from "../Tasks/TaskCard";
import NotFound from "../../components/common/NotFound";
import "./ProjectsDetails.css";

function ProjectsDetails() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const {projects, tasks: allTasks, users,updateProject,
    deleteProject,can,currentUser} = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const project = getProjectById(projects, projectId);
    if (!project) {
        return (
            <NotFound message="Project not found." backTo="/projects"/>
        );
    }
    function handleUpdateProject(values) {
        updateProject({
            ...project,
            name: values.name,
            description: values.description
        });
        setIsEditing(false);
    }
    if (isEditing) {
        return (
            <div className="project-details-container">
                <h2 className="project-details-edit-title">Edit Project</h2>
                <ProjectForm
                    initialValues={{
                        name: project.name,
                        description: project.description
                    }}
                    submitLabel="Save changes"
                    onSubmit={handleUpdateProject}
                />
                <button
                    className="project-cancel-button"
                    onClick={() => setIsEditing(false)}
                >
                    Cancel
                </button>
            </div>
        );
    }
    function handleDeleteProject() { 
        const confirmed = window.confirm( "Are you sure you want to delete this project?" ); 
        if (!confirmed) { return; } 
        deleteProject(project.Id); 
        navigate("/projects"); 
    }

    const tasks = getProjectTasks(allTasks, project.Id);
    return (
    <div className="project-details-container">
        <h2 className="project-title">{project.name}</h2>
        {can(currentUser, "edit_project") && (<div className="project-details-actions">
            <button
                className="project-edit-button"
                onClick={() => setIsEditing(true)}
            >
                Edit project
            </button>
            <button
                className="project-delete-button"
                onClick={handleDeleteProject}
            >
                Delete project
            </button>
        </div>)}
        <h3 className="project-description">{project.description}</h3>
        <div className="project-details-info">
            <h4>Owner: {getUserById(users, project.ownerId)?.name || "Unknown"}</h4>
            <h4>Members: {getProjectUserIds(project).map((element,i) => {
                    if(i===0) {return}
                    if(i+1!==getProjectUserIds(project).length) return getUserById(users, element).name + ", ";
                    else return getUserById(users, element).name;
                    })}</h4>
            <h4>Progress: {getProjectProgress(allTasks, project.Id)}%</h4>
        </div>
        <div className="project-tasks">
            <h3>Tasks</h3>
            {tasks.length === 0 ? (
                <p className="project-no-tasks">No tasks in this project yet.</p>
            ) : (
                tasks.map(task => (
                    <TaskCard key={task.Id} task={task} showProject={false} />
                ))
            )}
        </div>
        <Link className="project-back-link" to="/projects">← Back to projects</Link>

    </div>
    );
}

export default ProjectsDetails;