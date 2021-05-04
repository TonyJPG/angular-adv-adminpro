import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";

import { UsuarioService } from "../../services/usuario.service";
import { Observable } from "rxjs";

// declare specifies a type to an already existing variable, not declaring a new one
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
    this.renderButton();
  }

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

  onSuccess(googleUser: any): void {
    console.log("Logged in as: " + googleUser.getBasicProfile().getName());
    const id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }

  onFailure(error: any): void {
    console.log(error);
  }

  renderButton(): void {
    gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: this.onSuccess,
      onfailure: this.onFailure,
    });
  }
}
