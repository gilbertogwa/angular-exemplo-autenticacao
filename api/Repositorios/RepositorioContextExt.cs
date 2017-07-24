using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiExemploAutenticacao.Repositorios
{
    public partial class RepositorioContext 
    {
        public RepositorioContext(DbContextOptions<RepositorioContext> options)
      :base(options)
        { }
    }
}
