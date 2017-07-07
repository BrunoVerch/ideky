using Ideky.Domain.Entity;
using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ideky.Infrastructure.Mapping
{
    internal class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            ToTable("User");

            HasKey(x => x.FacebookId);
            Property(x => x.FacebookId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

        }
    }
}
