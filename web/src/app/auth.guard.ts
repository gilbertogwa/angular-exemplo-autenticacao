import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router)
  {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    try  {

      if (tokenNotExpired('token')) return true;

      if (!localStorage.getItem('token'))
      {
        alert("Efetue o Login.");
      } else
      {
        localStorage.removeItem('token');
        alert("Sua conexão expirou ou você não tem autorização para acessar este recurso.");
      }

      this.router.navigate(['login']);

    } catch (e)
    {
      alert('Erro ao verificar token de acesso\r\rMotivo: ' + e.message);
    }

    return false;
  }
}
