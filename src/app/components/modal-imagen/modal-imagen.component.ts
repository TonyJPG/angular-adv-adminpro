import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modal-imagen",
  templateUrl: "./modal-imagen.component.html",
  styles: [],
})
export class ModalImagenComponent implements OnInit {
  public ocultarModal = false;

  constructor() {}

  ngOnInit(): void {}

  cerrarModal(): void {
    this.ocultarModal = true;
  }
}
