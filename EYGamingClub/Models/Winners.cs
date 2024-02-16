using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class Winners
    {
        public int WinnerId { get; set; }
        public int GameSessionId { get; set; }
        public string Email { get; set; }
        public string PrizeType { get; set; }
        public int Score { get; set; }
        public int PlayerId { get; set; }
        public string Gpncode { get; set; }
        public string FullName { get; set; }
        public string PlayerNick { get; set; }

        public virtual GameSessions GameSession { get; set; }
        public virtual Players Player { get; set; }
    }
}
