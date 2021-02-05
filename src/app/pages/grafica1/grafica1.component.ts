import { Component } from "@angular/core";
import { MultiDataSet, Label, Color } from "ng2-charts";

@Component({
  selector: "app-grafica1",
  templateUrl: "./grafica1.component.html",
  styles: [],
})
export class Grafica1Component {
  // Doughnut
  public doughnutChartLabels: Label[] = [
    "Download Sales",
    "In-Store Sales",
    "Mail-Order Sales",
  ];
  public doughnutChartData: MultiDataSet = [[250, 130, 70]];
  public colores: Color[] = [
    { backgroundColor: ["#6857E6", "#009FEE", "#F02059"] },
  ];
}
