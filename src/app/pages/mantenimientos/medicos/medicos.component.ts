import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";

import { Medico } from "../../../models/medico.model";

import { BusquedasService } from "../../../services/busquedas.service";
import { MedicoService } from "../../../services/medico.service";
import { ModalImagenService } from "../../../services/modal-imagen.service";

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando = true;
  public imgSubs!: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img: string) => {
        console.log("emitió");
        console.log(img);
        this.cargarMedicos();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
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

  buscar(termino: string): any {
    if (termino.length === 0) {
      return (this.medicos = this.medicosTemp);
    }

    this.busquedasService.buscar("medicos", termino).subscribe({
      next: (resp: Medico[]) => (this.medicos = resp),
      error: (err: any) => console.log(err),
    });
  }
}
