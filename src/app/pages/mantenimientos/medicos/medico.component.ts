import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { HospitalService } from "../../../services/hospital.service";
import { MedicoService } from "../../../services/medico.service";

import { Hospital } from "../../../models/hospital.model";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital | undefined;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService
  ) {}

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ["Hernando", Validators.required],
      hospital: ["", Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get("hospital")?.valueChanges.subscribe({
      next: (hid) => {
        this.hospitalSeleccionado = this.hospitales.find(
          (elem) => elem.hid === hid
        );
      },
      error: (err) => console.log(err),
    });
  }

  cargarHospitales(): any {
    this.hospitalService.cargarHospitales().subscribe({
      next: ({ hospitales }) => (this.hospitales = hospitales),
      error: (err) => console.log(err),
    });
  }

  guardarMedico(): void {
    console.log(this.medicoForm.value);
    this.medicoService.crearMedico(this.medicoForm.value).subscribe({
      next: (resp) => console.log(resp),
      error: (err) => console.log(err),
    });
  }
}
