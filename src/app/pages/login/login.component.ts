import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  typePassword = "password";

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
  ){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      identification: ['', [Validators.required, Validators.minLength(7)]],
      password: ['', Validators.required]
    })
  }

  register(){
    this.router.navigate(['/register'])
  }

  seePassword() {
    this.typePassword = (this.typePassword == "password") ? "text" : "password";
  }

  login(){
    const data = {
      identification:this.loginForm.get('identification')?.value,
      password:this.loginForm.get('password')?.value
    }

    this._loginService.login(data).subscribe({
      next: (res:any)=>{
        if(res.code == 3) {
          Swal.fire({
            title: "Error en la autenticación",
            text: "Datos incorrectos o Usuario no existente",
            icon: 'warning',
            confirmButtonText: 'Cerrar',
            showConfirmButton: true,
            showDenyButton: false
          })
        } else {
          Swal.fire({
            title: "Login Exitoso",
            text: "A continuación entrará a la plataforma",
            icon: 'success',
            confirmButtonText: 'Ok',
            showConfirmButton: true,
            showDenyButton: false
          }).then((result) => {
            this.router.navigate([''])
          });
        }
      },
      error:()=>{
      }
    })
  }
}
