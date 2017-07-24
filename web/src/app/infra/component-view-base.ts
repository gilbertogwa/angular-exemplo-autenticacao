import {IErroRequisicao} from "./i-erro-requisicao";

export class ComponentViewBase
{
    protected exibirMensagemErro(error: IErroRequisicao | string) {

      let msg: string;

      if (typeof error == 'string')
      {
        msg = error;
      } else if (error.isValidacao) {
        msg = error.motivo;
      } else {
        msg = "Não foi possível executar a operação.";
        if (!!error && !!error.motivo)
        {
          msg = msg + '\r\rMotivo: ' + error.motivo;
        }
      }

      alert(msg);
    }
}
