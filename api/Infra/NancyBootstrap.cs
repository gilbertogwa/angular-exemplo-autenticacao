using Autofac;
using Nancy;
using Nancy.Bootstrapper;
using System;


namespace ApiExemploAutenticacao.Infra
{


    public class NancyBootstrap : Nancy.Bootstrappers.Autofac.AutofacNancyBootstrapper
    {

        private IContainer container;
    

        public NancyBootstrap(IContainer container)
        {
            this.container = container;
        }

        protected override ILifetimeScope GetApplicationContainer()
        {
            return this.container;
        }

        protected override void ApplicationStartup(ILifetimeScope container, IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines);
            ControleAcessoJwt.Config(pipelines);
            pipelines.OnError += TratarErro;
        }

        private Response TratarErro(NancyContext ctx, Exception ex)
        {
            var msg = new { statusCode = 500, message = ex.Message, error = ex.ToString() };

            var response = new Nancy.Responses.JsonResponse(msg, new CustomJsonSerializer(), ctx.Environment);
            response.StatusCode = HttpStatusCode.InternalServerError;
            return response;

        }



    }



    class Token
    {
        public string Usuario { get; set; }
    }


}
