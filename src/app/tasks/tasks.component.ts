import { Component, OnInit } from '@angular/core';
import {Task} from '../model/task';
import {TASKS} from '../model/mock_tasks';
import { FormControl} from '@angular/forms';
import {ToDoListService} from '../service/toDoList.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks = [];
  selectedTask: Task;
  selectedValue: string;
  states: string[] = ['Pending', 'Finished', 'In course'];
  newTaskData = {
    show: false,
    control: new FormControl('')
  };

  constructor(private todolist : ToDoListService) { }

  ngOnInit() {
    this.getAlltasks();
  }
  onSelect(task: Task): void {
    this.selectedTask = task;
  }
  public updateTask(idx) {
    const taskToUpdate = this.tasks[idx];
    if (taskToUpdate) {
      this.updTask(taskToUpdate.id,taskToUpdate)
      console.log('Updating task', taskToUpdate);
      
      //TODO Update Task
      
    }
  }
  public getAlltasks(){
    this.todolist.getTask().subscribe( (tasks) => {
      this.tasks = tasks
    })
  }
  public delTask(idx){
    console.log(this.tasks[idx-1].id);
    this.todolist.delTask(this.tasks[idx-1].id).subscribe((res) =>{
    console.log(res);  
    this.getAlltasks()});
  }
  public addTask(tarea:Task){
    this.todolist.addTask(tarea).subscribe((res) =>{
      console.log(res);  
      this.getAlltasks()
    })

  }
  public updTask(idx,tarea:Task){
    console.log(idx,tarea)
    this.todolist.updateTask(tarea,idx).subscribe((res)=>{
      console.log(res);
      this.getAlltasks();
      
    })

  }
public createTask() {
    const newTask = {
      
      estado: 'Pending',
      descripcion: this.newTaskData.control.value
    }
    console.log('Creating task', newTask);
    //TODO: Add task
    this.newTaskData.show = false;
    this.newTaskData.control.setValue('');
    this.addTask(newTask)
    console.log('Tarea creada con exito');
  }

  public cancelNewTask() {
    this.newTaskData.show = false;
    this.newTaskData.control.setValue('');
  }

  public newTask() {
    this.newTaskData.show = true;
    this.newTaskData.control.setValue('');
  }

}
