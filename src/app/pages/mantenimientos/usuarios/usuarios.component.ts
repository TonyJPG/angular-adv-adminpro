import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../../services/usuario.service";
import { Usuario } from "../../../models/usuario.model";
import { BusquedasService } from "../../../services/busquedas.service";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: [],
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public desde = 0;
  public cargando = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe({
      next: ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.cargando = false;
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

    // recargo la lista luego de actualizar "desde"
    this.cargarUsuarios();
  }

  buscar(termino: string): void {
    this.busquedasService
      .buscar("usuarios", termino)
      .subscribe((resultados: any) => {
        this.usuarios = resultados;
      });
  }
}
