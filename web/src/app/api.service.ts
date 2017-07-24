import {Injectable, Injector} from "@angular/core";
import {ServiceBase} from "./infra/service-base";
import {ProdutoDataModel} from "./produto.data-model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ApiService extends ServiceBase
{
  private URL_AUTENTICAR: string = "controle-acesso/autenticar";
  private URL_LISTAR_PRODUTOS: string = "produtos/listar";

  constructor(injector: Injector)
  {
    super(injector);
  }

  public listarProdutos() {

    let handlerMapItem = (item: any) => {

      return <ProdutoDataModel>{
        codigo: item.codigo
        , descricao: item.descricao
        , preco: parseFloat(item.preco)
      };
    };

    let result = this.get(this.URL_LISTAR_PRODUTOS, handlerMapItem);

    return result;

  }

  public autenticar(usuario: string, senha: string): Observable<any> {

    let result =  this.postUnsafe(this.URL_AUTENTICAR, JSON.stringify({ usuario: usuario, senha: senha}));
    return result;

  }

  public sair(): void {

    localStorage.removeItem('token');
  }


}
