using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class Cards
    {
        public int QuestionPlayerId { get; set; }
        public int? GameSessionId { get; set; }
        public int QuestionId { get; set; }
        public int PlayerId { get; set; }
        public bool? Hit { get; set; }

        public virtual GameSessions GameSession { get; set; }
        public virtual Players Player { get; set; }
        public virtual Questions Question { get; set; }
    }
}
