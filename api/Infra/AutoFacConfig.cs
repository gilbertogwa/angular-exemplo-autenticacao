using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace ApiExemploAutenticacao.Infra
{
    public class AutoFacConfig
    {
        public IServiceProvider Provider { get; protected set; }
        public IContainer Container { get; protected set; }

        public void Build(IServiceCollection services, IConfigurationRoot configuration)
        {
            // Create the container builder.
            var builder = new ContainerBuilder();

            //var repoConfig = new RepositorioConfig();

            //repoConfig.registrarGetExterno(configuration.GetConnectionString);
            //builder.RegisterInstance<IRepositorioConfig>(repoConfig);

            ConfigureDI(builder);

            builder.RegisterAssemblyModules();

            builder.Populate(services);

            Container = builder.Build();

            // Create the IServiceProvider based on the container.
            Provider = new AutofacServiceProvider(this.Container);
        }


        public void ConfigureDI(ContainerBuilder builder)
        {

        }


    }
}
