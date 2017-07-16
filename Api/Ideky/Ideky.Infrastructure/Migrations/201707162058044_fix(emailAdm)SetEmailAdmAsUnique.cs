namespace Ideky.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fixemailAdmSetEmailAdmAsUnique : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Administrative", "Email", c => c.String(nullable: false, maxLength: 100));
            CreateIndex("dbo.Administrative", "Email", unique: true, name: "IX_Administrative_Email");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Administrative", "IX_Administrative_Email");
            AlterColumn("dbo.Administrative", "Email", c => c.String(maxLength: 100));
        }
    }
}
