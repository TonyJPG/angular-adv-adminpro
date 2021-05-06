import { Injectable, NgZone } from "@angular/core";
import { environment } from "../../environments/environment";

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

import { RegisterForm } from "../interfaces/register-form.interface";
import { LoginForm } from "../interfaces/login-form.interface";

const base_url = environment.base_url;
// declare specifies a type to an already existing variable, not declaring a new one
declare const gapi: any;

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  googleInit(): void {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "420301587989-lg9dopd325p47ta9ruonn81f82jq95ik.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
      });
    });
  }

  logout(): void {
    localStorage.removeItem("token");

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("/login");
      });
    });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem("token") || "";

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          "x-token": token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem("token", resp.token);
        }),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm): Observable<any> {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem("token", resp.token);
      })
    );
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem("token", resp.token);
      })
    );
  }

  loginGoogle(token: string): Observable<any> {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem("token", resp.token);
      })
    );
  }
}
