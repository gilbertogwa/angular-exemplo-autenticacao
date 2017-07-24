using Nancy;
using Nancy.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using ApiExemploAutenticacao.Infra;
using ApiExemploAutenticacao.Repositorios;

namespace ApiExemploAutenticacao
{

    public class Api: ApiBase
    {

    
        public Api(RepositorioContext dbContext) : base("/api/produtos/")
        {

            Get("listar", _ =>
            {
                IEnumerable<Produtos> produtos = null;

                try
                {
                    produtos = dbContext.Produtos.ToArray();
                }
                catch (Exception ex)
                {
                    throw new Exception("Erro ao efetuar conexão com o banco de dados -> " + ex.Message, ex);
                }

                try
                {
                    return this.JsonResponse(produtos);
                }
                catch (Exception ex)
                {

                    throw new Exception("Erro ao converter lista de projetos para JSON -> " + ex.Message, ex);
                }

            });

        }

   
    }

}
