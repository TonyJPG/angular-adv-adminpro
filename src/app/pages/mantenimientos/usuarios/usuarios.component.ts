import { Component, OnInit, OnDestroy } from "@angular/core";
import Swal from "sweetalert2";
import { delay } from "rxjs/operators";
import { Subscription } from "rxjs";

import { BusquedasService } from "../../../services/busquedas.service";
import { ModalImagenService } from "../../../services/modal-imagen.service";
import { UsuarioService } from "../../../services/usuario.service";

import { Usuario } from "../../../models/usuario.model";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde = 0;
  public cargando = true;
  public imgSubs!: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img: string) => {
        console.log("emitió");
        console.log(img);
        this.cargarUsuarios();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
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

  eliminarUsuario(usuario: Usuario): any {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire("Error", "No puede borrarse a si mismo", "error");
    }

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

  cambiarRole(usuario: Usuario): void {
    this.usuarioService.guardarUsuario(usuario).subscribe({
      next: (resp) => console.log(resp),
      error: (err) => console.log(err),
    });
  }

  abrirModal(usuario: Usuario): void {
    this.modalImagenService.abrirModal("usuarios", usuario.uid, usuario.img);
  }
}
