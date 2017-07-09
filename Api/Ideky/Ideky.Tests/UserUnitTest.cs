using Ideky.Domain.Entity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Ideky.Tests
{
    [TestClass]
    public class UserUnitTest
    {
        [TestMethod]
        public void Create_A_Valid_New_User_Entity_Setting_Only_FacebookId()
        {
            var user = new User(70);
            Assert.IsTrue(user.Validate());
            Assert.IsFalse(user.Messages.Count > 0);
            Assert.IsTrue(user.FacebookId == 70);
            Assert.IsTrue(user.Record == 0);
            Assert.IsTrue(user.Lifes == 1);
            Assert.IsTrue(user.LastLogin.Hour == DateTime.Now.Hour);
            Assert.IsTrue(user.LastLogin.Day == DateTime.Now.Day);
            Assert.IsTrue(user.LastLogin.Month == DateTime.Now.Month);
            Assert.IsTrue(user.LastLogin.Year == DateTime.Now.Year);
        }
        [TestMethod]
        public void Create_A_Valid_New_User_Entity_Setting_Only_FacebookId_And_Having_Id_Zero_Record_Zero_Lifes_One_And_Last_Login_Now()
        {
            var user = new User(70);
            Assert.IsTrue(user.Validate());
            Assert.IsTrue(user.FacebookId == 70);
            Assert.IsTrue(user.Record == 0);
            Assert.IsTrue(user.Lifes == 1);
            Assert.IsTrue(user.LastLogin.Hour == DateTime.Now.Hour);
            Assert.IsTrue(user.LastLogin.Day == DateTime.Now.Day);
            Assert.IsTrue(user.LastLogin.Month == DateTime.Now.Month);
            Assert.IsTrue(user.LastLogin.Year == DateTime.Now.Year);
            Assert.IsFalse(user.Messages.Count > 0);
        }
        [TestMethod]
        public void Create_A_Valid_New_User_Entity_Setting_FacebookId_Record_Lifes_And_LastLogin()
        {
            var user = new User(70, 100, 3, DateTime.Now);
            Assert.IsTrue(user.Validate());
            Assert.IsTrue(user.FacebookId == 70);
            Assert.IsTrue(user.Record == 100);
            Assert.IsTrue(user.Lifes == 3);
            Assert.IsTrue(user.LastLogin.Hour == DateTime.Now.Hour);
            Assert.IsTrue(user.LastLogin.Day == DateTime.Now.Day);
            Assert.IsTrue(user.LastLogin.Month == DateTime.Now.Month);
            Assert.IsTrue(user.LastLogin.Year == DateTime.Now.Year);
            Assert.IsFalse(user.Messages.Count > 0);
        }
        [TestMethod]
        public void Create_A_Invalid_New_User_Entity_Setting_Lifes_Less_Than_Zero()
        {
            var user = new User(70, 100, -3, DateTime.Now);
            Assert.IsFalse(user.Validate());
            Assert.IsTrue(user.Messages.Count > 0);
            Assert.IsTrue(user.FacebookId == 70);
            Assert.IsTrue(user.Record == 100);
            Assert.IsTrue(user.Lifes == -3);
            Assert.IsTrue(user.LastLogin.Hour == DateTime.Now.Hour);
            Assert.IsTrue(user.LastLogin.Day == DateTime.Now.Day);
            Assert.IsTrue(user.LastLogin.Month == DateTime.Now.Month);
            Assert.IsTrue(user.LastLogin.Year == DateTime.Now.Year);
        }
        [TestMethod]
        public void Create_A_Invalid_New_User_Entity_Setting_Record_Less_Than_Zero()
        {
            var user = new User(70, -100, 30, DateTime.Now);
            Assert.IsFalse(user.Validate());
            Assert.IsTrue(user.Messages.Count > 0);
            Assert.IsTrue(user.FacebookId == 70);
            Assert.IsTrue(user.Record == -100);
            Assert.IsTrue(user.Lifes == 30);
            Assert.IsTrue(user.LastLogin.Hour == DateTime.Now.Hour);
            Assert.IsTrue(user.LastLogin.Day == DateTime.Now.Day);
            Assert.IsTrue(user.LastLogin.Month == DateTime.Now.Month);
            Assert.IsTrue(user.LastLogin.Year == DateTime.Now.Year);
        }
        [TestMethod]
        public void SetNewLogin_To_A_Valid_User_LastLogin_Should_Be_Current_Time()
        {
            var user = new User(70, 100, 3, DateTime.Now.AddDays(-10));
            user.SetNewLogin();
            Assert.IsTrue(user.Validate());
            Assert.IsFalse(user.Messages.Count > 0);
            Assert.IsTrue(user.FacebookId == 70);
            Assert.IsTrue(user.Record == 100);
            Assert.IsTrue(user.Lifes == 3);
            Assert.IsTrue(user.LastLogin.Hour == DateTime.Now.Hour);
            Assert.IsTrue(user.LastLogin.Day == DateTime.Now.Day);
            Assert.IsTrue(user.LastLogin.Month == DateTime.Now.Month);
            Assert.IsTrue(user.LastLogin.Year == DateTime.Now.Year);
        }
        [TestMethod]
        public void SetNewRecord_To_A_Valid_User_Record_Should_Be_The_New_Value()
        {
            var user = new User(70, 100, 3, DateTime.Now);
            user.SetNewRecord(200);
            Assert.IsTrue(user.Validate());
            Assert.IsFalse(user.Messages.Count > 0);
            Assert.IsTrue(user.FacebookId == 70);
            Assert.IsTrue(user.Record == 200);
            Assert.IsTrue(user.Lifes == 3);
            Assert.IsTrue(user.LastLogin.Hour == DateTime.Now.Hour);
            Assert.IsTrue(user.LastLogin.Day == DateTime.Now.Day);
            Assert.IsTrue(user.LastLogin.Month == DateTime.Now.Month);
            Assert.IsTrue(user.LastLogin.Year == DateTime.Now.Year);
        }
        [TestMethod]
        public void AddLifes_Without_Passing_Any_Value_To_A_Valid_User_Lifes_Should_Be_The_Old_Value_More_Three()
        {
            var user = new User(70, 100, 3, DateTime.Now);
            user.AddLifes();
            Assert.IsTrue(user.Validate());
            Assert.IsFalse(user.Messages.Count > 0);
            Assert.IsTrue(user.FacebookId == 70);
            Assert.IsTrue(user.Record == 100);
            Assert.IsTrue(user.Lifes == 6);
            Assert.IsTrue(user.LastLogin.Hour == DateTime.Now.Hour);
            Assert.IsTrue(user.LastLogin.Day == DateTime.Now.Day);
            Assert.IsTrue(user.LastLogin.Month == DateTime.Now.Month);
            Assert.IsTrue(user.LastLogin.Year == DateTime.Now.Year);
        }
        [TestMethod]
        public void AddLifes_Two_Lifes_To_A_Valid_User_Lifes_Should_Be_The_Old_Value_More_Two()
        {
            var user = new User(70, 100, 3, DateTime.Now);
            user.AddLifes(2);
            Assert.IsTrue(user.Validate());
            Assert.IsFalse(user.Messages.Count > 0);
            Assert.IsTrue(user.FacebookId == 70);
            Assert.IsTrue(user.Record == 100);
            Assert.IsTrue(user.Lifes == 5);
            Assert.IsTrue(user.LastLogin.Hour == DateTime.Now.Hour);
            Assert.IsTrue(user.LastLogin.Day == DateTime.Now.Day);
            Assert.IsTrue(user.LastLogin.Month == DateTime.Now.Month);
            Assert.IsTrue(user.LastLogin.Year == DateTime.Now.Year);
        }
        [TestMethod]
        public void Add_Less_Five_Lifes_To_A_User_With_Three_Lifes_This_User_Should_Become_Invalid()
        {
            var user = new User(70, 100, 3, DateTime.Now);
            user.AddLifes(-5);
            Assert.IsFalse(user.Validate());
            Assert.IsTrue(user.Messages.Count > 0);
            Assert.IsTrue(user.FacebookId == 70);
            Assert.IsTrue(user.Record == 100);
            Assert.IsTrue(user.Lifes == -2);
            Assert.IsTrue(user.LastLogin.Hour == DateTime.Now.Hour);
            Assert.IsTrue(user.LastLogin.Day == DateTime.Now.Day);
            Assert.IsTrue(user.LastLogin.Month == DateTime.Now.Month);
            Assert.IsTrue(user.LastLogin.Year == DateTime.Now.Year);
        }

    }
}
