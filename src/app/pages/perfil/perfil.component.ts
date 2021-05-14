import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: ["123", Validators.required],
      email: ["1234", [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(): void {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
