using Ideky.Domain.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;

namespace Ideky.Infrastructure.Mapping
{
    internal class AdministrativeMap : EntityTypeConfiguration<Administrative>
    {
        public AdministrativeMap()
        {
            ToTable("Administrative");

            HasKey(x => x.Id);

            Property(x => x.Email)
                .HasMaxLength(100)
                .HasColumnAnnotation(
                    IndexAnnotation.AnnotationName,
                    new IndexAnnotation(new IndexAttribute("IX_Administrative_Email", 1) { IsUnique = true }))
                .IsRequired();
        }
    }
}
