namespace Ideky.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class updatemappinguserpicturelength1024 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.User", "Name", c => c.String(maxLength: 256, unicode: false, nullable: false));
            AlterColumn("dbo.User", "Picture", c => c.String(maxLength: 1024, unicode: false, nullable: false));
        }

        public override void Down()
        {
            AlterColumn("dbo.User", "Picture", c => c.String());
            AlterColumn("dbo.User", "Name", c => c.String(maxLength: 200));
        }
    }
}
