import {useEffect, useState} from "react";
import { Context } from "./Context.jsx";
import {getProjects, getTasks, getUsers, saveData} from "../utils/storage.js";
export function Provider({ children }) {
    const [projects, setProjects] = useState(() => getProjects());
    const [tasks, setTasks] = useState(() => getTasks());
    const [users, setUsers] = useState(() => getUsers());

    const value = { projects, setProjects, tasks, setTasks, users, setUsers };

    useEffect(()=>{
        saveData("PROJECTS", projects);
    },[projects]);
    useEffect(()=>{
        saveData("TASKS", tasks);
    },[tasks]);
    useEffect(()=>{
        saveData("USERS", users);
    },[users]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}