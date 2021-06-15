import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { MedicoService } from "../../../services/medico.service";
import { Medico } from "../../../models/medico.model";

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: [],
})
export class MedicosComponent implements OnInit {
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando = true;
  public imgSubs!: Subscription;

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): any {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe({
      next: ({ medicos }) => {
        this.medicos = medicos;
        this.medicosTemp = medicos;
        console.log(medicos);
        this.cargando = false;
      },
      error: (err) => console.log(err),
    });
  }
}
