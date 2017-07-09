namespace Ideky.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AdicaoAtributoAtivoGameResult : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Game_Result", "Ativo", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Game_Result", "Ativo");
        }
    }
}
