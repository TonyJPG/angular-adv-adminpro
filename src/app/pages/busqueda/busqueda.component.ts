import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { BusquedasService } from "../../services/busquedas.service";

import { Usuario } from "../../models/usuario.model";
import { Medico } from "../../models/medico.model";
import { Hospital } from "../../models/hospital.model";

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styles: [],
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: ({ termino }) => this.busquedaGlobal(termino),
      error: (err) => console.log(err),
    });
  }

  busquedaGlobal(termino: string): void {
    this.busquedasService.busquedaGlobal(termino).subscribe({
      next: (resp: any): void => {
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      },
      error: (err: any) => console.log(err),
    });
  }

  abrirMedico(medico: Medico): void {
    this.router.navigateByUrl(`/dashboard/medico/${medico.mid}`);
  }
}
