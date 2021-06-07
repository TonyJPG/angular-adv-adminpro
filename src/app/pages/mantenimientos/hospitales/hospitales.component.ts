import { Component, OnInit } from "@angular/core";

import Swal from "sweetalert2";

import { HospitalService } from "../../../services/hospital.service";
import { Hospital } from "../../../models/hospital.model";
import { CargarHospital } from "../../../interfaces/cargar-hospital.interface";

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

  guardarCambios(hospital: Hospital): void {
    this.hospitalService
      .actualizarHospital(hospital.hid || "", hospital.nombre)
      .subscribe({
        next: () => Swal.fire("Actualizado!", hospital.nombre, "success"),
        error: (err) => console.log(err),
      });
  }

  eliminarHospital(hospital: Hospital): void {
    this.hospitalService.borrarHospital(hospital.hid || "").subscribe({
      next: () => {
        this.cargarHospitales();
        Swal.fire("Eliminado!", hospital.nombre, "success");
      },
      error: (err) => console.log(err),
    });
  }

  async abrirSwal(): Promise<void> {
    const { value } = await Swal.fire<string>({
      input: "text",
      title: "Crear hospital",
      text: "Ingrese el nombre del nuevo hospital:",
      inputPlaceholder: "Nombre del hospital",
      confirmButtonText: "Guardar",
      confirmButtonColor: "#745af2",
      showCancelButton: true,
      cancelButtonColor: "#dd3333",
    });

    if (value && value.trim().length > 0) {
      this.hospitalService.crearHospital(value.trim()).subscribe({
        next: (resp) => {
          this.cargarHospitales();
          Swal.fire("Hospital creado!", value, "success");
        },
        error: (err) => console.log(err),
      });
    }
  }

  buscar(txtTermino: string): void {
    console.log(txtTermino);
  }
}
