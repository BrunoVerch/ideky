namespace Ideky.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FixedActiveName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Game_Result", "Active", c => c.Boolean(nullable: false));
            DropColumn("dbo.Game_Result", "Ativo");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Game_Result", "Ativo", c => c.Boolean(nullable: false));
            DropColumn("dbo.Game_Result", "Active");
        }
    }
}
