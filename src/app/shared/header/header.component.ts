import { Component } from "@angular/core";

import { UsuarioService } from "src/app/services/usuario.service";
import { Usuario } from "../../models/usuario.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: [],
})
export class HeaderComponent {
  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = usuarioService.usuario;
  }

  logout(): void {
    this.usuarioService.logout();
  }

  buscar(txtTermino: string): void {
    if (txtTermino.length !== 0) {
      this.router.navigateByUrl(`/dashboard/buscar/${txtTermino}`);
    }
  }
}
