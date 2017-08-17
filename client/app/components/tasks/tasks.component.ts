import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../shared/services/task.service';
import {Task} from '../../shared/model/Task';
@Component({
  // moduleId:module.id,    //in order to use relative path
  selector:'my-tasks',
  templateUrl:'./app/components/tasks/tasks.component.html'
})

export class TasksComponent implements OnInit{
  tasks:Task[]; 
  title:string;

  constructor(private taskService:TaskService){}
 
  ngOnInit(){
    console.log('from task compo');
    this.taskService.getTasks()
      .subscribe(tasks => {
        console.log(tasks);
        this.tasks = tasks;
      });
  }

  addTask(event){
    event.preventDefault();
    // console.log(this.title);
    var newTask={
      title:this.title,
      isDone:false
    }

    // this.tasks.push(newTask);    //this will push the new task to page but not to db, if i refresh ill fly away like pssstttt.........
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title='';    //to clear forms
      });
  }

  deleteTask(id){
    var tasks=this.tasks;
    this.taskService.deleteTask(id).subscribe(data=>{
      if(data.n==1){
        for(var i=0;i<tasks.length;i++){
          if(tasks[i]._id == id){
            tasks.splice(i,1);
          }
        }
      }
    });
  }

  updateStatus(task){
    var _task={
      _id:task._id,
      title:task.title,
      isDone: !task.isDone
    };
    this.taskService.updateStatus(_task).subscribe(data =>{
      task.isDone= !task.isDone;
    });
  }
}