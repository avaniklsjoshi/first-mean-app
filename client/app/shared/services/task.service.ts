import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class TaskService{
  constructor(private http:Http){
    console.log('Task service initialized...');
  }

  getTasks(){
    return this.http.get('http://localhost:3000/api/tasks')
      .map(res => res.json());
  }

  addTask(newTask){
    
  }
}