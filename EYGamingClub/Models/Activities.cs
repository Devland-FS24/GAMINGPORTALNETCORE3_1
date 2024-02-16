using System;
using System.Collections.Generic;

namespace EYGamingClub.Models
{
    public partial class Activities
    {
        public int ActivityId { get; set; }
        public string Gpncode { get; set; }
        public string EmployeeType { get; set; }
        public string ActivityType { get; set; }
        public DateTime ActivityDate { get; set; }
        public string Observations { get; set; }
    }
}
