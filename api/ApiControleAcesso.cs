using Nancy;
using Nancy.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using ApiExemploAutenticacao.Infra;
using ApiExemploAutenticacao.Entidades;
using Nancy.ModelBinding;

namespace ApiExemploAutenticacao
{

    public class ApiControleAcesso : NancyModule
    {

        public ApiControleAcesso() : base("/api/controle-acesso/")
        {

            Post("autenticar", _ =>
            {

                var entidade = this.Bind<Autenticacao>();

                if (string.IsNullOrWhiteSpace(entidade.Usuario) ||
                    string.IsNullOrWhiteSpace(entidade.Senha))
                {
                    throw new Exception("Usuário e/ou Senha não informado.");
                }

                var info = new TokenInfo()
                {
                    Usuario = entidade.Usuario,
                    DataAcesso = DateTime.Now
                };

                return Negotiate.WithStatusCode(HttpStatusCode.OK)
                    .WithModel(this.JsonResponse(new { apiKey = ControleAcessoJwt.GerarToken(info) }));

            });

        }

   
    }

}
