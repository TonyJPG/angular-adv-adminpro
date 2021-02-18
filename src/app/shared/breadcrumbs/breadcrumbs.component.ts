import { Component, OnDestroy } from "@angular/core";
import { ActivationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo = "";
  public tituloSubs$: Subscription = new Subscription();

  constructor(private router: Router) {
    this.getDataRuta();
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getDataRuta(): void {
    this.tituloSubs$ = this.router.events
      .pipe(
        filter((evento) => evento instanceof ActivationEnd),
        filter(
          (evento) => (evento as ActivationEnd).snapshot.firstChild === null
        ),
        map((evento) => (evento as ActivationEnd).snapshot.data)
      )
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `AdminPro - ${titulo}`;
      });
  }
}
