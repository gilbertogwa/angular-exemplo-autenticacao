/**
 * Created by Gilberto on 10/12/2016.
 */
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/catch";
import {IErroRequisicao} from "./i-erro-requisicao";
import {AuthHttp} from "angular2-jwt";
import {AppConfig} from "../../environments/app-config";
import {APP_CONFIG_TOKEN} from "./di-tokens";
import {Injector} from "@angular/core";

export abstract class ServiceBase
{

  private config: AppConfig;
  private httpSafe: AuthHttp;
  private http: Http;

  constructor (injector: Injector)
  {
    this.config = injector.get(APP_CONFIG_TOKEN);
    this.httpSafe = injector.get(AuthHttp);
    this.http = injector.get(Http);
  }

  protected getHttp () : AuthHttp
  {
    return this.httpSafe;
  }

  protected getConfig() : AppConfig
  {
    return this.config;
  }

  private combineUrl(relativeUrl: string): string
  {

    let path = this.config.urlApi;

    if (!!path) path = path.replace("\\", "/");

    if (!relativeUrl) return path;

    relativeUrl = relativeUrl.replace("\\", "/");

    if (path.endsWith("/") && relativeUrl.startsWith("/"))
    {
      path += relativeUrl.substring(1);
    } else if (path.endsWith("/"))
    {
      path += relativeUrl;
    } else
    {
      path += "/" + relativeUrl;
    }

    return path;

  }

  get<TItem>(relativeUrl: string, handlerMapItemResult?: (any) => TItem): Observable<TItem[]>
  {

    let options = this.createRequestOptions();
    let url = this.combineUrl(relativeUrl);

    return this.httpSafe.get(url, options)
      .catch(this.tratarErroRequisicao)
      .map(response => response.json())
      .map(itens => itens.map( item =>  handlerMapItemResult ? handlerMapItemResult(item) : item ) );

  }

  private createRequestOptions(): RequestOptions
  {
    let header = new Headers();

    header.append("Content-Type", "application/json;charset=utf-8");

    let options  = new RequestOptions();
    options.headers = header;

    return options;
  }

  /**
   * Performs a request with `post` http method.
   */
  post<TItem>(relativeUrl: string, body?: any, handlerMapItemResult?: (any) => TItem): Observable<TItem[]>
  {

    let options = this.createRequestOptions();

    let url = this.combineUrl(relativeUrl);

    return this.httpSafe.post(url, (body ? body: {}), options)
      .catch(this.tratarErroRequisicao)
      .map(response => {
        if (response.status == 204) {
          return [];
        }
        return response.json();
      })
      .map(itens => itens.map(item => handlerMapItemResult ? handlerMapItemResult(item) : item))
  }

  postUnsafe<TItem>(relativeUrl: string, body?: any, handlerMapItemResult?: (any) => TItem): Observable<TItem[]>
  {

    let options = this.createRequestOptions();

    let url = this.combineUrl(relativeUrl);

    return this.http.post(url, (body ? body: {}), options)
      .catch(this.tratarErroRequisicao)
      .map(response => {
        if (response.status == 204) {
          return [];
        }
        return response.json();
      })
      .map(itens =>
      {
        if (Array.isArray(itens))
        {
          return itens.map(item => handlerMapItemResult ? handlerMapItemResult(item) : item);
        } else
        {
          return itens;
        }
      })
  }

  private tratarErroRequisicao (response: Response | any) {

    let error: IErroRequisicao = {
      motivo: "",
      codigo: 0 ,
      isValidacao: false,
      itensValidacao: []
    };

    if (!response)
    {
      error.motivo = "Erro ao executar a operação.";
      return;
    }

    if (response.type == 3)
    {
      error.codigo = 3;
      error.motivo = "O serviço está indisponível ou seu computador perdeu a comunicação com a rede/internet.";

    } else if (response.status == 401)
    {
      error.codigo = response.status;
      error.motivo = "Acesso não autorizado.";

    } else if (response.status == 404)
    {
      error.codigo = response.status;
      error.motivo = "O endereço web (URL) não foi aceito pelo servidor do sistema.";

    }else  if (response.status == 500)
    {
      var obj = response.json();
      error.codigo = response.status;
      error.motivo = obj.message;
      error.isValidacao = obj.isValidation;
      error.itensValidacao = obj.itens;
    } else
    {

      let obj : any;

      try {
        let obj = response.json();
        error.codigo = response.status;
      } catch (e)
      {
        obj = response;
      }

      if (!!obj && !!obj['message']) {
        error.motivo = obj.message;
      } else {
        error.motivo = "Erro ao executar o comando no servidor do sistema";
        error.motivo += (response.statusText ? " -> " + response.statusText : "") + ".";
      }

    }

    return Observable.throw(error);

  }



}
