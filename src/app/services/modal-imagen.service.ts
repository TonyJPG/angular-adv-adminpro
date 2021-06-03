import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class ModalImagenService {
  // tslint:disable-next-line: variable-name
  private _ocultarModal = true;
  public tipo = "";
  public id: string | undefined = "";
  public img = "";

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: "usuarios" | "hospitales" | "medicos",
    id: string | undefined,
    img: string = "no-img"
  ): void {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if (img.includes("https")) {
      this.img = img;
    } else {
      // localhost:3000/api/upload/usuarios/no-img
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal(): void {
    this._ocultarModal = true;
  }

  constructor() {}
}
