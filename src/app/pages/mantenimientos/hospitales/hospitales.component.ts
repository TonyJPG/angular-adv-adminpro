import { Component, OnInit } from "@angular/core";

import { HospitalService } from "../../../services/hospital.service";
import { Hospital } from "../../../models/hospital.model";

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styles: [],
})
export class HospitalesComponent implements OnInit {
  public totalHospitales = 0;
  public hospitales: Hospital[] = [];
  public desde = 0;
  public cargando = true;

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(): void {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde).subscribe({
      next: ({ total, hospitales }) => {
        this.hospitales = hospitales;
        this.totalHospitales = total;
        console.log({ total, hospitales });
        this.cargando = false;
      },
      error: (err) => console.log(err),
    });
  }
}
