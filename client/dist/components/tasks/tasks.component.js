"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var task_service_1 = require("../../shared/services/task.service");
var TasksComponent = (function () {
    function TasksComponent(taskService) {
        this.taskService = taskService;
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('from task compo');
        this.taskService.getTasks()
            .subscribe(function (tasks) {
            console.log(tasks);
            _this.tasks = tasks;
        });
    };
    TasksComponent.prototype.addTask = function (event) {
        var _this = this;
        event.preventDefault();
        // console.log(this.title);
        var newTask = {
            title: this.title,
            isDone: false
        };
        // this.tasks.push(newTask);    //this will push the new task to page but not to db, if i refresh ill fly away like pssstttt.........
        this.taskService.addTask(newTask)
            .subscribe(function (task) {
            _this.tasks.push(task);
            _this.title = ''; //to clear forms
        });
    };
    TasksComponent.prototype.deleteTask = function (id) {
        var tasks = this.tasks;
        this.taskService.deleteTask(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    };
    TasksComponent.prototype.updateStatus = function (task) {
        var _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };
        this.taskService.updateStatus(_task).subscribe(function (data) {
            task.isDone = !task.isDone;
        });
    };
    TasksComponent = __decorate([
        core_1.Component({
            // moduleId:module.id,    //in order to use relative path
            selector: 'my-tasks',
            templateUrl: './app/components/tasks/tasks.component.html'
        }),
        __metadata("design:paramtypes", [task_service_1.TaskService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map