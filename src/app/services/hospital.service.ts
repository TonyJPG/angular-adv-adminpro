import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { CargarHospital } from "../interfaces/cargar-hospital.interface";

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get headers(): object {
    return { headers: { "x-token": this.token } };
  }

  cargarHospitales(desde: number = 0): Observable<any> {
    const url = `${base_url}/hospitales?desde=${desde}`;
    return this.http.get<CargarHospital>(url, this.headers).pipe(
      map((resp) => {
        return {
          hospitales: resp.hospitales,
          total: resp.total,
        };
      })
    );
  }

  crearHospital(nombre: string): Observable<any> {
    const url = `${base_url}/hospitales`;
    return this.http.post(url, { nombre }, this.headers);
  }

  actualizarHospital(hid: string, nombre: string): Observable<any> {
    const url = `${base_url}/hospitales/${hid}`;
    return this.http.put(url, { nombre }, this.headers);
  }

  borrarHospital(hid: string): Observable<any> {
    const url = `${base_url}/hospitales/${hid}`;
    return this.http.delete(url, this.headers);
  }
}
