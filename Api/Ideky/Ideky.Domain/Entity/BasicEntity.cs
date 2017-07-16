using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ideky.Domain.Entity
{
    public abstract class BasicEntity
    {
        public List<string> Messages { get; private set; }

        public BasicEntity()
        {
            Messages = new List<string>();
        }
        //List<string> Messages { get; }

        //bool Validate();
    }
}
