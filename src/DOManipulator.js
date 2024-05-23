import { getData } from "./database";
import { get_project, get_project_list } from "./elements";
import { filterData } from "./utility";

const projectArea = document.querySelector(".projectArea");

const project_bar = document.querySelector(".projects");

export function loadProjects(data){
    project_bar.innerHTML=""
    if(data.length===0)
    {
        project_bar.innerHTML = "NO PROJECTS AVAILABLE"
        return
    }
    for(let i=0;i<data.length;i++){
        let projectIndex = data[i]
        let project = getData(projectIndex);
        let li = get_project_list(project.get_projectInfo()[0]);
        if(i===0){
            li.classList.add("selected-list");
        }
        li.addEventListener("click",(e)=>{
            const current = document.querySelector(".selected-list");
            if(current){
            current.classList.remove("selected-list");
            }
            e.target.classList.add("selected-list")
            let index=e.target.innerHTML;
            ShowProject(getData(index),index)
        });
        project_bar.appendChild(li)
    }
}

export function loadProjectsCustom(data,flag)
{
    let remove=document.querySelector(".dues-list-inner");
    if(remove){
        remove.remove()
    }
    let ol = document.createElement("ul");
    ol.classList.add("dues-list-inner");
    
    let filteredData=filterData(data,flag)

    if(filteredData.length===0)
    {
        ol.innerHTML = "NO PROJECTS AVAILABLE";
        if(flag==="T")
        {
            document.querySelector(".dueT").parentNode.insertBefore(ol,document.querySelector(".dueW"));
        }
        else if(flag==="W")
        {
            document.querySelector(".dueT").parentNode.insertBefore(ol,document.querySelector(".dueM"));
        }
        else if(flag==="M")
        {
            document.querySelector(".dueT").parentNode.appendChild(ol)
        }
        return
    }
    for(let i=0;i<filteredData.length;i++){
        let projectIndex = filteredData[i]
        let project = getData(projectIndex);
        let li = get_project_list(project.get_projectInfo()[0]);
        li.classList.add("dues-list-inner-li");
        li.addEventListener("click",(e)=>{
            const current = document.querySelector(".selected-list");
            if(current){
            current.classList.remove("selected-list");
            }
            e.target.classList.add("selected-list")
            let index=e.target.innerHTML;
            ShowProject(getData(index),index)
        });
        ol.appendChild(li)
    }
    if(flag==="T")
        {
            document.querySelector(".dueT").parentNode.insertBefore(ol,document.querySelector(".dueW"));
        }
        else if(flag==="W")
        {
            document.querySelector(".dueT").parentNode.insertBefore(ol,document.querySelector(".dueM"));
        }
        else if(flag==="M")
        {
            document.querySelector(".dueT").parentNode.appendChild(ol)
        }
  
}

export function ShowProject(project,id){
    if(!project)
    {
        projectArea.innerHTML = "<erru>PLEASE SELECT A PROJECT TO OPEN</erru>";
        return
    }
  
    projectArea.innerHTML = "";
    const projectName = project.get_projectInfo()[0];
    const projectDueDate = project.get_projectInfo()[1];
    const projectTasks =  project.get_projectInfo()[2];

    projectArea.appendChild(get_project(projectName,projectDueDate,projectTasks,id))

}