namespace Ideky.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Createnameandpictureinuserentityandupdateothersmethods : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "Name", c => c.String());
            AddColumn("dbo.User", "Picture", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "Picture");
            DropColumn("dbo.User", "Name");
        }
    }
}
