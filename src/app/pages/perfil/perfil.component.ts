import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cambiarImagen(event: any): void {
    console.log(event.target.files[0]);
    this.imagenSubir = event.target.files[0];
  }

  subirImagen(): void {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, "usuarios", this.usuario.uid)
      .then((resp) => {
        console.log(resp);
        console.log("hecho");
      });
  }
}
