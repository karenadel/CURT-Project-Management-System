import { getUsers, getTasks, getProjects } from "./storage";
import { STATUSES } from "./constants";




export function getUserById(id) {
    const users = getUsers();
    return users.find((user) => user.Id === id) ?? null;
}

export function getProjectById(id) {
    const projects = getProjects();
    return projects.find((project) => project.Id === id) ?? null;
}

export function getTaskById(id) {
    const tasks = getTasks();
    return tasks.find((task) => task.Id === id) ?? null;
}

export function getProjectTasks(projectId){
    const tasks=getTasks();
    let projectTasks=[];
    tasks.forEach((task)=>{
        if(task.projectId===projectId) projectTasks.push(task); 
    }) 
    return projectTasks;
}
export function getProjectProgress(projectId){
    let task=getProjectTasks(projectId);
    let total = task.length;
    if (total === 0) return 100;
    let count=0;
    task.forEach((t)=>{
        if(t.status===STATUSES[2]) count++;
    })
    return Math.round((count/total)*100);
}

export function getProjectUserIds(project){
    let projectmembers=[project.ownerId];
    project.memberIds.forEach((member)=>{if(projectmembers[0]!==member)projectmembers.push(member)});
    return projectmembers;
}