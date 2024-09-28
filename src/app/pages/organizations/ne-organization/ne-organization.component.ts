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
  typeOrganizations = [
    { id: "P", name: "Pri" },
    { id: "C", name: "Cri" },
  ];
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
      name: [this.data ? this.data.name : '', [Validators.required]],
      contactPerson: [this.data ? this.data.contactPerson : '', [Validators.required]],
      contactEmail: [this.data ? this.data.contactEmail : '', [Validators.required, Validators.email]],
      phone: [this.data ? this.data.phone : '', [Validators.required]],
      address: [this.data ? this.data.address : '', [Validators.required]],
      type: [this.data ? this.data.type : '', [Validators.required]]
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
      name: this.organizationForm.get('name')?.value,
      contactPerson: this.organizationForm.get('contactPerson')?.value,
      contactEmail: this.organizationForm.get('contactEmail')?.value,
      phone: this.organizationForm.get('phone')?.value,
      address: this.organizationForm.get('address')?.value,
      type: this.organizationForm.get('type')?.value
    }

    if (this.data?.id) {
      this._organizationService.updateOrganization(this.data?.id, dataOrganization).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: "Organizaciones",
            text: "Se ha actualizado exitosamente la organización",
            icon: 'success',
            confirmButtonText: 'Ok',
            showConfirmButton: true,
            showDenyButton: false
          }).then((result) => {
            this.close();
          });
        },
        error: (err: any) => {
          Swal.fire({
            title: "Organizaciones",
            text: "No se puedo actualizar la organización",
            icon: 'info',
            confirmButtonText: 'Ok',
            showConfirmButton: true,
            showDenyButton: false
          }).then((result) => {
            this.close();
          });
        }
      })
    } else {
      this._organizationService.createOrganization(dataOrganization).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: "Organizaciones",
            text: "Se ha creado exitosamente la organización",
            icon: 'success',
            confirmButtonText: 'Ok',
            showConfirmButton: true,
            showDenyButton: false
          }).then((result) => {
            this.close();
          });
        },
        error: (err: any) => {
          Swal.fire({
            title: "Organizaciones",
            text: "No se puedo crear la organización",
            icon: 'info',
            confirmButtonText: 'Ok',
            showConfirmButton: true,
            showDenyButton: false
          }).then((result) => {
            this.close();
          });
        }
      })
    }
  }
}
