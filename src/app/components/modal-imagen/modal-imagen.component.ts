import { Component, ElementRef, ViewChild } from "@angular/core";

import Swal from "sweetalert2";

import { ModalImagenService } from "../../services/modal-imagen.service";
import { FileUploadService } from "../../services/file-upload.service";
import { UsuarioService } from "../../services/usuario.service";

import { Usuario } from "../../models/usuario.model";

@Component({
  selector: "app-modal-imagen",
  templateUrl: "./modal-imagen.component.html",
  styles: [],
})
export class ModalImagenComponent {
  public imagenSubir!: File;
  public imgTemp: any = null;
  public usuario: Usuario;
  private fileSelectorClicked = false;

  @ViewChild("inputFile") myInputVariable!: ElementRef;
  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService,
    private usuarioService: UsuarioService
  ) {
    this.usuario = usuarioService.usuario;
  }

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

  subirImagen(): void {
    const tipo = this.modalImagenService.tipo || "";
    let tipoSingular = "";
    const id = this.modalImagenService.id;

    // para saber si decir IMAGEN DE "USUARIO" O "HOSPITAL" O "MEDICO" cambiada
    if (tipo.endsWith("es")) {
      tipoSingular = "hospital";
    } else {
      tipoSingular = tipo.slice(0, tipo.length - 1);
    }

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((imgUrl) => {
        Swal.fire({
          text: `Imagen de ${tipoSingular} cambiada!`,
          icon: "success",
        });
        // si cambió la img de nuestro usuario
        if (tipo === "usuarios" && id === this.usuario.uid) {
          this.usuario.img = imgUrl;
        }
        this.modalImagenService.nuevaImagen.emit(imgUrl);
        this.cerrarModal();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar la imagen...",
          icon: "error",
        });
      });
  }
}

// TODO revisar al reabrir un modal la url de imagen queda guardada,
// con darle al boton se cambia la imagen, con la selección previa
// y con pagina nueva, al intentar cambiar la imagen sin elegirla, sale un swal exitoso
