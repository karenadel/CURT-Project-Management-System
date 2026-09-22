import { useEffect, useState } from "react";
import { Context } from "./Context.jsx";
import { getProjects, getTasks, getUsers, saveData,getCurrentUser } from "../utils/storage.js";
import bcrypt from "bcryptjs";

export function Provider({ children }) {
    const [projects, setProjects] = useState(() => getProjects());
    const [tasks, setTasks] = useState(() => getTasks());
    const [users, setUsers] = useState(() => getUsers());
    const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

    useEffect(() => {
        saveData("PROJECTS", projects);
    }, [projects]);
    useEffect(() => {
        saveData("TASKS", tasks);
    }, [tasks]);
    useEffect(() => {
        saveData("USERS", users);
    }, [users]);
    useEffect(() => {
        saveData("CURRENT_USER", currentUser);
    }, [currentUser]);

    function addProject({ name, description }) {
        const newProject = {
            Id: crypto.randomUUID(),
            name: name.trim(),
            description: description?.trim() || "",
            ownerId: currentUser.Id, 
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
    function addTask({title,description,projectId,assignedTo,status,priority}) {
        const newTask = {
            Id: crypto.randomUUID(),
            title: title.trim(),
            description: description?.trim() || "",
            projectId,
            assignedTo: assignedTo || null,
            status,
            priority
        };

        setTasks((prev) => [...prev, newTask]);

        return newTask;
    }
    function updateTask(updatedTask) {
        setTasks((prev) =>
            prev.map((task) =>
                task.Id === updatedTask.Id ? updatedTask : task
            )
        );
    }

    function deleteTask(taskId) {
        setTasks((prev) => prev.filter((task) => task.Id !== taskId));
    }

    async function login(email, password) {
        const user = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
        if (!user) {
            return false;
        }
        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordMatches) {
            return false;
        }
        setCurrentUser(user);
        return true;
    }

    async function signup({ name, email, password }) {
        const existing = users.find(
            (user) => user.email.toLowerCase() === email.toLowerCase()
        );
        if (existing) {
            return {
                success: false,
                error: "Email is already taken"
            };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            Id: crypto.randomUUID(),
            name,
            email,
            password: hashedPassword
        };
        setUsers((prev) => [...prev, newUser]);
        setCurrentUser(newUser);
        return {
            success: true
        };
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
        deleteProject,
        addTask,
        updateTask,
        deleteTask,
        currentUser,
        setCurrentUser,
        login,
        signup
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}