import { Component, Input } from "@angular/core";
import { MultiDataSet, Label, Color } from "ng2-charts";

@Component({
  selector: "app-dona",
  templateUrl: "./dona.component.html",
  styles: [],
})
export class DonaComponent {
  @Input() titulo = "Sin título";
  @Input() labels = ["Color 1", "Color 2", "Color 3"];
  @Input() data = [[10, 40, 50]];

  // Doughnut
  public colores: Color[] = [
    { backgroundColor: ["#6857E6", "#009FEE", "#F02059"] },
  ];
}
