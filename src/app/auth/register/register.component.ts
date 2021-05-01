import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ["Tony", Validators.required],
    email: ["test100@gmail.com", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    password2: ["", Validators.required],
    terminos: [false, Validators.requiredTrue],
  });

  constructor(private fb: FormBuilder) {}

  crearUsuario(): void {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      console.log("Posteando formulario!");
    } else {
      console.log("Formulario no es correcto...");
    }
  }

  // funcion para mostrar errores de "campo requerido" en el HTML con un ngIf
  campoNoValido(campo: string): boolean {
    // if ( this.registerForm.get(campo)?.invalid && this.formSubmitted ) {
    //   return true;
    // } else {
    //   return false;
    // }

    return this.registerForm.get(campo)?.invalid && this.formSubmitted
      ? true
      : false;
  }

  // funcion para mostrar errores de "campo requerido" en el HTML con un ngIf
  aceptaTerminos(): boolean {
    return !this.registerForm.get("terminos")?.value && this.formSubmitted;
  }

  contrasenasNoValidas(): boolean {
    // const pass1 = this.registerForm.get("password")?.value;
    // const pass2 = this.registerForm.get("password2")?.value;

    return (
      !(
        this.registerForm.get("password")?.value ===
        this.registerForm.get("password2")?.value
      ) &&
      this.formSubmitted &&
      this.registerForm.get("password")?.value.length === 0
    );
  }
}
