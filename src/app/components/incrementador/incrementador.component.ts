import { Component } from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: [],
})
export class IncrementadorComponent {
  progreso = 90;

  get getPorcentaje(): string {
    return `${this.progreso}%`;
  }

  cambiarValor(valor: number): void {
    this.progreso += valor;

    if (this.progreso > 100) {
      this.progreso = 100;
      return;
    }

    if (this.progreso < 0) {
      this.progreso = 0;
      return;
    }
  }
}
