import { format } from "date-fns";
import { addTask, deleteTask, getData, getList, removeData, toggleTask, updateTask } from "./database";
import { ShowProject, loadProjects } from "./DOManipulator";

export function get_project_list(heading) {
    let li = document.createElement("li");
    li.innerHTML = heading
   
    return li;
}

export function get_editable_list(index){
    let li = document.createElement("li");
    
    li.classList.add("task");
    li.classList.add("editableTask");
    li.id=index;

    let input = document.createElement("input");
    let div = document.createElement("div");

    div.classList.add("buttonDiv");

    let addBtn = document.createElement("button");
    let closeBtn = document.createElement("button");
    
    input.setAttribute("type","text");
   
    addBtn.classList.add("TaskEdit");
    addBtn.innerHTML = "ADD";

    closeBtn.classList.add("TaskEdit");
    closeBtn.innerHTML = "CLOSE";

    addBtn.addEventListener("click",e=>{
        let task_name=document.querySelector(".editableTask").childNodes[0].value;
        let index=e.target.parentNode.parentNode.id;
        if(task_name===""){
            window.alert("its empty");
            return;
        }
        addTask(index,task_name);
        ShowProject(getData(index),index)

    })

    closeBtn.addEventListener("click",e=>{
        let index=e.target.parentNode.parentNode.id;
        ShowProject(getData(index),index)
    })

    div.appendChild(addBtn);
    div.appendChild(closeBtn)

    li.appendChild(input);

    li.appendChild(div);

    return li;

}

export function get_updatable_list(index,taskIndex,preText){
    let li = document.createElement("li");
    
    li.classList.add("task");
    li.classList.add("editableTask");
    li.id=index;

    let input = document.createElement("input");
    let div = document.createElement("div");

    div.classList.add("buttonDiv");

    let saveBtn = document.createElement("button");
    let closeBtn = document.createElement("button");
    
    input.setAttribute("type","text");
    input.setAttribute("value",preText);
   
    saveBtn.classList.add("TaskEdit");
    saveBtn.innerHTML = "SAVE";

    closeBtn.classList.add("TaskEdit");
    closeBtn.innerHTML = "CLOSE";

    saveBtn.addEventListener("click",e=>{
        let task_name=document.querySelector(".editableTask").childNodes[0].value;
        let index=e.target.parentNode.parentNode.id;
        if(task_name===""){
            window.alert("its empty");
            return;
        }
        updateTask(index,taskIndex,task_name)
        ShowProject(getData(index),index)

    })

    closeBtn.addEventListener("click",e=>{
        let index=e.target.parentNode.parentNode.id;
        ShowProject(getData(index),index)
    })

    div.appendChild(saveBtn);
    div.appendChild(closeBtn)

    li.appendChild(input);

    li.appendChild(div);

    return li;

}

