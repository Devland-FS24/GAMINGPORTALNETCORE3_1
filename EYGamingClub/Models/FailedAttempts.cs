using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class FailedAttempts
    {
        public int FailedAttemptId { get; set; }
        public int? GameSessionId { get; set; }
        public int? PlayerId { get; set; }
        public string Card { get; set; }
        public string QuestionsAsked { get; set; }
        public DateTime? Date { get; set; }

        public virtual GameSessions GameSession { get; set; }
        public virtual Players Player { get; set; }
    }
}
