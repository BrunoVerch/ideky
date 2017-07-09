using Ideky.Domain.Entity;
using System;
using System.Collections.Generic;

namespace Ideky.Api.Models
{
    public class GameResultModel
    {
        public long FacebookID { get; set; }
        public int Score { get; set; }
    }
}