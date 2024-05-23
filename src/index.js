import { ShowProject, loadProjects, loadProjectsCustom } from "./DOManipulator";
import { addTask, addToList, getList,getData, addData,saveData } from "./database";
import Project from "./project"
import "./style.css"

if(!getData("intiliazed")){
    saveData("intiliazed","one")
    saveData("Demo Project",new Project("Demo Project","2024-05-14"));
    addToList("Demo Project");
    addTask("Demo Project","DEMO TASK");
}



let project=getList();
ShowProject(getData(getList()[0]),getList()[0]);

loadProjects(project);

//adding dynamics to website

let addProjectBtn = document.querySelector(".addProject button");
addProjectBtn.addEventListener("click",(e)=>{
    let modal = document.querySelector(".addProjectModal");
    modal.show();
})

let modalProjectAddBtn = document.querySelector(".addProjectBtnModal");
modalProjectAddBtn.addEventListener("click",(e)=>{

    let projectName = document.querySelector(".modalProjectName").value;
    let dueDate = document.querySelector(".modalDueDate").value;
    if(projectName==="" || dueDate === ""){
        return false;
    }
    if(!addData(projectName,new Project(projectName,dueDate))){
        window.alert("this project name already exists");
        e.preventDefault()
        return false;
    }
    loadProjects(getList());
});

let modalCloseBtn = document.querySelector(".closeProjectModal");
modalCloseBtn.addEventListener("click",()=>{
    let modal = document.querySelector(".addProjectModal");
    modal.close();
});

const dueT = document.querySelector(".dueT");
dueT.addEventListener("click",e=>{
    e.stopPropagation()
    loadProjectsCustom(getList(),"T")
});

const dueW = document.querySelector(".dueW");
dueW.addEventListener("click",e=>{
    e.stopPropagation()
    loadProjectsCustom(getList(),"W")
});

const dueM = document.querySelector(".dueM");
dueM.addEventListener("click",e=>{
    e.stopPropagation()
    loadProjectsCustom(getList(),"M")
});



