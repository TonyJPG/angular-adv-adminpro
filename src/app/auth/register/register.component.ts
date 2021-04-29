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
    nombre: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
    password2: ["", Validators.required],
    terminos: [false, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  crearUsuario(): void {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
  }

  campoNoValido(campo: string): boolean {
    // if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
    //   return true;
    // } else {
    //   return false;
    // }
    return this.registerForm.get(campo)?.invalid && this.formSubmitted
      ? true
      : false;
  }
}
