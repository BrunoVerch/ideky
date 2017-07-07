using Ideky.Domain.Entity;
using System.Data.Entity.ModelConfiguration;

namespace Ideky.Infrastructure.Mapping
{
    internal class LevelMap : EntityTypeConfiguration<Level>
    {
        public LevelMap()
        {
            ToTable("Level");

            HasKey(x => x.Id);
        }
    }
}
