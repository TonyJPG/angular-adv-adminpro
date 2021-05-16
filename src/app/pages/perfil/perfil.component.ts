import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";

import { UsuarioService } from "../../services/usuario.service";
import { FileUploadService } from "../../services/file-upload.service";

import { Usuario } from "../../models/usuario.model";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(): void {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe({
      next: () => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire({
          text: "Los cambios fueron guardados!",
          icon: "success",
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          title: `Error ${err.status}`,
          text: err.error.msg,
          icon: "error",
        });
      },
    });
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
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, "usuarios", this.usuario.uid)
      .then((imgUrl) => {
        this.usuario.img = imgUrl;
        Swal.fire({
          text: "Imagen de usuario cambiada!",
          icon: "success",
        });
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
