import { Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: [],
})
export class RxjsComponent {
  constructor() {
    const obs$ = new Observable((observer) => {
      let i = -1;
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        console.log("estoy dentro del obs", i);

        if (i === 2) {
          observer.error("algo salio mal");
        }

        if (i === 4) {
          observer.complete();
          clearInterval(intervalo);
        }
      }, 1000);
    });

    obs$.subscribe(
      (valor) => console.log("Subs: ", valor),
      (error) => console.warn("Salió error: ", error),
      () => console.log("Obs terminado!")
    );
  }
}
