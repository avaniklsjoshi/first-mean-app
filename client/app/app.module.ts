import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http'
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {TaskService} from './shared/services/task.service';
import 'rxjs/add/operator/map';

@NgModule({
  imports:[BrowserModule, FormsModule, HttpModule],
  declarations:[AppComponent, TasksComponent],
  providers:[TaskService],
  bootstrap:[AppComponent]
})

export class AppModule{}