export function get_project(projectName, projectDueDate, projectTasks, id) {
    let mainDiv = document.createElement("div");
    // Create project container
    const projectContainer = document.createElement("div");
    //Add id to project Container
    projectContainer.id = id;
    // Add class to project container
    projectContainer.classList.add("projectContainer");

    // Create project head
    const projectHead = document.createElement("div");
    projectHead.classList.add("projectHead");

    // Create project title
    const projectTitle = document.createElement("div");
    projectTitle.classList.add("projectTitle");
    projectTitle.textContent = projectName;

    // Create due info
    const dueInfo = document.createElement("div");
    dueInfo.classList.add("due-info");

    // Create due date
    const dueDate = document.createElement("div");
    dueDate.classList.add("date");
    dueDate.textContent = `DUE DATE:${format(projectDueDate, "dd/MM/yyyy")}`;

    // Create days remaining

    let daysRemainingNum = (Math.round((new Date(projectDueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)));

    const daysRemaining = document.createElement("div");
    daysRemaining.classList.add("daysRemaining");
    daysRemaining.textContent = "DAYS REMAINING: " + daysRemainingNum;

    //Create Delete Buttons
    const dltProjectBtn = document.createElement("button");
    dltProjectBtn.classList.add("delProjectBtn");
    dltProjectBtn.innerHTML = "DELETE PROJECT"
    dltProjectBtn.addEventListener("click",e=>{
        if(!confirm("are you sure you want to delete this project?"))
        {
            return;
        }
        let index=e.target.closest(".projectContainer").id;
        removeData(index);
        loadProjects(getList());
        let remove=document.querySelector(".dues-list-inner");
        if(remove){
            remove.remove()
        }
        ShowProject(getData(getList()[0]),getList[0]);
    })

    // Append due date and days remaining to due info
    dueInfo.appendChild(dueDate);
    dueInfo.appendChild(daysRemaining);
    dueInfo.appendChild(dltProjectBtn)

    if (daysRemainingNum <= 0) {
        dueInfo.classList.add("due-red");
    } else if (daysRemainingNum < 7) {
        dueInfo.classList.add("due-gray")
    } else {
        dueInfo.classList.add("due-green");
    }

    // Append project title and due info to project head
    projectHead.appendChild(projectTitle);
    projectHead.appendChild(dueInfo);

    // Create hr element
    const hr = document.createElement("hr");

    // Create head tasks
    const headTasks = document.createElement("div");
    headTasks.classList.add("head-tasks");
    let total_tasks = projectTasks.length
    let task_done = projectTasks.reduce((acc, task) => {
        if (task.status) {
            acc++;
        }
        return acc
    }, 0)
    headTasks.textContent = `TASKS:(${task_done}/${total_tasks})`;


    const tasks = document.createElement("div");

    tasks.classList.add("tasks");

    // Create tasks list
    const tasksList = document.createElement("ol");
    tasksList.classList.add("tasks-list");
    tasksList.setAttribute("type", "I");

    // Create task item
    for (let i = 0; i < projectTasks.length; i++) {
        let task = projectTasks[i];
        const taskItem = document.createElement("li");
        taskItem.id=i;
        taskItem.classList.add("task");

        if (task.status) {
            taskItem.classList.add("task-done");
        }


        // Create task text
        const taskText = document.createElement("div");
        taskText.classList.add("task_txt");
        taskText.textContent = (i + 1) + ". " + task.task_info;

        // Create task status
        const taskStatus = document.createElement("div");
        taskStatus.classList.add("task_status");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.id = i;
        checkbox.checked = task.status;
        checkbox.setAttribute("type", "checkbox");
        checkbox.addEventListener("change", (e) => {
            let index = e.target.closest(".projectContainer").id;
            toggleTask(index, e.target.id);
            ShowProject(getData(index), index);
        });

        // Create status text
        const statusText = document.createTextNode(":DONE");

        // Create Edit Button
        const editBtn = document.createElement("button");
        editBtn.classList.add("editBtn");
        editBtn.textContent = "EDIT";
        editBtn.addEventListener("click",e=>{
            let taskIndex=e.target.parentNode.parentNode.id
            let index = e.target.closest(".projectContainer").id
            let tasks = e.target.closest(".tasks-list");
            let currentTask = tasks.childNodes[taskIndex].childNodes[0].innerHTML.slice(2,)
         
            let li = get_updatable_list(index,taskIndex,currentTask)

            tasks.childNodes[taskIndex].innerHTML = ""
            tasks.childNodes[taskIndex].appendChild(li)

        })

        //Create Delete Button
        const dltBtn = document.createElement("button");
        dltBtn.classList.add("dltBtn");
        dltBtn.textContent = "DELETE";
        dltBtn.addEventListener("click",e=>{
            if(!confirm("are you sure you want to delete this task?")){
                return
            }
            let taskIndex=e.target.parentNode.parentNode.id
            let index = e.target.closest(".projectContainer").id
            deleteTask(index,taskIndex)
            ShowProject(getData(index),index)

        })


        // Append checkbox and status text to task status
        taskStatus.appendChild(checkbox);
        taskStatus.appendChild(statusText);
        taskStatus.appendChild(editBtn);
        taskStatus.appendChild(dltBtn);

        // Append task text and task status to task item
        taskItem.appendChild(taskText);
        taskItem.appendChild(taskStatus);

        // Append task item to tasks list
        tasksList.appendChild(taskItem);

    }

    tasks.appendChild(tasksList);

    const newTaskDiv = document.createElement('div');
    newTaskDiv.classList.add('newTask');

    // Create the button element
    const addButton = document.createElement('button');
    addButton.textContent = '+ New Task';

    addButton.addEventListener("click", (e) => {

        if(document.querySelector(".editableTask")){
            window.alert("please complete adding previous task");
            return;
        }

        let tasks = e.target.parentNode.parentNode.childNodes[0].childNodes[3].childNodes[0];
        let index =  e.target.parentNode.parentNode.childNodes[0].id;
        let li = get_editable_list(index);

        tasks.appendChild(li)
    });

    // Append the button to the div
    newTaskDiv.appendChild(addButton);

    // Append elements to project container
    projectContainer.appendChild(projectHead);
    projectContainer.appendChild(hr);
    projectContainer.appendChild(headTasks);
    projectContainer.appendChild(tasks);

   
    mainDiv.appendChild(projectContainer);
    mainDiv.appendChild(newTaskDiv);

    // Append project container to body or any other desired element
    return mainDiv;

}
