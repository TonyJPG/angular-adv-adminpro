import { Injectable, NgZone } from "@angular/core";
import { environment } from "../../environments/environment";

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

import { RegisterForm } from "../interfaces/register-form.interface";
import { LoginForm } from "../interfaces/login-form.interface";
import { Usuario } from "../models/usuario.model";

const base_url = environment.base_url;
// declare specifies a type to an already existing variable, not declaring a new one
declare const gapi: any;

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  public auth2: any;
  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  googleInit(): Promise<any> {
    return new Promise<void>((resolve) => {
      console.log("Google Init Promise!");

      gapi.load("auth2", () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            "420301587989-lg9dopd325p47ta9ruonn81f82jq95ik.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
        });

        resolve();
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
        map((resp: any) => {
          const { nombre, email, img = "", google, role, uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, "", img, google, role, uid);
          localStorage.setItem("token", resp.token);
          return true;
        }),
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
