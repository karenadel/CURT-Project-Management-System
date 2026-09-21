import { useEffect, useState } from "react";
import { Context } from "./Context.jsx";
import { getProjects, getTasks, getUsers, saveData } from "../utils/storage.js";

export function Provider({ children }) {
    const [projects, setProjects] = useState(() => getProjects());
    const [tasks, setTasks] = useState(() => getTasks());
    const [users, setUsers] = useState(() => getUsers());

    useEffect(() => {
        saveData("PROJECTS", projects);
    }, [projects]);
    useEffect(() => {
        saveData("TASKS", tasks);
    }, [tasks]);
    useEffect(() => {
        saveData("USERS", users);
    }, [users]);

    function addProject({ name, description }) {
        const newProject = {
            Id: crypto.randomUUID(),
            name: name.trim(),
            description: description?.trim() || "",
            ownerId: "u1", // TODO: replace with currentUser.Id once auth exists
            memberIds: []
        };
        setProjects((prev) => [...prev, newProject]);
        return newProject;
    }

    function updateProject(updatedProject) {
        setProjects((prev) =>
            prev.map((project) =>
                project.Id === updatedProject.Id ? updatedProject : project
            )
        );
    }

    function deleteProject(projectId) {
        setProjects((prev) => prev.filter((project) => project.Id !== projectId));
        setTasks((prev) => prev.filter((task) => task.projectId !== projectId));
    }

    const value = {
        projects,
        setProjects,
        tasks,
        setTasks,
        users,
        setUsers,
        addProject,
        updateProject,
        deleteProject
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}