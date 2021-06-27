import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UsuarioService } from "../services/usuario.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.usuarioService.validarToken().pipe(
      tap((estaAutenticado: boolean) => {
        if (!estaAutenticado) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.usuarioService.validarToken().pipe(
      tap((estaAutenticado: boolean) => {
        if (!estaAutenticado) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}
