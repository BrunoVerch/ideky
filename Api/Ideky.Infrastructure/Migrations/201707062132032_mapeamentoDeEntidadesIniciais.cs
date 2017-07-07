namespace Ideky.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class mapeamentoDeEntidadesIniciais : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Administrative",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Email = c.String(maxLength: 100),
                        Password = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Game_Result",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GameDate = c.DateTime(nullable: false),
                        User_id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.User_id, cascadeDelete: true)
                .Index(t => t.User_id);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        FacebookId = c.Int(nullable: false, identity: true),
                        Record = c.Long(nullable: false),
                        Lifes = c.Int(nullable: false),
                        LastLogin = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.FacebookId);
            
            CreateTable(
                "dbo.Level",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LevelNumber = c.Int(nullable: false),
                        PictureAmount = c.Int(nullable: false),
                        Duration = c.Int(nullable: false),
                        Multiplier = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Game_Result", "User_id", "dbo.User");
            DropIndex("dbo.Game_Result", new[] { "User_id" });
            DropTable("dbo.Level");
            DropTable("dbo.User");
            DropTable("dbo.Game_Result");
            DropTable("dbo.Administrative");
        }
    }
}
