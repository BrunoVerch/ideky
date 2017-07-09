using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ideky.Domain.Entity;
using System.Security.Cryptography;
using System.Text;

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
        public void Create_Invalid_Administrative_Entity_With_Too_Long_Email()
        {
            string email = "teste@testestestestestestestestestestestestestestestestestestestestestestestestestestestestestes1.com";
            var admin = new Administrative(email, "123");
            Assert.IsFalse(admin.Validate());
            Assert.IsTrue(admin.Messages.Count > 0);
        }

        [TestMethod]
        public void Create_Invalid_Administrative_Entity_Without_Password()
        {
            var admin = new Administrative("teste@teste.com", "");
            Assert.IsFalse(admin.Validate());
            Assert.IsTrue(admin.Messages.Count > 0);
        }

        [TestMethod]
        public void Create_Invalid_Administrative_Entity_Without_Email()
        {
            var admin = new Administrative("", "123");
            Assert.IsFalse(admin.Validate());
            Assert.IsTrue(admin.Messages.Count > 0);
        }

        [TestMethod]
        public void Create_Invalid_Administrative_Entity_Without_Email_And_Password()
        {
            var admin = new Administrative("", "");
            Assert.IsFalse(admin.Validate());
            Assert.IsTrue(admin.Messages.Count > 0);
        }

        [TestMethod]
        public void When_Administrative_Is_Created_Invalid_Email_And_Password_Are_Encrypted_In_MD5()
        {
            Administrative admin = new Administrative("teste@teste.com", "123456");
            MD5 md5 = MD5.Create();
            byte[] inputBytes = Encoding.Default.GetBytes("teste@teste.com123456");
            byte[] hash = md5.ComputeHash(inputBytes);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
                sb.Append(hash[i].ToString("x2"));

            Assert.IsTrue(sb.ToString() == admin.Password);
            Assert.IsFalse(admin.Messages.Count > 0);
        }
    }
}
