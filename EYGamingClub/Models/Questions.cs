using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class Questions
    {
        public Questions()
        {
            Cards = new HashSet<Cards>();
        }

        public int QuestionId { get; set; }
        public int? GameSessionId { get; set; }
        public string QuestionText { get; set; }
        public int QuestionStatus { get; set; }
        public string Answer { get; set; }

        public virtual GameSessions GameSession { get; set; }
        public virtual ICollection<Cards> Cards { get; set; }
    }
}
