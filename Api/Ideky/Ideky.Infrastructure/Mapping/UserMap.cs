using Ideky.Domain.Entity;
using System.Data.Entity.ModelConfiguration;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;

namespace Ideky.Infrastructure.Mapping
{
    internal class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            ToTable("User");

            HasKey(x => x.Id);
            //Property(x => x.FacebookId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            Property(x => x.FacebookId)
                .HasColumnAnnotation(
                    IndexAnnotation.AnnotationName,
                    new IndexAnnotation(
                        new IndexAttribute("IX_FacebookId", 2) { IsUnique = true }));
        }
    }
}
