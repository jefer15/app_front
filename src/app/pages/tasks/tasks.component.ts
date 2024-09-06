import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import { NeTaskComponent } from './ne-task/ne-task.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _tasksService: TasksService,
    private _dialog: MatDialog,
  ){}
  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this._tasksService.tasks().subscribe({
      next:(res:any)=>{
        this.dataSource.data = res.data;
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addTask(){
    const dialogRef = this._dialog.open(NeTaskComponent, {
      width: "80%",
      height: "85%",
      maxWidth: "80%",
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getData();
    });
  }
  editTask(row: any) {
    const dialogRef = this._dialog.open(NeTaskComponent, {
      width: "80%",
      height: "85%",
      maxWidth: "80%",
      data:row
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getData();
    });
  }

  deleteTask(row: any) {
    this._tasksService.deleteTasks(row.id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Tarea",
          text: "Se ha eliminado exitosamente la tarea",
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then((result) => {
          this.getData();
        });
      },
      error: (err: any) => {
        Swal.fire({
          title: "Tarea",
          text: "No se eliminó ninguna tarea, puede que no exista o esté en estado Pendiente",
          icon: 'error',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then((result) => {
          this.getData();
        });
      },
    });
  }


  updadeStateTask(row:any){
    const data = {status: 'C'}
    this._tasksService.updateStatusTasks(row.id, data).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: "Tarea",
          text: "Se ha completado exitosamente la tarea",
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then((result) => {
          this.getData();
        });
      }
    })
  }



}
