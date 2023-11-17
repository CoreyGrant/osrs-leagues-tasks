export class DataService{
    personalTasks = [];
    completeTasks = [];
    constructor(){
        var item = window.localStorage.getItem('personal-tasks');
        var complete = window.localStorage.getItem('complete-tasks');
        this.personalTasks = item ? JSON.parse(item) : [];
        this.completeTasks = complete ? JSON.parse(complete) : [];
    }
    getTasks(){
        return window.tasks;
    }
    getPersonalTasks(){
        return this.personalTasks;
    }
    getCompleteTasks(){
        return this.completeTasks;
    }
    toggleCompleteTask(task){
        var existing = this.completeTasks.find(x => x.name === task.name);
        if(existing){
            task.complete = false;
            this.completeTasks = this.completeTasks.filter(x => x.name !== task.name);
        } else{
            task.complete = true;
            this.completeTasks.push(task);
        }
        window.localStorage.setItem('complete-tasks', JSON.stringify(this.completeTasks));
    }
    togglePersonalTask(task){
        var existing = this.personalTasks.find(x => x.name === task.name);
        if(existing){
            task.personal = false;
            this.personalTasks = this.personalTasks.filter(x => x.name !== task.name);
        } else {
            task.personal = true;
            this.personalTasks.push({...task});
        }
        window.localStorage.setItem('personal-tasks', JSON.stringify(this.personalTasks));
    }
}