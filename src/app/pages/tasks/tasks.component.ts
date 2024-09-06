import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{

  constructor(
    private _tasksService: TasksService
  ){}
  ngOnInit(): void {
    this._tasksService.tasks().subscribe({
      next:(res:any)=>{
        console.log(res)
      }
    })
  }

}
