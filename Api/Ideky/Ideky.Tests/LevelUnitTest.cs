using Ideky.Domain.Entity;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Ideky.Tests
{
    [TestClass]
    public class LevelUnitTest
    {
        [TestMethod]
        public void Create_Valid_Level_Entity()
        {
            var level = new Level(100, 10, 30, 2);
            Assert.IsTrue(level.Validate());
            Assert.IsFalse(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Create_Invalid_Level_Entity_With_LevelNumber_Less_Than_Zero()
        {
            var level = new Level(-1, 10, 30, 2);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Create_Invalid_Level_Entity_With_LevelNumber_Zero()
        {
            var level = new Level(0, 10, 30, 2);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Create_Invalid_Level_Entity_With_PictureAmount_Less_Than_Zero()
        {
            var level = new Level(100, -10, 30, 2);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Create_Invalid_Level_Entity_With_PictureAmount_Zero()
        {
            var level = new Level(100, 0, 30, 2);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Create_Invalid_Level_Entity_With_Duration_Less_Than_Zero()
        {
            var level = new Level(100, 10, -30, 2);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Create_Invalid_Level_Entity_With_Duration_Zero()
        {
            var level = new Level(100, 10, 0, 2);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Create_Invalid_Level_Entity_With_Multiplier_Less_Than_Zero()
        {
            var level = new Level(100, 10, 30, -2);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Create_Invalid_Level_Entity_With_Multiplier_Zero()
        {
            var level = new Level(100, 10, 30, 0);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Update_Level_Difficult_With_Multiplier_Duration_And_PictureAmount_Zero()
        {
            var level = new Level(100, 10, 30, 2);
            level.UpdateLevelDifficult(0, 0, 0);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Update_Level_Difficult_With_Multiplier_Duration_And_PictureAmount_Less_Than_Zero()
        {
            var level = new Level(100, 10, 30, 2);
            level.UpdateLevelDifficult(-100, -20, -30);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Update_Level_Difficult_With_PictureAmount_Less_Than_Zero()
        {
            var level = new Level(100, 10, 30, 2);
            level.UpdateLevelDifficult(-100, 20, 30);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Update_Level_Difficult_With_Duration_Less_Than_Zero()
        {
            var level = new Level(100, 10, 30, 2);
            level.UpdateLevelDifficult(15, -20, 30);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Update_Level_Difficult_With_Multiplier_Less_Than_Zero()
        {
            var level = new Level(100, 10, 30, 2);
            level.UpdateLevelDifficult(105, 20, -30);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Update_Level_Difficult_With_Multiplier_And_Duration_Zero()
        {
            var level = new Level(100, 10, 30, 2);
            level.UpdateLevelDifficult(105, 0, 0);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Update_Level_Difficult_With_PictureAmount_And_Duration_Zero()
        {
            var level = new Level(100, 10, 30, 2);
            level.UpdateLevelDifficult(0, 0, 5);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Update_Level_Difficult_With_PictureAmount_Duration_And_Multiplier_Zero()
        {
            var level = new Level(100, 10, 30, 2);
            level.UpdateLevelDifficult(0, 0, 0);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
        [TestMethod]
        public void Update_Level_Difficult_With_PictureAmount_And_Multiplier_Zero()
        {
            var level = new Level(100, 10, 30, 2);
            level.UpdateLevelDifficult(0, 15, 0);
            Assert.IsFalse(level.Validate());
            Assert.IsTrue(level.Messages.Count > 0);
        }
    }
}
