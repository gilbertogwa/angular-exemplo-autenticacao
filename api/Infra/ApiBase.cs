using Nancy;
using Nancy.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiExemploAutenticacao.Infra
{
    public abstract class ApiBase: NancyModule
    {
        public ApiBase(string urlBase):base(urlBase)
        {
            this.Before.InsertAfter("Verificação de Segurança", ctx =>
            {
                try
                {
                    this.RequiresAuthentication();
                }
                catch (Exception)
                {
                    return Nancy.HttpStatusCode.Unauthorized;
                }
               
                return null;
            });

        }
    }
}
