import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { sha256 } from 'js-sha256';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  typePassword = "password";
  typePassword2 = "password";

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      identification: ['',  [Validators.required, Validators.minLength(7)]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  register() {
    if (!this.registerForm.valid) {
      Swal.fire({
        title: "Registro",
        text: "Datos incorrectos.",
        icon: 'warning',
        confirmButtonText: 'Cerrar',
        showConfirmButton: true,
        showDenyButton: false
      })
      return
    }

    const hashedPassword = sha256.update(this.registerForm.get('password')?.value).hex();
    const data = {
      identification:this.registerForm.get('identification')?.value,
      name:this.registerForm.get('name')?.value,
      lastName:this.registerForm.get('lastName')?.value,
      email:this.registerForm.get('email')?.value,
      password:hashedPassword
    }

    this._userService.register(data).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: "Registro Exitoso",
          text: "A continuación podrá loguearse.",
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then((result) => {
          this.login()
        });
      }, error:()=>{
        Swal.fire({
          title: "Registro",
          text: "Ocurrió un error, intente nuevamente.",
          icon: 'info',
          confirmButtonText: 'Cerrar',
          showConfirmButton: true,
          showDenyButton: false
        })
      }
    })

  }

  login() {
    this.router.navigate(['/login'])
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
}
