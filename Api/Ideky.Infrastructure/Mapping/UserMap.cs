using Ideky.Domain.Entity;
using System.Data.Entity.ModelConfiguration;

namespace Ideky.Infrastructure.Mapping
{
    internal class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            ToTable("User");

            HasKey(x => x.FacebookId);
        }
    }
}
