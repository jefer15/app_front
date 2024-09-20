import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-ne-task',
  templateUrl: './ne-task.component.html',
  styleUrls: ['./ne-task.component.scss']
})
export class NeTaskComponent implements OnInit {

  taskForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _taskService: TasksService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data?: any,
  ) { }

  ngOnInit(): void {
    this.constructorForm();
  }

  constructorForm() {
    this.taskForm = this.fb.group({
      title: [this.data ? this.data.title : '', [Validators.required, Validators.minLength(5)]],
      description: [this.data ? this.data.description : '']
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (!this.taskForm.valid) {
      Swal.fire({
        title: "Tarea",
        text: "Datos incorrectos.",
        icon: 'warning',
        confirmButtonText: 'Cerrar',
        showConfirmButton: true,
        showDenyButton: false
      })
      return
    }
      let dataTask = {
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
      }
      if (this.data?.id) {
        this._taskService.updateTasks(this.data?.id, dataTask).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: "Tarea",
              text: "Se ha actualizado exitosamente la tarea",
              icon: 'success',
              confirmButtonText: 'Ok',
              showConfirmButton: true,
              showDenyButton: false
            }).then((result) => {
              this.close();
            });
          },
          error: (err: any) => {
            if (err.error.code === 3) {
              Swal.fire({
                title: "Tarea",
                text: "No se puedo actualizar la tarea porque el nombre ya existe",
                icon: 'info',
                confirmButtonText: 'Ok',
                showConfirmButton: true,
                showDenyButton: false
              }).then((result) => {
                this.close();
              });
            }
          }
        })
      } else {
        this._taskService.createTasks(dataTask).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: "Tarea",
              text: "Se ha creado exitosamente la tarea",
              icon: 'success',
              confirmButtonText: 'Ok',
              showConfirmButton: true,
              showDenyButton: false
            }).then((result) => {
              this.close();
            });
          },
          error: (err: any) => {
            if (err.error.code === 3) {
              Swal.fire({
                title: "Tarea",
                text: "No se puedo crear la tarea porque el nombre ya existe",
                icon: 'info',
                confirmButtonText: 'Ok',
                showConfirmButton: true,
                showDenyButton: false
              }).then((result) => {
                this.close();
              });
            }
          }
        })
      }

  }
}
