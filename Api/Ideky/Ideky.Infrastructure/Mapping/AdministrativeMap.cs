using Ideky.Domain.Entity;
using System.Data.Entity.ModelConfiguration;

namespace Ideky.Infrastructure.Mapping
{
    internal class AdministrativeMap : EntityTypeConfiguration<Administrative>
    {
        public AdministrativeMap()
        {
            ToTable("Administrative");

            HasKey(x => x.Id);

            Property(x => x.Email).HasMaxLength(100);
        }
    }
}
