using EYGamingClub.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EYGamingClub.EYGamingClubManager
{
    public static class TTTBingoManager
    {

        public static Questions GetQuestionByQuestionId(EYGamingCubContext context, string gamesessionid)
        {
            //Get list of Active questions(status=1)
            var activequestions = context.Questions.Where(x => x.QuestionStatus == 1 && x.GameSessionId==Convert.ToInt32(gamesessionid)).ToList();
            var QuestionsById = new Questions();

            //TO DO: if (activequestions.Count>0 && bingoplayers.Count>0)
            if (activequestions.Count > 0)
            {
                //Get index list of active questions
                var questionindexlist = activequestions.Select(c => c.QuestionId).ToList();

                //Get random question Id from active questions
                var randomquestionId = GetRandomQuestionId(questionindexlist);

                //Get question text from selected question Id
                QuestionsById = context.Questions.Where(x => x.QuestionId == randomquestionId).SingleOrDefault();

                //Mark question as Inactive(status=0)
                DeactivateQuestionByQuestionId(randomquestionId, context);

            }
            else
            {
                //var originalquestion = context.Questions.Where(x => x.QuestionId == 1).SingleOrDefault().QuestionText.ToString();
                QuestionsById.QuestionId = 1;
                QuestionsById.QuestionStatus = 0;
                //TO DO: if(bingoplayers.Count>0)
                //{ 
                //QuestionsById.QuestionText = "Nomorequestions" +"~"+ originalquestion;
                QuestionsById.QuestionText = "Nomorequestions" + "~" + "dummyquestion";
                //}
                //else 
                //{
                //Reactivate question list for the next Bingo session
                //activequestions = context.Questions.ToList();
                //ReactivateQuestionnaire(activequestions, context);
                //}

            }


            return QuestionsById;
        }


        public static string BingoCardCheck(EYGamingCubContext context, string hitsfromplayer)
        {
            var checkedresults = "";

            var playerId = "";
            var playercard = new List<Cards>();
            var questionsmade = new List<Questions>();

            //Get playerId
            string[] tokens = hitsfromplayer.Split(';');
            playerId = tokens[0].ToString();

            //Get Card by PlayerId
            playercard = context.Cards.Include(x => x.Question).Include(y => y.Player).Where(x => x.PlayerId == Convert.ToInt16(playerId)).ToList();

            //Questions made
            questionsmade = context.Questions.Where(p => p.QuestionStatus == 0).ToList();
            var questionm = new Questions();

            //Analyze whether the player actually won the Bingo!
            //RESULTS EXAMPLE:
            //BINGO;PlayerL150_1;228;SAM_True;Emi_True;PowerBI_False;.NET_True;Alteryx_False;FSO_True;
            int i = 0;
            for (i = 1; i < 7; i++)
            {
                questionm = questionsmade.Where(x => x.Answer == tokens[i].ToString()).SingleOrDefault();


                if (questionm != null)
                {
                    checkedresults = checkedresults + tokens[i].ToString() + "_True" + ";";
                }
                else
                {
                    checkedresults = checkedresults + tokens[i].ToString() + "_False" + ";";
                    //break;
                }

            }

            //if(i<7)
            //  checkedresults = playercard[0].Player.PlayerName + ";" + "False" + ";" + hitsfromplayer;
            checkedresults = "BINGO;" + playercard[0].Player.PlayerName + ";" + playerId + ";" + checkedresults;

            return checkedresults;
        }


        public static string GetCardPlayerCheckStatus(EYGamingCubContext context, string playerID, string gamesessionid, string evaluate1, string evaluate2, string evaluate3)
        {
            var checkedcardplayerresults = "";
            var correctanswerscount = 0;
            var questionsaskedls = GetQuestionsAsked(context, gamesessionid);
            var notveluatedline = "grey;---;----|";

            var cardplayerquestions = context.Cards.Include(k => k.Question).Where(s => s.PlayerId == Convert.ToInt32(playerID)).ToList();

            if (evaluate1 != "" && evaluate1 != null && evaluate2 != "" && evaluate2 != null && evaluate3 != "" && evaluate3 != null)
            {
                //ANALYZING A LINE CARD!
                //EVALUATE LINE FIRST, DISCARD THE REST
                var linehasoneright1 = questionsaskedls.Where(d => d.Answer == evaluate1).FirstOrDefault();
                if (linehasoneright1 != null)
                {
                    checkedcardplayerresults = checkedcardplayerresults + linehasoneright1.QuestionText + ";" + linehasoneright1.Answer + ";" + evaluate1 + "|";

                }
                else
                {
                    checkedcardplayerresults = checkedcardplayerresults + "Question not asked" + ";" + "---" + ";" + evaluate1 + "|";

                }

                var linehasoneright2 = questionsaskedls.Where(d => d.Answer == evaluate2).FirstOrDefault();
                if (linehasoneright2 != null)
                {
                    checkedcardplayerresults = checkedcardplayerresults + linehasoneright2.QuestionText + ";" + linehasoneright2.Answer + ";" + evaluate2 + "|";

                }
                else
                {
                    checkedcardplayerresults = checkedcardplayerresults + "Question not asked" + ";" + "---" + ";" + evaluate2 + "|";

                }

                var linehasoneright3 = questionsaskedls.Where(d => d.Answer == evaluate3).FirstOrDefault();
                if (linehasoneright3 != null)
                {
                    checkedcardplayerresults = checkedcardplayerresults + linehasoneright3.QuestionText + ";" + linehasoneright3.Answer + ";" + evaluate3 + "|";

                }
                else
                {
                    checkedcardplayerresults = checkedcardplayerresults + "Question not asked" + ";" + "---" + ";" + evaluate3 + "|";

                }

                //SO FAR, THIS SHOULD RESULT IN:
                //WINNER LINE EXAMPLE: Pregunta5;Emi;Emi|
                //NOT WINNER EXAMPLE:  Question not asked;---;Emi

                //COMPLETE THE THREE REMAINING POSITIONS WITH STRING notveluatedline: grey;---;----|

                checkedcardplayerresults = checkedcardplayerresults + notveluatedline;
            }
            else
            {
                //ANALYZING A BINGO CARD!
                //GROUP CORRECT CARD PLAYER ANSWERS FIRST
                foreach (Cards c in cardplayerquestions.ToList())
                {
                    var playerhasoneright = questionsaskedls.Where(d => d.QuestionId == c.QuestionId).FirstOrDefault();

                    if (playerhasoneright != null)
                    {
                        correctanswerscount++;

                        checkedcardplayerresults = checkedcardplayerresults + playerhasoneright.QuestionText + ";" + playerhasoneright.Answer + ";" + c.Question.Answer + "|";

                        //REMOVE THE CORRECT ONE/S FROM THIS LIST
                        cardplayerquestions.Remove(c);
                    }
                }

                //GROUP INCORRECT CARD PLAYER's ANSWERS LAST 
                if (correctanswerscount < 6)
                {
                    var questionsnotasked = cardplayerquestions;

                    for (int m = 0; m < questionsnotasked.Count(); m++)
                    {
                        checkedcardplayerresults = checkedcardplayerresults + "Question not asked" + ";" + "---" + ";" + questionsnotasked[m].Question.Answer + "|";
                    }
                }

            }

            return checkedcardplayerresults;

        }

        private static List<Questions> GetQuestionsAsked(EYGamingCubContext context, string gamsid)
        {
            var lsqasked = context.Questions.Where(x => x.QuestionStatus == 0 && x.GameSessionId==Convert.ToInt32(gamsid)).ToList();

            return lsqasked;
        }

        public static string LineCardCheck(EYGamingCubContext context, string hitsfromplayer, string gamesessionid)
        {
            var checkedlineresults = "";

            var playerId = "";
            var missingline = "NA_False;NA_False;NA_False";
            var playercard = new List<Cards>();
            var questionsmade = new List<Questions>();
            var currentline = "";
            int i = 0;
            int endofline = 0;

            //Get playerId
            string[] tokens = hitsfromplayer.Split(';');
            playerId = tokens[0].ToString();


            //TO DO: CHECK WHETHER THE PLAYER ALREADY WON THIS LINE...
            //	LINE1	LINE2	BINGO

            //var playerprizecheckls = context.Winners.Where(h => h.PlayerId == Convert.ToInt32(playerId)).ToList();


            //DETERMINE WHICH LINE IS UNDER ANALYSIS
            if (tokens[1].ToString() == "NA")
            {
                //LINE 2 IS UNDER ANALYSIS
                currentline = "LINE2;";
                i = 4;
                endofline = 7;

            }
            else
            {
                //LINE 1 IS UNDER ANALYSIS
                currentline = "LINE1;";
                i = 1;
                endofline = 4;

            }

            //Get Card by PlayerId
            playercard = context.Cards.Include(x => x.Question).Include(y => y.Player).Where(x => x.PlayerId == Convert.ToInt16(playerId)).ToList();

            //Questions made
            questionsmade = context.Questions.Where(p => p.QuestionStatus == 0 && p.GameSessionId==Convert.ToInt32(gamesessionid)).ToList();
            var questionm = new Questions();

            //Analyze whether the player actually won the LINE!
            //RESULTS EXAMPLE:
            //LINE1: 1595;Douglas;PowerBI;Emi;NA;NA;NA
            //OR
            //LINE2: 1595;NA;NA;NA;Douglas;PowerBI;Emi

            for (; i < endofline; i++)
            {
                questionm = questionsmade.Where(x => x.Answer == tokens[i].ToString()).SingleOrDefault();


                if (questionm != null)
                {
                    checkedlineresults = checkedlineresults + tokens[i].ToString() + "_True" + ";";
                }
                else
                {
                    checkedlineresults = checkedlineresults + tokens[i].ToString() + "_False" + ";";

                }

            }

            if (currentline == "LINE1;")
            {
                checkedlineresults = currentline + playercard[0].Player.PlayerName + ";" + playerId + ";" + checkedlineresults + missingline;
            }
            {
                if (currentline == "LINE2;")
                {
                    checkedlineresults = currentline + playercard[0].Player.PlayerName + ";" + playerId + ";" + missingline + ";" + checkedlineresults;
                }
            }

            return checkedlineresults;
        }

        public static string CardForNewPlayer(EYGamingCubContext context)
        {
            //Initialize list of answers for the current card being created
            var cardnewplayer = "";
            var randomanswer = new Questions();

            //Get full index list of questions
            var allquestions = context.Questions.ToList();
            var questionindexlist = allquestions.Select(c => c.QuestionId).ToList();
            var randomquestionId = 0;

            //Get first random questionId
            randomquestionId = GetRandomQuestionId(questionindexlist);

            //Ensure the same answer won't be repeated on the card for the current new player
            questionindexlist.Remove(randomquestionId);

            //Initialize first answer
            randomanswer = allquestions.Where(x => x.QuestionId.Equals(randomquestionId)).SingleOrDefault();

            //Add separator ";" 
            cardnewplayer = randomanswer.Answer + "_" + randomanswer.QuestionId + ";";

            //Get 5 additional random questionIds
            for (int i = 0; i < 5; i++)
            {
                randomquestionId = GetRandomQuestionId(questionindexlist);
                questionindexlist.Remove(randomquestionId);

                //Extract the answers from those random questions
                randomanswer = allquestions.Where(x => x.QuestionId.Equals(randomquestionId)).SingleOrDefault();
                //Create a string by concatenating those answers with ";" as separator
                cardnewplayer = cardnewplayer + randomanswer.Answer + "_" + randomanswer.QuestionId + ";";
            }

            //Return randomly selected answers for the new card
            return cardnewplayer;
        }

        private static int GetRandomQuestionId(List<int> questionlist)
        {
            Random r = new Random();
            int randomquestionId = 0;

            randomquestionId = questionlist.OrderBy(x => r.Next()).Take(1).SingleOrDefault();

            return randomquestionId;
        }

        private static int DeactivateQuestionByQuestionId(int QuestionId, EYGamingCubContext context)
        {
            var QuestionsById = context.Questions.Where(x => x.QuestionId == QuestionId).SingleOrDefault();
            QuestionsById.QuestionStatus = 0;
            var success = 1;

            return success;
        }

        private static int ReactivateQuestionnaire(List<Questions> questionnaire, EYGamingCubContext context)
        {
            foreach (Questions q in questionnaire)
            {
                q.QuestionStatus = 1;
                //if (QuestionsById.QuestionText.Contains("Nomorequestions"))
                //{
                //Remove mark("Nomorequestions") and restore original question                
                //QuestionsById.QuestionText = "Nomorequestions";
                //}
            }
            var success = 1;

            return success;
        }
    }
}
