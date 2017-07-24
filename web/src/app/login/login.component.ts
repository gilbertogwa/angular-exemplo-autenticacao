import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {ComponentViewBase} from "../infra/component-view-base";
import {IErroRequisicao} from "../infra/i-erro-requisicao";
import {IAction} from "../infra/iaction";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends ComponentViewBase implements OnInit {

  constructor(private service: ApiService, private router: Router) {
    super();

  }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  autenticar(dadosForm)
  {

    let action = <IAction>{

      onCompleted: (autenticacao) => {

        if (!autenticacao || !autenticacao.apiKey)
        {
          this.exibirMensagemErro("Usuário não autenticado.");
          return;
        }

        // login successful if there's a jwt token in the response
        let token = autenticacao.apiKey;

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', token);

        this.router.navigate(['home']);

      },
      onError: (erro: IErroRequisicao | string) => {
        this.exibirMensagemErro(erro);
      },
      onFinally: () => {
      }
    };

    // executa a transação
    let observablePedido = this.service.autenticar(dadosForm.usuario, dadosForm.senha);

    observablePedido.finally(action.onFinally).subscribe(action.onCompleted, action.onError);
  }


}
