using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class GameSessions
    {
        public GameSessions()
        {
            Cards = new HashSet<Cards>();
            FailedAttempts = new HashSet<FailedAttempts>();
            GameEvent = new HashSet<GameEvent>();
            Players = new HashSet<Players>();
            Questions = new HashSet<Questions>();
            Winners = new HashSet<Winners>();
        }

        public int GameSessionId { get; set; }
        public string Name { get; set; }
        public string GameType { get; set; }
        public int AdminId { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Observations { get; set; }

        public virtual Admins Admin { get; set; }
        public virtual ICollection<Cards> Cards { get; set; }
        public virtual ICollection<FailedAttempts> FailedAttempts { get; set; }
        public virtual ICollection<GameEvent> GameEvent { get; set; }
        public virtual ICollection<Players> Players { get; set; }
        public virtual ICollection<Questions> Questions { get; set; }
        public virtual ICollection<Winners> Winners { get; set; }
    }
}
