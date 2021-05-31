import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ModalImagenService {
  // tslint:disable-next-line: variable-name
  private _ocultarModal = true;

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  abrirModal(): void {
    this._ocultarModal = false;
  }

  cerrarModal(): void {
    this._ocultarModal = true;
  }

  constructor() {}
}
