import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../../services/usuario.service";
import { Usuario } from "../../../models/usuario.model";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: [],
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public desde = 0;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.cargarUsuarios(this.desde).subscribe({
      next: ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cambiarPagina(value: number): void {
    this.desde += value;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= value;
    }

    // recargo la lista luego de actualizar: desde
    this.cargarUsuarios();
  }
}
