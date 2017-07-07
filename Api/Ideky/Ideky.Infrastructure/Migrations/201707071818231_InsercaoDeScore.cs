namespace Ideky.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InsercaoDeScore : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Game_Result", "Score", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Game_Result", "Score");
        }
    }
}
