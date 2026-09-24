import "./TaskForm.css"
import { useState } from "react";
import { useAppContext } from "../../context/useAppContext.js";
import { getProjectUserIds, getProjectsForRole} from "../../utils/helpers";
import { STATUSES, PRIORITIES } from "../../utils/constants";

const defaultValues = {
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    status: STATUSES[0],
    priority: PRIORITIES[0]
};

function validate(values) {
    const errors = {};
    if (values.title.trim() === "") {
        errors.title = "Task title is required";
    }
    if (values.projectId === "") {
        errors.projectId = "Project is required";
    }
    return errors;
}

function TaskForm({ initialValues = defaultValues, submitLabel = "Create task", onSubmit }) {
    const { projects, users,currentUser } = useAppContext();
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const availableProjects=getProjectsForRole(projects,currentUser);
    const errors = validate(values);
    const isValid = Object.keys(errors).length === 0;

    const selectedProject = projects.find((p) => p.Id === values.projectId);
    const assignableUserIds = selectedProject ? getProjectUserIds(selectedProject) : [];
    const assignableUsers = assignableUserIds
        .map((id) => users.find((u) => u.Id === id))
        .filter(Boolean);

    function handleChange(field, value) {
        setValues((prev) => {
            const next = { ...prev, [field]: value };
            if (field === "projectId") {
                next.assignedTo = "";
            }
            return next;
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setTouched({ title: true, projectId: true });
        if (!isValid) return;

        onSubmit({
            title: values.title.trim(),
            description: values.description.trim(),
            projectId: values.projectId,
            assignedTo: values.assignedTo || null,
            status: values.status,
            priority: values.priority
        });
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <label htmlFor="task-title">Title</label>
            <input
                id="task-title"
                value={values.title}
                onChange={(e) => handleChange("title", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, title: true }))}
                maxLength={100}
                aria-describedby={touched.title && errors.title ? "title-error" : undefined}
            />
            {touched.title && errors.title && (
                <p id="title-error" role="alert">{errors.title}</p>
            )}

            <label htmlFor="task-description">Description</label>
            <textarea
                id="task-description"
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
            />

            <label htmlFor="task-project">Project</label>
            <select
                id="task-project"
                value={values.projectId}
                onChange={(e) => handleChange("projectId", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, projectId: true }))}
            >
                <option value="">Select a project</option>
                {availableProjects.map((p) => (
                    <option key={p.Id} value={p.Id}>{p.name}</option>
                ))}
            </select>
            {touched.projectId && errors.projectId && (
                <p role="alert">{errors.projectId}</p>
            )}

            <label htmlFor="task-assignee">Assignee</label>
            <select
                id="task-assignee"
                value={values.assignedTo}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
                disabled={!selectedProject}
            >
                <option value="">Unassigned</option>
                {assignableUsers.map((u) => (
                    <option key={u.Id} value={u.Id}>{u.name}</option>
                ))}
            </select>

            <label htmlFor="task-status">Status</label>
            <select
                id="task-status"
                value={values.status}
                onChange={(e) => handleChange("status", e.target.value)}
            >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <label htmlFor="task-priority">Priority</label>
            <select
                id="task-priority"
                value={values.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
            >
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>

            <button type="submit" disabled={!isValid}>{submitLabel}</button>
        </form>
    );
}

export default TaskForm;