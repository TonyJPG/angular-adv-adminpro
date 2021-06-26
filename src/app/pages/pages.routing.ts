import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

// guards
import { AuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";

// components
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { PagesComponent } from "./pages.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

// components de mantenimientos
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: DashboardComponent,
        data: { titulo: "Dashboard" },
      },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { titulo: "Ajustes de cuenta" },
      },
      {
        path: "buscar/:termino",
        component: BusquedaComponent,
        data: { titulo: "Página de búsquedas" },
      },
      {
        path: "grafica1",
        component: Grafica1Component,
        data: { titulo: "Gráfica #1" },
      },
      {
        path: "perfil",
        component: PerfilComponent,
        data: { titulo: "Perfil de usuario" },
      },
      {
        path: "progress",
        component: ProgressComponent,
        data: { titulo: "Progress Bar" },
      },
      {
        path: "promesas",
        component: PromesasComponent,
        data: { titulo: "Promesas" },
      },
      { path: "rxjs", component: RxjsComponent, data: { titulo: "RxJs" } },

      // mantenimientos
      {
        path: "hospitales",
        component: HospitalesComponent,
        data: { titulo: "Mantenimiento de Hospitales" },
      },
      {
        path: "medico/:id",
        component: MedicoComponent,
        data: { titulo: "Mantenimiento de Médicos" },
      },
      {
        path: "medicos",
        component: MedicosComponent,
        data: { titulo: "Mantenimiento de Médicos" },
      },

      // rutas de admin
      {
        path: "usuarios",
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { titulo: "Mantenimiento de Usuarios" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
