import Project from "./project"

export function getData(key) {
    let data = localStorage.getItem(key)
    if (!data) {
        return false;
    }
    let object = JSON.parse(data);
    object.__proto__ = Project.prototype;
    return object;
}

export function addData(name,data){
    if(getData(name)===false){
        saveData(name,data);
        addToList(name)
        return true
    }
    return false
   
}

export function removeData(name){
    localStorage.removeItem(name)
    let projectsIndexs = localStorage.getItem("projects").replace(/"|\\/g,"");
    projectsIndexs=projectsIndexs.split(",");
    projectsIndexs.splice(projectsIndexs.indexOf(name),1);
    projectsIndexs = projectsIndexs.join()
    saveData("projects",projectsIndexs)
}

export function saveData(name, data) {
    let stringyfyData = JSON.stringify(data);
    localStorage.setItem(name, stringyfyData);
}

export function addToList(index) {
    if (!localStorage.getItem("projects")) {
        let p = [];
        p=p.join();
        saveData("projects", p);

    }
    let projects = localStorage.getItem("projects")
    projects = projects.split(",")
    projects.push(index);
    saveData("projects",projects.join());
}

export function getList() {
    if (!localStorage.getItem("projects")) {
        return ["no projects"]
    }
    let projectsIndexs = localStorage.getItem("projects").replace(/"|\\/g,"");
    projectsIndexs=projectsIndexs.split(",");
    projectsIndexs.shift();

    return projectsIndexs;
}

export function addTask(name, task) {
    let p = getData(name);
    p.add_task(task);
    saveData(name, p);
}

export function updateTask(name,index,newTask) {
    let p = getData(name);
    p.update_task(index,newTask);
    saveData(name, p);
}

export function toggleTask(name,index) {
    let p = getData(name);
    p.task_toggle(index);
    saveData(name, p);
}

export function deleteTask(name,index){
    let p = getData(name);
    p.delete_task(index);
    saveData(name, p);
}