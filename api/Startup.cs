using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Nancy.Owin;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using System.Reflection;
using System.Diagnostics;
using System.Text;
using ApiExemploAutenticacao.Infra;
using ApiExemploAutenticacao.Repositorios;
using Microsoft.EntityFrameworkCore;

namespace ApiExemploAutenticacao
{
    public class Startup
    {
        protected string[] origins;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();

        }

        public IConfigurationRoot Configuration { get; }
        public IContainer Container { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public virtual IServiceProvider ConfigureServices(IServiceCollection services)
        {

            // Add framework services.
            services.AddMvc();

            services.AddDbContext<RepositorioContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DbApiExemploAutenticacao")));

            // Configura a DI
            var autoFacConfig = new AutoFacConfig();

            autoFacConfig.Build(services, Configuration);

            this.Container = autoFacConfig.Container;

            return autoFacConfig.Provider;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public virtual void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {

            // (CORS para projetos Nancy)
            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                );

            
            app.UseOwin(a => a.UseNancy(b => b.Bootstrapper = new NancyBootstrap(this.Container)));

        }

    }

}
