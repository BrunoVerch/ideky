using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ideky.Api.Models
{
    public class LevelModel
    {
        public int Id { get; set; }
        public int PictureAmount { get; set; }
        public int Duration { get; set; }
        public int Multiplier { get; set; }
    }
}