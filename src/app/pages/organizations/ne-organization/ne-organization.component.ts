import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';

@Component({
  selector: 'app-ne-organization',
  templateUrl: './ne-organization.component.html',
  styleUrls: ['./ne-organization.component.scss']
})
export class NeOrganizationComponent {
  organizationForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _organizationService: OrganizationsService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data?: any,
  ) { }

  ngOnInit(): void {
    this.constructorForm();
  }

  constructorForm() {
    this.organizationForm = this.fb.group({
      title: [this.data ? this.data.title : '', [Validators.required, Validators.minLength(5)]],
      description: [this.data ? this.data.description : '']
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (!this.organizationForm.valid) {
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
      let dataOrganization = {
        title: this.organizationForm.get('title')?.value,
        description: this.organizationForm.get('description')?.value,
      }
      if (this.data?.id) {
        this._organizationService.updateOrganization(this.data?.id, dataOrganization).subscribe({
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
        this._organizationService.createOrganization(dataOrganization).subscribe({
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
