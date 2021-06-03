import { Component, ElementRef, ViewChild } from "@angular/core";
import { ModalImagenService } from "../../services/modal-imagen.service";

@Component({
  selector: "app-modal-imagen",
  templateUrl: "./modal-imagen.component.html",
  styles: [],
})
export class ModalImagenComponent {
  public imagenSubir!: File;
  public imgTemp: any = null;

  @ViewChild("inputFile") myInputVariable!: ElementRef;
  constructor(public modalImagenService: ModalImagenService) {}

  cerrarModal(): void {
    this.imgTemp = null;
    this.myInputVariable.nativeElement.value = "";
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: any): void {
    const imagen = file.target.files[0];
    this.imagenSubir = imagen;

    if (!imagen) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imagen);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }
}
