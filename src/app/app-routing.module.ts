import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// modules
import { PagesRoutingModule } from "./pages/pages.routing";
import { AuthRoutingModule } from "./auth/auth.routing";

// components
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";

const routes: Routes = [{ path: "**", component: NopagefoundComponent }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
