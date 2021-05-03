import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";

import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: ["test100@gmail.com", [Validators.required, Validators.email]],
    password: ["123456", Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  login(): void {
    // tslint:disable-next-line: deprecation
    this.usuarioService.login(this.loginForm.value).subscribe({
      next: (resp: object) => {
        console.log("Se ha logeado el usuario!");
        console.log(resp);
      },
      error: (err) => {
        console.warn(err.error.msg);
        Swal.fire({
          title: "Error!",
          text: err.error.msg,
          icon: "error",
        });
      },
    });

    console.log(this.loginForm.value);
    // this.router.navigateByUrl("/");
  }
}
