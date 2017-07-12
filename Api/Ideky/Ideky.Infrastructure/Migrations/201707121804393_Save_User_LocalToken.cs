namespace Ideky.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Save_User_LocalToken : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "LocalToken", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "LocalToken");
        }
    }
}
