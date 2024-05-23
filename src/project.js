 class Project{
    constructor(name,due_date,tasks=[]){
        this.name=name;
        this.due_date=due_date;
        this.tasks=tasks;
    }

    get_projectInfo(){
        return [this.name,this.due_date,this.tasks]
    }
    add_task(task){
        task={
            task_info:task,
            status:false
        };
        this.tasks.push(task)
    }
    update_task(index,newtask){
        this.tasks[index].task_info=newtask
    }
    delete_task(index){
        this.tasks.splice(index,1);
    }
    get_task(){
        return this.tasks;
    }
    task_toggle(i){
        this.tasks[i].status=!this.tasks[i].status
    }
}
export default Project