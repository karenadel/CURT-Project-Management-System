import { useState } from "react";
import "./ProjectForm.css"
const defaultValues = {
    name: "",
    description: ""
};
function ProjectForm({initialValues = defaultValues,submitLabel = "Create project",onSubmit}){
    const [name, setName] = useState(initialValues.name);
    const [description, setDescription] = useState(initialValues.description);
    const [touched, setTouched] = useState(false);
    function validate(name) {
        if (name.trim() === "") {
            return "Project name is required";
        }

        return "";
    }
    const error = validate(name);
    const isValid = name.trim() !== "";
    function handleSubmit(e) {
        e.preventDefault();
        setTouched(true);
        const error = validate(name);
        if (error) {
            return;
        }
        onSubmit({
            name: name.trim(),
            description: description.trim()
        });
    }
    return (
        <form className="project-form" onSubmit={handleSubmit}>
            <label htmlFor="project-name">
                Project name
            </label>
            <input
                id="project-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched(true)}
                maxLength={80}
                required
                aria-describedby="name-error"
            />
            {touched && error && (<p id="name-error" role="alert">{error}</p>)}
            <label htmlFor="project-description"> Description</label>
            <textarea
                id="project-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" disabled={!isValid}>{submitLabel}</button>

        </form>
    );
}

export default ProjectForm;
