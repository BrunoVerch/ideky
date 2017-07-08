using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ideky.Domain.Entity;

namespace Ideky.Tests
{
    [TestClass]
    public class AdministrativeUnitTest
    {
        [TestMethod]
        public void Create_Valid_Administrative_Entity()
        {
            var admin = new Administrative("teste@teste.com", "123");
            Assert.IsTrue(admin.Validate());
            Assert.IsFalse(admin.Messages.Count > 0);

        }

        [TestMethod]
        public void Create_Invalid_Administrative_Entity_Without_Password()
        {
            var admin = new Administrative("teste@teste.com", "");
            Assert.IsFalse(admin.Validate());
            Assert.IsFalse(admin.Messages.Count > 0);
        }

        [TestMethod]
        public void Create_Invalid_Administrative_Entity_Without_Email()
        {
            var admin = new Administrative("", "123");
            Assert.IsFalse(admin.Validate());
            Assert.IsFalse(admin.Messages.Count > 0);
        }

        [TestMethod]
        public void Create_Invalid_Administrative_Entity_Without_Email_And_Password()
        {
            var admin = new Administrative("", "");
            Assert.IsFalse(admin.Validate());
            Assert.IsFalse(admin.Messages.Count > 0);
        }
    }
}
