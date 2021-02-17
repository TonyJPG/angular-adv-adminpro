import { Component } from "@angular/core";
import { Observable, interval } from "rxjs";
import { retry, take, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: [],
})
export class RxjsComponent {
  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (valor) => console.log("Subs: ", valor),
    //     (error) => console.warn("Salió error: ", error),
    //     () => console.log("Obs terminado!")
    //   );
    this.retornaIntervalo().subscribe(console.log);
  }

  retornaIntervalo(): Observable<number> {
    return interval(250).pipe(
      map((valor) => valor + 1),
      filter((valor) => (valor % 2 === 0 ? true : false)),
      take(10)
    );
  }

  // retornaObservable(): Observable<number> {
  //   let i = -1;
  //   return new Observable<number>((observer) => {
  //     const intervalo = setInterval(() => {
  //       i++;
  //       observer.next(i);
  //       console.log("estoy dentro del obs", i);

  //       if (i === 2) {
  //         observer.error("algo salio mal");
  //       }

  //       if (i === 4 || i === 10) {
  //         observer.complete();
  //         clearInterval(intervalo);
  //       }
  //     }, 1000);
  //   });
  // }
}
