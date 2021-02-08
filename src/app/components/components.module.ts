import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// modules
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

// components
import { IncrementadorComponent } from "./incrementador/incrementador.component";
import { DonaComponent } from "./dona/dona.component";

@NgModule({
  declarations: [IncrementadorComponent, DonaComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
  exports: [IncrementadorComponent, DonaComponent],
})
export class ComponentsModule {}
