using Ideky.Domain.Entity;
using System.Data.Entity;
using Ideky.Infrastructure.Mapping;
using System.Collections.Generic;

namespace Ideky.Infrastructure
{
    public class Context : DbContext
    {
        public Context() : base("name=Ideky")
        {
            //Configuration.ProxyCreationEnabled = true; //Necessário para o LazyLoading
            //Configuration.LazyLoadingEnabled = true; //default -- busca só o básico, para pegar outros valores é necessário o include
            // se definir public virtual Festa('classe(tabela(chave)) estrangeira') na classe a ser chamada o ef pode realizar um "include" automático
            //Ex: lá na Reserva a Festa é setada como public virtual
            //Lembrar que o EF só realiza as consultas a banco quando o ToList é realizado
            //AsNoTracking() -- Utilize quando a consulta for apenas para exibição de dados e não para modificação 
        }

        public DbSet<Administrative> Administratives { get; set; }
        public DbSet<GameResult> GameResults { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new AdministrativeMap());
            modelBuilder.Configurations.Add(new GameResultMap());
            modelBuilder.Configurations.Add(new LevelMap());
            modelBuilder.Configurations.Add(new UserMap());
        }

    }
}

