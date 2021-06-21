import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import Swal from "sweetalert2";

import { HospitalService } from "../../../services/hospital.service";
import { MedicoService } from "../../../services/medico.service";

import { Hospital } from "../../../models/hospital.model";
import { Medico } from "../../../models/medico.model";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado: Hospital | undefined;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ["", Validators.required],
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

    this.activatedRoute.params.subscribe({
      next: ({ id }) => {
        if (id === "nuevo") {
          console.log("medico nuevo, no hago nada");
        } else {
          this.cargarMedico(id);
        }
      },
      error: (err) => console.log(err),
    });
  }

  cargarMedico(mid: string): void {
    this.medicoService.obtenerMedicoPorId(mid).subscribe({
      next: (medico) => {
        this.medicoSeleccionado = medico;
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
    const { nombre } = this.medicoForm.value;
    this.medicoService.crearMedico(this.medicoForm.value).subscribe({
      next: (resp) => {
        Swal.fire("Creado!", `${nombre} creado correctamente`, "success");
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico.mid}`);
      },
      error: (err) => console.log(err),
    });
  }
}
