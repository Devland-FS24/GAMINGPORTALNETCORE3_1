using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class GameEvent
    {
        public int EventId { get; set; }
        public int? GameSessionId { get; set; }
        public string NextQstatus { get; set; }
        public bool? GameOnOff { get; set; }
        public string EventType { get; set; }

        public virtual GameSessions GameSession { get; set; }
    }
}
