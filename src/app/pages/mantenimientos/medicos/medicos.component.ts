import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Medico } from "../../../models/medico.model";

import { MedicoService } from "../../../services/medico.service";
import { ModalImagenService } from "../../../services/modal-imagen.service";

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

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): any {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe({
      next: (medicos) => {
        this.medicos = medicos;
        this.medicosTemp = medicos;
        this.cargando = false;
      },
      error: (err) => console.log(err),
    });
  }

  abrirModal(medico: Medico): void {
    this.modalImagenService.abrirModal("medicos", medico.mid, medico.img);
  }
}
