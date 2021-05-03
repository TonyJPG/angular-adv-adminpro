import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { RegisterForm } from "../interfaces/register-form.interface";

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  crearUsuario(formData: RegisterForm): Observable<object> {
    return this.http.post(`${base_url}/usuarios`, formData);
  }
}
