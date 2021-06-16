import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";

import Swal from "sweetalert2";

import { HospitalService } from "../../../services/hospital.service";
import { ModalImagenService } from "../../../services/modal-imagen.service";
import { BusquedasService } from "../../../services/busquedas.service";

import { Hospital } from "../../../models/hospital.model";

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public totalHospitales = 0;
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public desde = 0;
  public cargando = true;
  public imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(500))
      .subscribe((img: string) => {
        console.log("emitió");
        console.log(img);
        this.cargarHospitales();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales(): void {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde).subscribe({
      next: ({ total, hospitales }) => {
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
        this.totalHospitales = total;
        console.log({ total, hospitales });
        this.cargando = false;
      },
      error: (err) => console.log(err),
    });
  }

  cambiarPagina(value: number): void {
    this.desde += value;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalHospitales) {
      this.desde -= value;
    }

    // recargo la lista luego de actualizar "desde"
    this.cargarHospitales();
  }

  guardarCambios(hospital: Hospital): void {
    this.hospitalService
      .actualizarHospital(hospital.hid || "", hospital.nombre)
      .subscribe({
        next: () =>
          Swal.fire("Hospital actualizado!", hospital.nombre, "success"),
        error: (err) => console.log(err),
      });
  }

  eliminarHospital(hospital: Hospital): void {
    this.hospitalService.borrarHospital(hospital.hid || "").subscribe({
      next: () => {
        this.cargarHospitales();
        // TODO cambiar setTimeout por código asíncrono
        setTimeout(() => {
          if (this.totalHospitales % 5 === 0) {
            this.cambiarPagina(-5);
          }
        }, 2000);
        Swal.fire("Hospital eliminado!", hospital.nombre, "success");
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
        next: () => {
          this.cargarHospitales();
          // TODO cambiar setTimeout por código asíncrono
          setTimeout(() => {
            if (this.totalHospitales % 5 === 1) {
              this.cambiarPagina(5);
            }
          }, 2000);
          Swal.fire("Hospital creado!", value, "success");
        },
        error: (err) => console.log(err),
      });
    }
  }

  abrirModal(hospital: Hospital): void {
    this.modalImagenService.abrirModal(
      "hospitales",
      hospital.hid,
      hospital.img
    );
  }

  buscar(txtTermino: string): any {
    if (txtTermino.length === 0) {
      return (this.hospitales = this.hospitalesTemp);
    }

    this.busquedasService.buscar("hospitales", txtTermino).subscribe({
      next: (resp: any) => (this.hospitales = resp),
      error: (err: any) => console.log(err),
    });
  }
}
