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

  cargarMedicos(): Observable<any> {
    const url = `${base_url}/medicos`;
    return this.http
      .get<CargarMedico>(url, this.headers)
      .pipe(map((resp) => resp.medicos));
  }

  crearMedico(medico: Medico): Observable<any> {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);
  }

  actualizarMedico(medico: Medico): Observable<any> {
    const url = `${base_url}/medicos/${medico.mid}`;
    return this.http.put(url, medico, this.headers);
  }

  borrarMedico(mid: string): Observable<any> {
    const url = `${base_url}/medicos/${mid}`;
    return this.http.delete(url, this.headers);
  }
}
