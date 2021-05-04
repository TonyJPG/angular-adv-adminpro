import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";

import { UsuarioService } from "../../services/usuario.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem("email") || "",
      [Validators.required, Validators.email],
    ],
    password: ["", Validators.required],
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
      next: (resp: Observable<any>) => {
        console.log("Se ha logeado el usuario!");
        if (this.loginForm.get("remember")?.value) {
          localStorage.setItem("email", this.loginForm.get("email")?.value);
        } else {
          localStorage.removeItem("email");
        }
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
