namespace Ideky.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlteracaoChavePrimaria : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Game_Result", "User_id", "dbo.User");
            DropPrimaryKey("dbo.User");
            AlterColumn("dbo.User", "FacebookId", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.User", "FacebookId");
            AddForeignKey("dbo.Game_Result", "User_id", "dbo.User", "FacebookId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Game_Result", "User_id", "dbo.User");
            DropPrimaryKey("dbo.User");
            AlterColumn("dbo.User", "FacebookId", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.User", "FacebookId");
            AddForeignKey("dbo.Game_Result", "User_id", "dbo.User", "FacebookId", cascadeDelete: true);
        }
    }
}
