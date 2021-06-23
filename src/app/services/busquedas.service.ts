import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

import { Usuario } from "../models/usuario.model";
import { Medico } from "../models/medico.model";
import { Hospital } from "../models/hospital.model";

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get headers(): object {
    return { headers: { "x-token": this.token } };
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map((user) => {
      return new Usuario(
        user.nombre,
        user.email,
        "",
        user.img,
        user.google,
        user.role,
        user.uid
      );
    });
  }

  buscar(
    tipo: "usuarios" | "hospitales" | "medicos",
    termino: string = ""
  ): any {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case "usuarios":
            return this.transformarUsuarios(resp.resultado);

          default:
            return resp.resultado;
        }
      })
    );
  }

  busquedaGlobal(termino: string = ""): any {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<{
      ok: boolean;
      usuarios: Usuario[];
      medicos: Medico[];
      hospitales: Hospital[];
    }>(url, this.headers);
  }
}
