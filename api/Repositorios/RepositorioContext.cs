using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ApiExemploAutenticacao.Repositorios
{
    public partial class RepositorioContext : DbContext
    {
        public virtual DbSet<Produtos> Produtos { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Produtos>(entity =>
            {
                entity.HasKey(e => e.Codigo)
                    .HasName("PK_Produtos");

                entity.Property(e => e.Codigo).HasColumnType("varchar(30)");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnType("varchar(150)");
            });
        }
    }
}