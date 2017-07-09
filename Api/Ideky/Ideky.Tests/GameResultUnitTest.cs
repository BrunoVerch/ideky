using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ideky.Domain.Entity;
using System;

namespace Ideky.Tests
{
    [TestClass]
    public class GameResultUnitTest
    {
        [TestMethod]
        public void Create_Valid_Active_GameResult_Entity()
        {
            var user = new User(70);
            var gameResult = new GameResult(user,100);
            Assert.IsTrue(gameResult.Validate());
            Assert.IsTrue(gameResult.User.FacebookId == user.FacebookId);
            Assert.IsTrue(gameResult.Score == 100);
            Assert.IsTrue(gameResult.Active == true);
            Assert.IsTrue(gameResult.GameDate.Hour == DateTime.Now.Hour);
            Assert.IsTrue(gameResult.GameDate.Day == DateTime.Now.Day);
            Assert.IsTrue(gameResult.GameDate.Month == DateTime.Now.Month);
            Assert.IsTrue(gameResult.GameDate.Year == DateTime.Now.Year);
            Assert.IsFalse(gameResult.Messages.Count > 0);
        }
        public void Create_Invalid_Active_GameResult_Entity_Without_User()
        {
            var gameResult = new GameResult(null, 100);
            Assert.IsFalse(gameResult.Validate());
            Assert.IsFalse(gameResult.User == null);
            Assert.IsTrue(gameResult.Messages.Count > 0);
            Assert.IsTrue(gameResult.Score == 100);
            Assert.IsTrue(gameResult.Active == true);
            Assert.IsTrue(gameResult.GameDate.Hour == DateTime.Now.Hour);
            Assert.IsTrue(gameResult.GameDate.Day == DateTime.Now.Day);
            Assert.IsTrue(gameResult.GameDate.Month == DateTime.Now.Month);
            Assert.IsTrue(gameResult.GameDate.Year == DateTime.Now.Year);
        }
    }
}
