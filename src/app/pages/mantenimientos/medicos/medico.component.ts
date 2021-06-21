import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { delay } from "rxjs/operators";

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

    // si hay cambios en el select Hospital, se lo asigna en base de datos
    this.medicoForm.get("hospital")?.valueChanges.subscribe({
      next: (hid) => {
        this.hospitalSeleccionado = this.hospitales.find(
          (elem) => elem.hid === hid
        );
      },
      error: (err) => console.log(err),
    });

    // recibo el id del url y si no es "nuevo" carga el medico usando dicho id
    this.activatedRoute.params.subscribe({
      next: ({ id }) => {
        if (id !== "nuevo") {
          this.cargarMedico(id);
        }
      },
      error: (err) => console.log(err),
    });
  }

  cargarMedico(mid: string): void {
    this.medicoService
      .obtenerMedicoPorId(mid)
      .pipe(delay(100))
      .subscribe({
        next: (medico) => {
          // si no recibimos un medico válido, redirigimos
          if (!medico) {
            this.router.navigateByUrl("/dashboard/medicos");
          } else {
            const {
              nombre,
              hospital: { _id },
            } = medico;
            this.medicoForm.setValue({ nombre, hospital: _id });
            this.medicoSeleccionado = medico;
          }
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

    if (this.medicoSeleccionado) {
      // si hay medico seleccionado actualizamos
      const data = {
        ...this.medicoForm.value,
        mid: this.medicoSeleccionado.mid,
      };
      this.medicoService.actualizarMedico(data).subscribe({
        next: (resp) => {
          Swal.fire(
            "Actualizado!",
            `${nombre} actualizado correctamente`,
            "success"
          );
        },
        error: (err) => err,
      });
    } else {
      // si no hay medico seleccionado, creamos uno nuevo
      this.medicoService.crearMedico(this.medicoForm.value).subscribe({
        next: (resp) => {
          Swal.fire("Creado!", `${nombre} creado correctamente`, "success");
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico.mid}`);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
