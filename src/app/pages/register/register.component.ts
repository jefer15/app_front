import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Usuario } from 'src/app/models/usuario';
// import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  register: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    // private usuarioService: UsuarioService,
    private router: Router,
    // private toastR: ToastrService
  ) {
    this.register = this.fb.group(
      {
        usuario: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: [''],
      },
      { validators: this.checkPassword }
    );
  }

  //Metodo registrar usuario
  registrarUsuario(): void {
    console.log(this.register);

    // const usuario: Usuario = {
    //   nombreUsuario: this.register.value.usuario,
    //   password: this.register.value.password,
    // };

    this.loading = true;

    // this.usuarioService.saveUser(usuario).subscribe((data) => {
    //   console.log(data);
    //   this.toastR.success("El usuario "+ usuario.nombreUsuario +" fue registrado con éxito", "Usuario registrado");
    //   this.router.navigate(['/inicio/login']);
    //   this.loading = false;
    // }, error => {
    //   this.loading = false;
    //   console.log(error);
    //   this.toastR.error(error.error.message, "Error registrar usuario!");
    //   this.register.reset();
    // });
  }

  //Metodo confirmar password
  checkPassword(group: FormGroup): any {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
