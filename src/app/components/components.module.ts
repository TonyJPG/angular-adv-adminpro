import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// modules
import { FormsModule } from "@angular/forms";

// components
import { IncrementadorComponent } from "./incrementador/incrementador.component";

@NgModule({
  declarations: [IncrementadorComponent],
  imports: [CommonModule, FormsModule],
  exports: [IncrementadorComponent],
})
export class ComponentsModule {}
