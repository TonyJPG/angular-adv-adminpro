import { Component, NgZone, OnInit } from "@angular/core";
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
  public auth2: any;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem("email") || "",
      [Validators.required, Validators.email],
    ],
    password: ["", Validators.required],
    remember: [localStorage.getItem("email") ? true : false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
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

        // redirije al Dashboard
        this.router.navigateByUrl("/");
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
  }

  renderButton(): void {
    gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
    });

    this.startApp();
  }

  async startApp(): Promise<void> {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById("my-signin2"));
  }

  attachSignin(element: HTMLElement | null): void {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // tslint:disable-next-line: deprecation
        this.usuarioService.loginGoogle(id_token).subscribe(() => {
          // redirije al Dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl("/");
          });
        });
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
