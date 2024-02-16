using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class Audits
    {
        public int AuditId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Gpncode { get; set; }
        public DateTime CreationDate { get; set; }
        public string SlauthGpncode { get; set; }
        public string LocationLeadAuthGpncode { get; set; }
    }
}
