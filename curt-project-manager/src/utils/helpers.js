import { STATUSES } from "./constants";

export function getUserById(users, id) {
    return users.find((user) => user.Id === id) ?? null;
}

export function getProjectById(projects, id) {
    return projects.find((project) => project.Id === id) ?? null;
}

export function getTaskById(tasks, id) {
    return tasks.find((task) => task.Id === id) ?? null;
}

export function getProjectTasks(tasks, projectId) {
    return tasks.filter((task) => task.projectId === projectId);
}

export function getProjectProgress(tasks, projectId) {
    const projectTasks = getProjectTasks(tasks, projectId);
    const total = projectTasks.length;
    if (total === 0) return 0;

    const done = projectTasks.filter((t) => t.status === STATUSES[2]).length;
    return Math.round((done / total) * 100);
}

export function getProjectUserIds(project) {
    return [...new Set([project.ownerId, ...project.memberIds])];
}