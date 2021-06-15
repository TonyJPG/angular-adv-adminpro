import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { CargarMedico } from "../interfaces/cargar-medico.interface";
import { Medico } from "../models/medico.model";

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class MedicoService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get headers(): object {
    return { headers: { "x-token": this.token } };
  }
  // TODO fix el tipado aca (medico vs cargarmedico vs etc)
  cargarMedicos(): Observable<any> {
    const url = `${base_url}/medicos`;
    return this.http
      .get<Medico[]>(url, this.headers)
      .pipe(map((resp: Medico[]) => console.log(resp)));
  }

  crearMedico(nombre: string): Observable<any> {
    const url = `${base_url}/medicos`;
    return this.http.post(url, { nombre }, this.headers);
  }

  actualizarMedico(mid: string, nombre: string): Observable<any> {
    const url = `${base_url}/medicos/${mid}`;
    return this.http.put(url, { nombre }, this.headers);
  }

  borrarMedico(mid: string): Observable<any> {
    const url = `${base_url}/medicos/${mid}`;
    return this.http.delete(url, this.headers);
  }
}
