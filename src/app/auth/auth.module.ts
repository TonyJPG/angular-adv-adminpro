import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// components
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
