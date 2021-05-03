import { Component } from "@angular/core";
import {
  AbstractControlOptions,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";

import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ["Tony", Validators.required],
      email: ["test100@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", Validators.required],
      password2: ["123456", Validators.required],
      terminos: [true, Validators.requiredTrue],
    },
    {
      validators: this.passwordsIguales("password", "password2"),
    } as AbstractControlOptions
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  crearUsuario(): void {
    this.formSubmitted = true;
    console.log(this.registerForm);

    if (this.registerForm.invalid) {
      return;
    }

    // realiza el posteo si el formulario es válido
    // tslint:disable-next-line: deprecation
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
      next: (resp: object) => {
        console.log("Se ha registrado el usuario!");
        console.log(resp);
      },
      error: (err) => {
        // si sucede un error
        console.warn(err.error.msg);
        Swal.fire({
          title: "Error!",
          text: err.error.msg,
          icon: "error",
        });
      },
    });
  }

  // funcion para mostrar errores de "campo requerido" en el HTML con un ngIf
  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  // funcion para mostrar errores de "campo requerido" en el HTML con un ngIf
  aceptaTerminos(): boolean {
    return !this.registerForm.get("terminos")?.value && this.formSubmitted;
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get("password")?.value;
    const pass2 = this.registerForm.get("password2")?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string): object {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}
