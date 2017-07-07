using Ideky.Domain.Entity;
using System.Data.Entity.ModelConfiguration;

namespace Ideky.Infrastructure.Mapping
{
    internal class GameResultMap : EntityTypeConfiguration<GameResult>
    {
        public GameResultMap()
        {
            ToTable("Game_Result");

            HasKey(x => x.Id);

            HasRequired(x => x.User)
                   .WithMany()
                   .Map(x => x.MapKey("User_id"));
        }
    }
}
