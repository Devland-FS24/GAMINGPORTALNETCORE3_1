using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EYGamingClub.Models
{
    public class Repository

    {

        public static List<ModelTest> GetData()

        {

            List<ModelTest> list = new List<ModelTest>

            {

                new ModelTest

                {

                    ID = 1,

                    Name = "Rohit",

                    ImageUrl = "../../Images/1.jpg"

                },

                new ModelTest

                {

                    ID = 2,

                    Name = "Arun",

                    ImageUrl = "../../Images/2.jpg"

                },

                new ModelTest

                {

                    ID = 3,

                    Name = "Rahul",

                    ImageUrl = "../../Images/3.jpg"

                }

            };



            return list;

        }

    }
}
