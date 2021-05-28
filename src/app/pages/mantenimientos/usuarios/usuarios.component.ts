import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

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
  public usuariosTemp: Usuario[] = [];
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
        this.usuariosTemp = usuarios;
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

  buscar(termino: string): any {
    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }

    this.busquedasService
      .buscar("usuarios", termino)
      .subscribe((resultados: any) => {
        this.usuarios = resultados;
      });
  }

  eliminarUsuario(usuario: Usuario): void {
    console.log(usuario);

    Swal.fire({
      title: "¿Borrar usuario?",
      text: `Está a punto de borrar a ${usuario.nombre}`,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe({
          next: (resp: any) => {
            this.cargarUsuarios();
            Swal.fire(
              "¡Borrado!",
              `${usuario.nombre} fue eliminado correctamente.`,
              "success"
            );
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    });
  }
}
