import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @Input() progreso = 90;
  @Input() btnClass = "btn-primary";

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number): void {
    this.progreso += valor;

    if (this.progreso > 100) {
      this.valorSalida.emit(100);
      this.progreso = 100;
      return;
    }

    if (this.progreso < 0) {
      this.valorSalida.emit(0);
      this.progreso = 0;
      return;
    }

    this.valorSalida.emit(this.progreso);
  }
}
