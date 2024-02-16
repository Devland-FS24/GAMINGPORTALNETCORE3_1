using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class Players
    {
        public Players()
        {
            Cards = new HashSet<Cards>();
            FailedAttempts = new HashSet<FailedAttempts>();
            Winners = new HashSet<Winners>();
        }

        public int PlayerId { get; set; }
        public int? GameSessionId { get; set; }
        public string PlayerName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Gpncode { get; set; }

        public virtual GameSessions GameSession { get; set; }
        public virtual ICollection<Cards> Cards { get; set; }
        public virtual ICollection<FailedAttempts> FailedAttempts { get; set; }
        public virtual ICollection<Winners> Winners { get; set; }
    }
}
