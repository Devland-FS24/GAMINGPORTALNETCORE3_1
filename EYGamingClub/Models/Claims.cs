using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class Claims
    {
        public int ClaimId { get; set; }
        public DateTime ClaimDate { get; set; }
        public string Gpncode { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int AdminId { get; set; }
        public string ClaimerSlmanagerName { get; set; }
        public string ClaimerSlmanagerEmail { get; set; }
        public string ClaimerSlmanagerGpncode { get; set; }
        public string Resolution { get; set; }
        public string LocationLeadGpncode { get; set; }
        public string LocationLeadEmail { get; set; }

        public virtual Admins Admin { get; set; }
    }
}
