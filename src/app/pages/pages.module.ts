import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// modules
import { ComponentsModule } from "../components/components.module";
import { PipesModule } from "../pipes/pipes.module";
import { SharedModule } from "../shared/shared.module";

// components
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component";
import { MedicoComponent } from "./mantenimientos/medicos/medico.component";
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component";
import { PagesComponent } from "./pages.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component";

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
  ],
})
export class PagesModule {}
