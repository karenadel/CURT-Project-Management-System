import {PROJECTS,TASKS,USERS} from "../mockdata/seed.js"


function getData(key, fallback){
    let data;
    try{
        data = JSON.parse(localStorage.getItem(key));
        if(data===null||!Array.isArray(data)){
        localStorage.setItem(key, JSON.stringify(fallback));
        data = JSON.parse(localStorage.getItem(key));
        }
    }catch (err){
        console.log(err.message)
        localStorage.setItem(key, JSON.stringify(fallback));
        data = JSON.parse(localStorage.getItem(key));
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
