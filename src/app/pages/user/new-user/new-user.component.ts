import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { sha256 } from 'js-sha256';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  registerForm!: FormGroup;
  typePassword = "password";
  typePassword2 = "password";
  edit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data?: any,
  ) { }

  ngOnInit(): void {
    this.constructorForm();
  }

  constructorForm() {
    this.registerForm = this.fb.group({
      identification: [this.data ? this.data.identification : '', [Validators.required, Validators.minLength(7)]],
      name: [this.data ? this.data.name : '', Validators.required],
      lastName: [this.data ? this.data.lastName : '', Validators.required],
      email: [this.data ? this.data.email : '', [Validators.required, Validators.email]],
    })
  }

  save() {
    if (!this.registerForm.valid) {
      Swal.fire({
        title: "Usuarios",
        text: "Datos incorrectos.",
        icon: 'warning',
        confirmButtonText: 'Cerrar',
        showConfirmButton: true,
        showDenyButton: false
      })
      return
    }

    const dataUser = {
      identification: this.registerForm.get('identification')?.value,
      name: this.registerForm.get('name')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
    }
    this._userService.updateUser(this.data?.id, dataUser).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Usuarios",
          text: "Se ha actualizado exitosamente el usuario",
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then((result) => {
          this.close()
        });
      },
      error: () => {
        Swal.fire({
          title: "Registro",
          text: "Ocurrió un error, intente nuevamente.",
          icon: 'info',
          confirmButtonText: 'Cerrar',
          showConfirmButton: true,
          showDenyButton: false
        }).then((result) => {
          this.close
        })
      }
    })
  }

  seePassword() {
    this.typePassword = (this.typePassword == "password") ? "text" : "password";
  }
  seePassword2() {
    this.typePassword2 = (this.typePassword2 == "password") ? "text" : "password";
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  close() {
    this.dialogRef.close();
  }
}
