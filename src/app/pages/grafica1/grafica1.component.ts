import { Component } from "@angular/core";

@Component({
  selector: "app-grafica1",
  templateUrl: "./grafica1.component.html",
  styles: [],
})
export class Grafica1Component {
  public graficaLabels: string[] = [
    "Download Sales1",
    "In-Store Sales1",
    "Mail-Order Sales1",
  ];
  public graficaData = [[250, 130, 70]];
}
