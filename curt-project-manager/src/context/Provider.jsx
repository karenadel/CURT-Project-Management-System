import {useEffect, useState} from "react";
import { Context } from "./Context.jsx";
import {getProjects, getTasks, getUsers, saveData} from "../utils/storage.js";
export function Provider({ children }) {
    const [projects, setProjects] = useState(() => getProjects());
    const [tasks, setTasks] = useState(() => getTasks());
    const [users, setUsers] = useState(() => getUsers());

    const value = { projects, setProjects, tasks, setTasks, users, setUsers, addProject};

    useEffect(()=>{
        saveData("PROJECTS", projects);
    },[projects]);
    useEffect(()=>{
        saveData("TASKS", tasks);
    },[tasks]);
    useEffect(()=>{
        saveData("USERS", users);
    },[users]);

    function addProject({ name, description }) {
        const newProject = {
            Id: crypto.randomUUID(),
            name: name.trim(),
            description: description?.trim() || "",
            ownerId: "u1",
            memberIds: []
        };
        setProjects((prev) => [...prev, newProject]);
        return newProject; 
    }
    

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}