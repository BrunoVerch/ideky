using System;
using System.Collections.Generic;

namespace Ideky.Domain.Entity
{
    public class Level : IBasicEntity
    {
        public int Id { get; private set; }
        public int LevelNumber { get; private set; }
        public int PictureAmount { get; private set; }
        public int Duration { get; private set; }
        public int Multiplier { get; private set; }

        public List<string> Messages { get; private set; }

        protected Level() { Messages = new List<string>(); }

        public Level(int levelNumber, int pictureAmount, int duration, int multiplier)
        {
            Id = 0;
            LevelNumber = levelNumber;
            PictureAmount = pictureAmount;
            Duration = duration;
            Multiplier = multiplier;
            Messages = new List<string>();
        }

        public void UpdateLevelDifficult(int pictureAmount, int duration, int multiplier)
        {
            PictureAmount = pictureAmount;
            Duration = duration;
            Multiplier = multiplier;
        }

        public bool Validate()
        {
            if (LevelNumber <= 0)
            {
                Messages.Add("Nível inválido.");
            }
            if (PictureAmount <= 0)
            {
                Messages.Add("Quantidade de imagens inválida.");
            }
            if (Duration <= 0)
            {
                Messages.Add("Tempo de duração inválido!");
            }
            if (Multiplier <= 0)
            {
                Messages.Add("Multiplicador inválido!");
            }
            return Messages.Count == 0;
        }
    }
}
