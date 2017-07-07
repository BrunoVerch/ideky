namespace Ideky.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CorrectFacebookIdToLong : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Game_Result", "User_id", "dbo.User");
            DropIndex("dbo.Game_Result", new[] { "User_id" });
            DropPrimaryKey("dbo.User");
            AlterColumn("dbo.Game_Result", "User_id", c => c.Long(nullable: false));
            AlterColumn("dbo.User", "FacebookId", c => c.Long(nullable: false));
            AddPrimaryKey("dbo.User", "FacebookId");
            CreateIndex("dbo.Game_Result", "User_id");
            AddForeignKey("dbo.Game_Result", "User_id", "dbo.User", "FacebookId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Game_Result", "User_id", "dbo.User");
            DropIndex("dbo.Game_Result", new[] { "User_id" });
            DropPrimaryKey("dbo.User");
            AlterColumn("dbo.User", "FacebookId", c => c.Int(nullable: false));
            AlterColumn("dbo.Game_Result", "User_id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.User", "FacebookId");
            CreateIndex("dbo.Game_Result", "User_id");
            AddForeignKey("dbo.Game_Result", "User_id", "dbo.User", "FacebookId", cascadeDelete: true);
        }
    }
}
