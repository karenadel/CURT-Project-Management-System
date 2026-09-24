import { useState } from "react";
import ProjectForm from "../Projects/ProjectForm";
import { useParams, Link,useNavigate } from "react-router-dom";
import { getProjectById, getProjectProgress, getProjectTasks, getUserById ,getProjectOwner} from "../../utils/helpers";
import { useAppContext } from "../../context/useAppContext.js";
import TaskCard from "../Tasks/TaskCard";
import NotFound from "../../components/common/NotFound";
import "./ProjectsDetails.css";

function ProjectsDetails() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const {projects, tasks: allTasks, users,updateProject,
    deleteProject,can,currentUser,removeProjectMember,addProjectMember,showToast} = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const project = getProjectById(projects, projectId);
    if (!project) {
        return (
            <NotFound message="Project not found." backTo="/projects"/>
        );
    }
    const members = project.memberIds.map((id) => getUserById(users, id)).filter(Boolean);
    const availableUsers = users.filter((user) => user.Id !== project.ownerId &&!project.memberIds.includes(user.Id));
    function handleUpdateProject(values) {
        updateProject({
            ...project,
            name: values.name,
            description: values.description
        });
        setIsEditing(false);
        showToast("Project updated successfully!");
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
                    onSubmit={handleUpdateProject}/>
                <button
                    className="project-cancel-button"
                    onClick={() => setIsEditing(false)}>
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
        showToast("Project deleted successfully!");
    }

    const tasks = getProjectTasks(allTasks, project.Id);
    return (
    <div className="project-details-container">
        <h2 className="project-title">{project.name}</h2>
        {(can(currentUser, "edit_project") || (getProjectOwner(project)===currentUser.Id)) && (<div className="project-details-actions">
            <button
                className="project-edit-button"
                onClick={() => setIsEditing(true)}>
                Edit project
            </button>
            <button
                className="project-delete-button"
                onClick={handleDeleteProject}>
                Delete project
            </button>
        </div>)}
        <h3 className="project-description">{project.description}</h3>
        <div className="project-details-info">
            <h4>Owner: {getUserById(users, project.ownerId)?.name || "Unknown"}</h4>
            <h4>Progress: {getProjectProgress(allTasks, project.Id)}%</h4>
        </div>
<div className="project-members">
    <h2>Members</h2>
    {members.length === 0 ? (<p>No members yet.</p>) : (
        <ul>
            {members.map((member) => (
                <li key={member.Id}>
                    <span>{member.name}</span>
                    {can(currentUser, "edit_project") && (
                        <button onClick={() => {removeProjectMember(project.Id, member.Id); 
                        showToast("Member removed successfully!");}}>
                            Remove
                        </button>
                    )}
                </li>
            ))}
        </ul>
    )}
    {can(currentUser, "edit_project") && availableUsers.length > 0 && (
        <div>
            <h3>Add member</h3>
            <select
                defaultValue=""
                onChange={(e) => {
                    if (!e.target.value) return;
                    addProjectMember(project.Id, e.target.value);
                    e.target.value = "";
                    showToast("Member added successfully!");}}>
                <option value="">Select a user</option>
                {availableUsers.map((user) => (
                    <option key={user.Id} value={user.Id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    )}
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