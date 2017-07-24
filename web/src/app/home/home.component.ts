import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProdutoDataModel} from '../produto.data-model';
import {CollectionViewer, DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {ApiService} from "../api.service";
import {IAction} from "../infra/iaction";
import {IErroRequisicao} from "../infra/i-erro-requisicao";
import {ComponentViewBase} from "../infra/component-view-base";
import {Router} from "@angular/router";
import {tokenNotExpired} from "angular2-jwt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends ComponentViewBase implements OnInit {

  displayedColumns = ['codigo', 'descricao', 'preco'];
  private _dataSource: ProdutosDataSource;

  constructor(private changeDetectorRef: ChangeDetectorRef
              , private service: ApiService
            , private router: Router) {

    super();
  }

  private get dataSource(): ProdutosDataSource
  {
    return this._dataSource;
  }

  private set dataSource(v: ProdutosDataSource)
  {
    this._dataSource = v;
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {

    this.listarProdutos();

  }

  private listarProdutos(): void
  {

    this.dataSource = new ProdutosDataSource([]);

    let action = <IAction>{

      onCompleted: (produtos) => {

        if (produtos.length === 0)
        {
          this.exibirMensagemErro("Nenhum produto encontrado.");
        }

        this.dataSource = new ProdutosDataSource(produtos);
      },
      onError: (erro: IErroRequisicao | string) => {

        if (tokenNotExpired())
        {
          this.exibirMensagemErro(erro);
        } else
        {
          this.exibirMensagemErro("Sua sessão expirou!\r\rPor favor, efetue o login novamente.");
          this.router.navigate(['login']);
        }

      },
      onFinally: () => {
      }
    };

    // executa a transação
    let observablePedido = this.service.listarProdutos();

    observablePedido.finally(action.onFinally).subscribe(action.onCompleted, action.onError);
  }

  private sair()
  {
    this.router.navigate(['login']);
  }

}



class ProdutosDataSource extends  DataSource<ProdutoDataModel> {

  private obs: BehaviorSubject<ProdutoDataModel[]>;
  connect(collectionViewer: CollectionViewer): Observable<ProdutoDataModel[]> {
    return this.obs;
  }

  disconnect(): void {
  }

  constructor(private produtos: ProdutoDataModel[]) {
    super();
    this.obs = new BehaviorSubject<ProdutoDataModel[]>(this.produtos);
  }


}
