import {PROJECTS,TASKS,USERS} from "../mockdata/seed.js"

export function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.log(err.message);
    }
}
export function getData(key, fallback){
    let data;
    try{
        data = JSON.parse(localStorage.getItem(key));
        if(data===null||!Array.isArray(data)){
            saveData(key, fallback);
            data = fallback;
        }
    } catch (err){
        console.log(err.message)
        saveData(key, fallback);
        data = fallback;
    }
    return data;
}

export function getProjects(){
    return getData("PROJECTS",PROJECTS)
}
export function getUsers(){
    return getData("USERS",USERS)
}
export function getTasks(){
    return getData("TASKS",TASKS)
}
export function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("CURRENT_USER"));
    } catch (err) {
        console.log(err.message);
        return null;
    }
}