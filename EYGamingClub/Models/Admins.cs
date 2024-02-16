using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class Admins
    {
        public Admins()
        {
            Claims = new HashSet<Claims>();
            GameSessions = new HashSet<GameSessions>();
        }

        public int AdminId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Gpncode { get; set; }
        public DateTime CreationDate { get; set; }

        public virtual ICollection<Claims> Claims { get; set; }
        public virtual ICollection<GameSessions> GameSessions { get; set; }
    }
}
