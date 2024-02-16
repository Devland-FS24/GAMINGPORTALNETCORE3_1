using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Web;
using System.Net;
using Microsoft.AspNetCore.Http;
using EYGamingClub.Models;
using EYGamingClub.EYGamingClubManager;

namespace EYGamingClub.Controllers
{
    public class TTTBingoController : Controller
    {
        //******** Event Types *************
        //1: Bingo Card posted for Administrative check
        //2: THERE ARE LINE WINNERS!
        //3: Line Card posted for Administrative check
        //4: THERE ARE BINGO WINNERS!
        //5: GAME MODE LINE.
        //6: GAME MODE BINGO.
        //7: GAME OVER(PLAYER WON BINGO).
        //8: END GAME(THERE ARE NO MORE QUESTIONS)
        //9: Bingo theme has been set.

        //10: Activate Next Question
        //11: THERE ARE NO WINNERS FOR THIS ROUND...
       

        private readonly EYGamingCubContext _context;

        public TTTBingoController(EYGamingCubContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            //var questionsBackend = _context.Questions.ToList();
            //ViewBag.QBackendList = questionsBackend;
            return View();
        }

        [HttpGet]
        public ActionResult RefreshQTable(int dummy)
        {


            Questions _dummy = new Questions();
            _dummy.QuestionId = 999;
            _dummy.QuestionText = "dummyquestion";
            _dummy.QuestionStatus = 1;
            _dummy.Answer = "testanswer";

            return PartialView("tblQuestions", _dummy);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> AddEditQuestion(string questionsid, string questiontext, string answer, string questionqstatus)
        {
            var EditedQuestion = new Questions();
            var message1 = "Error";
            var _Question = new Questions();

            var gamesessionid = "";
            string[] arrnewtrivia = questionsid.Split(';');

            if(arrnewtrivia.Length>1)
            {
                if(arrnewtrivia[0]== "NEWGAMETRIVIA")
                {
                    gamesessionid = arrnewtrivia[1];

                    _Question.GameSessionId = Convert.ToInt32(gamesessionid);
                    _Question.QuestionText = questiontext;
                    _Question.QuestionStatus = 1;
                    _Question.Answer = answer;

                }
            }
            else
            {
                if (questionsid == "0")
                {
                    //NEW QUESTION
                    _Question.QuestionText = questiontext;
                    _Question.QuestionStatus = 1;
                    _Question.Answer = answer;

                }
                else
                {                                                   
                    EditedQuestion = _context.Questions.Where(p => p.QuestionId == Convert.ToInt32(questionsid)).FirstOrDefault();
                    //EDIT QUESTION

                    if (EditedQuestion != null)
                    {
                        EditedQuestion.QuestionText = questiontext;

                        if (questionqstatus!=null)
                        {
                           EditedQuestion.QuestionStatus = Convert.ToInt32(questionqstatus);
                        }
                        
                        EditedQuestion.Answer = answer;
                    }

                }

            }

            if (ModelState.IsValid)
            {
                //if (_Question != null && questionsid == "0")
                //arrnewtrivia[0]== "NEWGAMETRIVIA"
                if (arrnewtrivia[0] == "NEWGAMETRIVIA")
                {
                    _context.Add(_Question);

                    message1 = "Success";

                }
                else
                {
                    if (EditedQuestion != null)
                        _context.Update(EditedQuestion);

                    message1 = "EditSuccess" + ";" + EditedQuestion.GameSessionId;

                }

                await _context.SaveChangesAsync();
                //message1 = "Success";
            }



            Response.Headers.Add("JSonAddEditQuestionResult", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
            //return Json(new { Result = message1 });
        }


        [HttpPost]
        public async Task<HttpResponseMessage> RegisterFailedAttempt(string failedattemptplayerid)
        {
            var message1 = "Error";
            var playercardstring = "";
            var questionsaskeduntilnow = "";
            var objNotWinner = new FailedAttempts();
            objNotWinner.FailedAttemptId = 0;
            objNotWinner.PlayerId = Convert.ToInt32(failedattemptplayerid);
            //objNotWinner. = winerplayerprize;

            //GET MISSING INFORMATION FROM PLAYER TABLE:

            var failedbyplayerid = await _context.Players.Include(cx=>cx.Cards).Where(f => f.PlayerId == Convert.ToInt32(failedattemptplayerid)).FirstOrDefaultAsync();

            objNotWinner.GameSessionId = Convert.ToInt32(failedbyplayerid.GameSessionId);
            objNotWinner.PlayerId = Convert.ToInt32(failedattemptplayerid);

            var playerscard = failedbyplayerid.Cards;

            foreach(Cards c in playerscard.ToList())
            {
                var failedplayerq = await _context.Questions.Where(fq => fq.QuestionId == c.QuestionId).FirstOrDefaultAsync();
                playercardstring = playercardstring + failedplayerq.QuestionText + ";" + failedplayerq.Answer + "|";
            
            }

            objNotWinner.Card = playercardstring;

            var qaskedatthistime = await _context.Questions.Where(qatime => qatime.QuestionStatus == 0).ToListAsync();

            foreach(Questions q in qaskedatthistime.ToList())
            {
                questionsaskeduntilnow = questionsaskeduntilnow + q.QuestionText + ";" + q.Answer + "|";
            }

            objNotWinner.QuestionsAsked = questionsaskeduntilnow;


            objNotWinner.Date = DateTime.Now;


            if (ModelState.IsValid)
            {
                if (objNotWinner!= null && objNotWinner.FailedAttemptId==0)
                    _context.Add(objNotWinner);

                await _context.SaveChangesAsync();

                message1 = "OK";
            }

           

            Response.Headers.Add("JSonRegisterWinnerOfficialResult", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }



        [HttpPost]
        public async Task<HttpResponseMessage> RegisterWinnerOfficial(string winerplayerid, string winerplayerprize)
        {
            var message1 = "Error";

            var objWinner = new Winners();
            objWinner.PlayerId = Convert.ToInt32(winerplayerid);
            objWinner.PrizeType = winerplayerprize;

            //GET MISSING INFORMATION FROM PLAYER TABLE:

            var winnerbyplayerid = _context.Players.Where(f => f.PlayerId == Convert.ToInt32(winerplayerid)).FirstOrDefault();

            objWinner.GameSessionId = Convert.ToInt32(winnerbyplayerid.GameSessionId);
            objWinner.Email = winnerbyplayerid.Email;
            objWinner.FullName = winnerbyplayerid.FullName;
            objWinner.Gpncode = winnerbyplayerid.Gpncode;
            objWinner.PlayerNick = winnerbyplayerid.PlayerName;



            //TO DO: SEARCH BY GPN FOR PREVIOUS PRIZES AND:
            //MULTIPLY FOR EACH EXISTING LINE PRIZE AND ADD TO CURRENT PRIZE
            //EXAMPLE: FOR 5 PREVIOUS LINE PRIZES, MULTIPLY (5*LINEPRIZESCORE) + LINE PRIZE
            //         FOR BINGO: 10*BINGOPRIZESCORE) + BINGO PRIZE
            //THRE HIGHEST SCORES FOR CURRENT GAME
            //FIRST PLACE(CURRENT GAME): BINGO + LINE
            //SECOND PLACE(CURRENT GAME):BINGO + LINE
            //THIRD PLACE(CURRENT GAME): BINGO + LINE
            //HALL OF FAME: 
            //             HIGHEST BINGO SCORE IN TOTAL(INCLUDING 2 PREVIOUS)
            //             HIGHEST LINE SCORE IN TOTAL(INCLUDING 2 PREVIOUS)


            if (winerplayerprize == "LINE1" || winerplayerprize == "LINE2")
            {
                objWinner.Score = 100;
            }
            else
            {
                if (winerplayerprize == "BINGO")
                {
                    objWinner.Score = 1000;
                }
            }

            if (ModelState.IsValid)
            {
                if (objWinner != null)
                    _context.Add(objWinner);

                await _context.SaveChangesAsync();

            }

            var newwinner = _context.Winners.Where(l => l.PlayerId == Convert.ToInt32(winerplayerid)).FirstOrDefault();

            message1 = newwinner.WinnerId.ToString();

            Response.Headers.Add("JSonRegisterWinnerOfficialResult", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [HttpPost]
        public async Task<HttpResponseMessage> JoinNewPlayerToNewGameSession(string newjoinerid, string gameid)
        {
            //THIS METHOD IS ONLY FOR PLAYERS....
            var message1 = "Error";
            var playerhits = "";
            var gamehasadmin = new List<Admins>();
            var newjoinerbyplayerid = new Players();
            var additionaldatabyadminid = new Admins();
            var gamename = "";
            var gamesessionidplayer = "";
            //var gamestatusresults = "";
            var gamestatuslocal = new List<GameEvent>();


            //newjoinerid= "playerid;PLAYER"
            string[] arrplayerfromui = newjoinerid.Split(';');

            var newjoinerplayerid = arrplayerfromui[0];
           

            //gameid
            string[] arrgamekey = gameid.Split('_');

            if (arrgamekey.Length == 2)
            {
                 gamename = arrgamekey[0];
                 gamesessionidplayer = arrgamekey[1];


                if (gamesessionidplayer != null && Convert.ToInt32(gamesessionidplayer) > 0)
                {
                    var issessionvalid = await _context.GameSessions.Where(gs => gs.GameSessionId == Convert.ToInt32(gamesessionidplayer)).FirstOrDefaultAsync();

                    if (issessionvalid != null)
                    {
                        gamestatuslocal = _context.GameEvent.Where(st => st.GameSessionId == Convert.ToInt32(gamesessionidplayer)).ToList();
                    }
                    else
                    {
                        message1 = "INVALIDSESSIONID";
                    }
                }
                else
                {
                    message1 = "INVALIDSESSIONID";
                }
            }
            else
            {
                message1 = "INVALIDSESSIONID";
            }
   
            if (gamestatuslocal.Count()==0 && message1 != "INVALIDSESSIONID")
            {
                //A GAME SESSION EXISTS, BUT THE GAME HASN'T STARTED YET
                //THERE IS NO GAME EVENT CREATED YET FOR THIS GAME.
                //SO, THE BINGO PROGRAM FLOW, CANNOT START.


                    //SINCE THE GAME HASN'T STARTED, PLAYERS CAN CONTINUE ENTERING THE GAME IN ORDER
                    //TO PARTICIPATE....

                    message1 = "GameIsOFF";

                    newjoinerbyplayerid = _context.Players.Where(hn => hn.PlayerId == Convert.ToInt32(newjoinerplayerid)).FirstOrDefault();

               

                if (ModelState.IsValid)
                {

                    newjoinerbyplayerid.GameSessionId = Convert.ToInt32(gamesessionidplayer);

                    if (newjoinerbyplayerid != null)
                        _context.Update(newjoinerbyplayerid);

                    await _context.SaveChangesAsync();
                }

            }
            else
            {

                if (gamestatuslocal.Count() > 0)
                {
                    //A GAME SESSION EXISTS AND A GAME EVENT HAS BEEN CREATED IN ORDER
                    //TO START THE BINGO PROGRAM FLOW...

                    message1 = "GameIsON";
                  
                }
            }

            Response.Headers.Add("JSonJoinplayerResult", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }




        [HttpPost]
        public async Task<HttpResponseMessage> RegisterAdditionalDataPlayer(string fromnewplayerid, string addregfname, string addregemail, string addregGPN)
        {

            string[] arrplayertype = fromnewplayerid.Split(';');

            var message1 = "";
            var playerhits = "";
            var gamesessionname = "";
            var gamehasadmin = new List<Admins>();
            var additionaldatabyplayerid = new Players();
            var additionaldatabyadminid = new Admins();

            //---- PLAYER CARD SECTION ---------
            var cardsUI = "";
            var cardsBackend = new List<int>();
            var answerId = "";
            var tokens1len = 0;
            var questionsavailable = new List<Questions>();

            var playercards = "";

            var _PlayerCards = new Cards();

            //---- END PLAYER CARD SECTION -----


            if (arrplayertype[1] == "ADMIN")
                {
                    additionaldatabyadminid = _context.Admins.Where(hn => hn.AdminId == Convert.ToInt32(arrplayertype[0])).FirstOrDefault();

                    additionaldatabyadminid.Email = addregemail;
                    additionaldatabyadminid.Name = addregfname;
                    additionaldatabyadminid.Gpncode = addregGPN;

                    if (ModelState.IsValid)
                    {

                            if (additionaldatabyadminid != null)
                                _context.Update(additionaldatabyadminid);

                            message1 = "ADMIN";
                        
                        await _context.SaveChangesAsync();
                    }


                }
                else
                {
                    if (arrplayertype[1] == "PLAYER")
                    {
                        additionaldatabyplayerid = _context.Players.Where(hn => hn.PlayerId == Convert.ToInt32(arrplayertype[0])).FirstOrDefault();

                        additionaldatabyplayerid.Email = addregemail;
                        additionaldatabyplayerid.FullName = addregfname;
                        additionaldatabyplayerid.Gpncode = addregGPN;


                        if (additionaldatabyplayerid != null)
                            _context.Update(additionaldatabyplayerid);

                         await _context.SaveChangesAsync();
                


                    //THE CARD FOR THE PLAYER WILL BE GENERATED ONCE THE GAME KEY
                    //IS GENERATED BY THE ADMIN.

                    //newjoinerbyplayerid.PlayerId + ";" + objgameses.Name + ";" + gameid + ";" + playernickname + ";" + playerhits;
                        var playergamesession = await _context.GameSessions.Where(pgn => pgn.GameSessionId == additionaldatabyplayerid.GameSessionId).FirstOrDefaultAsync();
                    
                        string[] arrplayermsg = additionaldatabyplayerid.PlayerName.Split('_');


                        message1 = additionaldatabyplayerid.PlayerId.ToString() + ";" + playergamesession.Name + ";" + playergamesession.GameSessionId.ToString() + ";" + arrplayermsg[0];

                        playercards = TTTBingoManager.CardForNewPlayer(_context);

                    //EXAMPLE: Emi_4; Fabiola_7; Alteryx_8;
                        string[] tokens1 = playercards.Split(';');


                        string[] tokenAnswerId = tokens1[0].Split('_');

                        cardsUI = tokenAnswerId[0].ToString() + ";";


                    //Example: 4;7;8;
                        answerId = tokenAnswerId[1].ToString();
                        cardsBackend.Add(Convert.ToInt16(answerId));

                        tokens1len = tokens1.Length;

                        for (int j = 1; j < tokens1len - 1; j++)
                        {

                            //Example: PlayerD890;Emi;Fabiola;Alteryx;
                            tokenAnswerId = tokens1[j].Split('_');
                            cardsUI = cardsUI + tokenAnswerId[0].ToString() + ";";

                            //Example: 4;7;8;
                            answerId = tokenAnswerId[1].ToString();
                            cardsBackend.Add(Convert.ToInt16(answerId));
                        }


                        //newjoinerbyplayerid.PlayerId + ";" + objgameses.Name + ";" + gameid + ";" + playernickname + ";" + playerhits;
                        message1 = message1 + ";" + cardsUI;

                        //Register new random card for the new player on the backend     
                        foreach (int cardid in cardsBackend)
                        {
                            _PlayerCards.QuestionPlayerId = 0;
                            _PlayerCards.QuestionId = cardid;
                            _PlayerCards.PlayerId = additionaldatabyplayerid.PlayerId;
                            _PlayerCards.Hit = false;
                            _PlayerCards.GameSessionId = additionaldatabyplayerid.GameSessionId;

                            if (ModelState.IsValid)
                            {
                                if (_PlayerCards != null && _PlayerCards.QuestionPlayerId == 0)
                                {
                                    _context.Add(_PlayerCards);
                                }

                                await _context.SaveChangesAsync();
                            }
                        }

                    }
                }

            Response.Headers.Add("JSonRegisterAdditionalDataPlayerResult", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [HttpPost]
        public async Task<HttpResponseMessage> CreateNewGameSession(string gameadminId, string gamename, string gamedesc, string gametype, string gameobs)
        {
            //THIS METHOD IS ONLY FOR ADMINS....
            string[] arrplayertype = gameadminId.Split(';');

            var message1 = "Error" + ";NODATA";
            
            var newgameisunique = new List<GameSessions>();
            var newgamesession = new GameSessions();
            var duplicateadmin = new Admins();
            //var newquestionslist = new List<Questions>();

            var adminfornewgame = _context.Admins.Where(df=>df.AdminId==Convert.ToInt32(arrplayertype[0])).FirstOrDefault();

            newgameisunique = await _context.GameSessions.Where(vb => vb.Name == gamename).ToListAsync();

            
            if (newgameisunique!=null && newgameisunique.Count()>1)
            {
                //A GAME WITH THE SAME NAME YOU'RE TRYING TO CREATE, ALREADY EXISTS.
                message1 = "ONLYONEGAMENAME" + ";NODATA";
            }
            else
            {

                //PROCEED TO CREATE NEW GAME SESSION...
                //string gameadminId, string gamename, string gamedesc, string gametype
                newgamesession.GameSessionId = 0;
                newgamesession.Name = gamename;
                newgamesession.Description = gamedesc;
                newgamesession.GameType = gametype;
                newgamesession.AdminId = Convert.ToInt32(arrplayertype[0]);
                newgamesession.Date = DateTime.Now;
                newgamesession.Observations = gameobs;

                if (ModelState.IsValid)
                {
                    if (newgamesession != null && newgamesession.GameSessionId == 0)
                        _context.Add(newgamesession);

                    await _context.SaveChangesAsync();

                    if (gametype == "CLASSIC")
                    {
                        //AUTOMATICALLY CREATE 15 ENTRIES IN THE QUESTIONS TABLE WITH NUMBERS 1..15
                        for(int i=1;i<16;i++)
                        {
                            var newclassicbingoentry = new Questions();
                            newclassicbingoentry.QuestionId = 0;
                            newclassicbingoentry.GameSessionId = newgamesession.GameSessionId;
                            newclassicbingoentry.QuestionText = i.ToString();
                            newclassicbingoentry.QuestionStatus = 1;
                            newclassicbingoentry.Answer= i.ToString();

                            if (newclassicbingoentry != null && newclassicbingoentry.QuestionId == 0)
                                _context.Add(newclassicbingoentry);

                            await _context.SaveChangesAsync();

                            message1 = "NEWGAMECLASSIC" + ";" + gamename + "_" + newgamesession.GameSessionId.ToString() + "_" + adminfornewgame.Name;
                        }

                    }
                    else
                    {
                        if (gametype == "TRIVIA")
                        {
                            //message1 = "NEWGAMETRIVIA" + ";NODATA";

                            message1 = "NEWGAMETRIVIA" + ";" + gamename + "_" + newgamesession.GameSessionId.ToString() + "_" + adminfornewgame.Name;

                        }
                    }
                }
            }

            Response.Headers.Add("JSonCreateNewGameSessionResult", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpGet]
        public async Task<HttpResponseMessage> VerifyQuestionsLoaded(string gamesessionId)
        {
            //THIS METHOD IS ONLY FOR ADMINS....
            var message1 = "";
            var questionsloaded = await _context.Questions.Where(ql => ql.GameSessionId == Convert.ToInt32(gamesessionId)).ToListAsync();

            if(questionsloaded!=null && questionsloaded.Count()>14)
            {
                message1 = "QUESTIONSLOADED";
            }


            Response.Headers.Add("JSonVerifyQuestionsLoadedResult", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }



        [HttpPost]
        public async Task<IActionResult> QuestionSaveUpdate(string gid)
        {

            var message1 = "";
            var nextQuestion = new GameEvent();

            var officialwinnernomorequestions = "";


            //Gets random question object.
            var questiontodisplay = TTTBingoManager.GetQuestionByQuestionId(_context, gid);

            if (questiontodisplay.QuestionText.Contains("Nomorequestions"))
            {
                string[] tokens = questiontodisplay.QuestionText.Split('~');
                message1 = tokens[0].ToString();

                //GETS THE ACTUAL OFFICIAL WINNERS LIST
                var currentofficialwinnersnmquestions = await _context.Winners.Where(wsid=>wsid.GameSessionId==Convert.ToInt32(gid)).ToListAsync();

                if (currentofficialwinnersnmquestions != null && currentofficialwinnersnmquestions.Count() > 0)
                {
                    foreach (Winners wix in currentofficialwinnersnmquestions)
                    {
                        officialwinnernomorequestions = officialwinnernomorequestions + wix.PlayerNick + ";";
                    }
                }
                else
                {
                    officialwinnernomorequestions = "NoWinnersTotal";
                }

                //IN CASE THERE ARE NO MORE QUESTIONS, RETURNS THAT MESSAGE PLUS THE ENTIRE LIST OF WINNERS
                //IN ORDER TO DISPLAY A SUMMARY TO THE ADMIN SCREEN.
                message1 = message1 + ";" + officialwinnernomorequestions;


            }
            else
            {

                if (ModelState.IsValid)
                {
                    if (questiontodisplay != null)
                    {
                        _context.Update(questiontodisplay);
                        await _context.SaveChangesAsync();
                        message1 = questiontodisplay.QuestionText;


                        //Insert Next Question in GameEvent, so the players can get it once wheel of fortune stops spinning

                        var lsnextQuestion = await _context.GameEvent.ToListAsync();

                        lsnextQuestion[0].NextQstatus = questiontodisplay.QuestionText;


                        if (lsnextQuestion != null)
                        {

                            _context.Update(lsnextQuestion[0]);
                            await _context.SaveChangesAsync();

                        }
                    }
                }
            }


            Response.Headers["JSonQuestionResults"] = message1;
            return Json(new { Result = message1 });
        }



        [HttpPost]
        public async Task<HttpResponseMessage> RemoveAllRemainingActivePlayers(string playerId)
        {
            var message1 = "";
            var modifyplayerStatus = "";
            string[] arrplayerStatus;

            var allremainingactiveplayers = await _context.Players.Where(x => x.PlayerName.Contains("_1")).ToListAsync();

            if (ModelState.IsValid)
            {
                if (allremainingactiveplayers != null && allremainingactiveplayers.Count() > 0)
                {
                    foreach (Players p in allremainingactiveplayers)
                    {

                        modifyplayerStatus = p.PlayerName;
                        arrplayerStatus = modifyplayerStatus.Split("_");

                        p.PlayerName = arrplayerStatus[0] + "_0";

                        _context.Update(p);
                        await _context.SaveChangesAsync();
                    }
                }
            }

            //Send response to UI
            Response.Headers.Add("JSonRemoveAllRemainingPlayerResult", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [HttpPost]
        public async Task<HttpResponseMessage> SetBingoSkin(string bingotheme, string newgameid)
        {
            var message1 = "Error";


            //CHEQUEAR SI EXISTE UN SKIN PREVIO Y ELIMINARLO, LUE

            var NewBingoSkin = new GameEvent();

            var existingskinls = await _context.GameEvent.Where(newgid=> newgid.GameSessionId==Convert.ToInt32(newgameid)).ToListAsync();


            if(existingskinls==null)
            {
                //CREATE EVENT, THEN ASSOCIATE IT WITH THE NEW GAME SESSION ID
                NewBingoSkin.GameSessionId = Convert.ToInt32(newgameid);
                NewBingoSkin.NextQstatus = bingotheme;
                NewBingoSkin.EventType = "9";
            }
            //else
            //{
            //    //USE THE EXISTING EVENT FOR THIS SESSION TO SET THE NEXT BINGO THEME FOR THE PLAYERS!

            //}


            //NewBingoSkin.NextQstatus = bingotheme;
            //NewBingoSkin.EventType = "9";


            if (ModelState.IsValid)
            {
                if (existingskinls != null && existingskinls.Count() > 0)
                {
                    foreach (GameEvent skin in existingskinls.ToList())
                    {
                        _context.Remove(skin);

                    }

                    await _context.SaveChangesAsync();
                }

                //THIS CREATES A NEW GAME ROUND, WHENEVER A PLAYER WINS A PRIZE
                _context.Add(NewBingoSkin);
                await _context.SaveChangesAsync();
                message1 = "Success";
            }

            //Send response to UI
            Response.Headers.Add("JSonSetBingoSkinResult", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [HttpPost]
        public async Task<HttpResponseMessage> PlayerRemoveById(int playerId)
        {
            var message1 = "";

            //Find player
            var playerbyId = await _context.Players.Where(x => x.PlayerId == playerId).SingleAsync();

            var modifyplayerStatus = playerbyId.PlayerName;
            string[] arrplayerStatus = modifyplayerStatus.Split("_");

            playerbyId.PlayerName = arrplayerStatus[0] + "_0";


            if (ModelState.IsValid)
            {

                _context.Update(playerbyId);
                await _context.SaveChangesAsync();


            }

            //Send response to UI
            Response.Headers.Add("JSonRemovePlayerResult", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> PlayerSaveUpdate(int playerId, string playername)
        {

            //************************ ADMIN SECTION ************************
            var _Admin = new Admins();

            _Admin.AdminId = playerId;
            _Admin.Name = "";
            _Admin.Email = "";
            _Admin.Gpncode = "";
            _Admin.CreationDate = DateTime.Now;

            //*********** PLAYER AND CARD SECTION ***************************
            var message1 = "";
            var cardsUI = "";
            var cardsBackend = new List<int>();
            var answerId = "";
            var tokens1len = 0;
            var questionsavailable = new List<Questions>();

            var playercards = "";

            var _Players = new Players();
            _Players.PlayerId = playerId;
            _Players.PlayerName = playername + "_1";// 1 to indicate "Active" player; 0 otherwise.

            //****NEW: Adding additional columns initialization for a potential winner!
            _Players.Email = "nodata";
            _Players.FullName = "nodata";
            _Players.Gpncode = "nodata";

            var IdnewPlayer = 0;
            var _PlayerCards = new Cards();


            //Get new random card for the new player
            //Example: PlayerD890;Emi_4;Fabiola_7;Alteryx_8;

                if (playername != "ADMIN")
                {

                   //IF PLAYER TRIES TO ENTER THE GAME, SHOW HIM THE WINDOW OF JOINPLAYER
                   //ONCE THE ADMIN SENDS THE GAMEKEY, ONLY THEN THE PLAYER
                   //WILL BE ABLE TO START PLAYING...

                    if (ModelState.IsValid)
                    {
                        //ONLY THE PLAYER GETS CREATED HERE....
                        if (_Players != null && _Players.PlayerId == 0)
                            _context.Add(_Players);

                        await _context.SaveChangesAsync();
                        message1 = playername;
                        IdnewPlayer = _Players.PlayerId;
                        message1 = IdnewPlayer + ";" + message1;
                    }

                //message1 = "NEWPLAYERWAITING";
                message1 = "NEWPLAYERWAITING" + ";" + message1;
                //THE CARD FOR THE PLAYER WILL BE GENERATED ONCE THE GAME KEY
                //IS GENERATED BY THE ADMIN.


                //playercards = TTTBingoManager.CardForNewPlayer(_context);

                //EXAMPLE: Emi_4;Fabiola_7;Alteryx_8;
                //string[] tokens1 = playercards.Split(';');


                //string[] tokenAnswerId = tokens1[0].Split('_');

                //cardsUI = tokenAnswerId[0].ToString() + ";";


                ////Example: 4;7;8;
                //answerId = tokenAnswerId[1].ToString();
                //cardsBackend.Add(Convert.ToInt16(answerId));

                //tokens1len = tokens1.Length;

                //for (int j = 1; j < tokens1len - 1; j++)
                //{

                //    //Example: PlayerD890;Emi;Fabiola;Alteryx;
                //    tokenAnswerId = tokens1[j].Split('_');
                //    cardsUI = cardsUI + tokenAnswerId[0].ToString() + ";";

                //    //Example: 4;7;8;
                //    answerId = tokenAnswerId[1].ToString();
                //    cardsBackend.Add(Convert.ToInt16(answerId));
                //}

                ////message1 = message1 + ";" + cardsUI;

                ////Register new random card for the new player on the backend     
                //foreach (int cardid in cardsBackend)
                //{
                //    _PlayerCards.QuestionPlayerId = 0;
                //    _PlayerCards.QuestionId = cardid;
                //    _PlayerCards.PlayerId = _Players.PlayerId;
                //    _PlayerCards.Hit = false;

                //    if (ModelState.IsValid)
                //    {
                //        if (_PlayerCards != null && _PlayerCards.QuestionPlayerId == 0)
                //        {
                //            _context.Add(_PlayerCards);
                //        }

                //        await _context.SaveChangesAsync();
                //    }
                //}

            }
                else
                { 

                    //Create and register new and ONLY ONE ADMIN FOR THIS GAME SESSION!
                    if (ModelState.IsValid)
                    {

                        if (_Admin != null && _Admin.AdminId == 0)
                            _context.Add(_Admin);
                        await _context.SaveChangesAsync();
                                
                        message1 = playername;
                        IdnewPlayer = _Admin.AdminId;
                        message1 = IdnewPlayer + ";" + message1;
                    }

                    message1 = "ADMIN" + ";" + message1;
                }

            //Send response to UI
            Response.Headers.Add("JSonPlayerResultado", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> BingoCheck(string playerbingocard, string gameidbingo)
        {
            var bingoresults = "";
            var playercardsbyId = new List<Cards>();
            var playeridfrombiz = 0;
            var myplayerhit = new Cards();

            //RESULTS EXAMPLE:
            //BINGO;PlayerL150_1;228;SAM_True;Emi_True;PowerBI_False;.NET_True;Alteryx_False;FSO_True;
            bingoresults = TTTBingoManager.BingoCardCheck(_context, playerbingocard);

            //GET Card Player status.
            string[] tokens1 = bingoresults.Split(';');
            playeridfrombiz = Convert.ToInt16(tokens1[2].ToString());

            playercardsbyId = _context.Cards.Include(x => x.Question).Where(t => t.PlayerId == playeridfrombiz).ToList();

            for (int i = 3; i < tokens1.Length; i++)
            {
                //Update hits in the CardPlayer records
                string[] hit = tokens1[i].ToString().Split('_');

                myplayerhit = playercardsbyId.Where(r => r.Question.Answer == hit[0].ToString()).SingleOrDefault();

                if (ModelState.IsValid)
                {
                    if (myplayerhit != null)
                    {
                        myplayerhit.Hit = bool.Parse(hit[1].ToString());
                        _context.Update(myplayerhit);
                    }
                    await _context.SaveChangesAsync();

                }
            }

            //POST BingoCard to ADMIN check
            var checkmybingocard = new GameEvent();
            checkmybingocard.NextQstatus = "";
            checkmybingocard.GameOnOff = true;
            //EVENT TYPE EXAMPLE:
            //1;BINGO;PlayerL150_1;228;SAM_True;Emi_True;PowerBI_False;.NET_True;Alteryx_False;FSO_True;
            checkmybingocard.EventType = "1;" + bingoresults;

            var existingevent = _context.GameEvent.Where(adm=>adm.GameSessionId==Convert.ToInt32(gameidbingo)).ToList();

            if (ModelState.IsValid)
            {
                if (existingevent != null && existingevent.Count < 2)
                {

                    if (existingevent[0].EventType != null && existingevent[0].EventType != "")
                    {
                        checkmybingocard.EventId = 0;
                        _context.Add(checkmybingocard);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        _context.Remove(existingevent[0]);
                        await _context.SaveChangesAsync();

                        checkmybingocard.EventId = 0;
                        _context.Add(checkmybingocard);
                        await _context.SaveChangesAsync();
                    }
                }
                else
                {
                    checkmybingocard.EventId = 0;
                    _context.Add(checkmybingocard);
                    await _context.SaveChangesAsync();
                }


            }

            bingoresults = "1;" + bingoresults;
            //Return results to the ADMIN console
            Response.Headers.Add("CardPlayerResults", bingoresults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> LineCheck(string playerlinecard, string gameid)
        {
            //CAMBIAR PARA QUE VENGA CON LA MISMA ESTRUCTURA QUE EL BINGO CARD
            //LINE1: 1595;Douglas;PowerBI;Emi;NA;NA;NA
            //OR
            //LINE2: 1595;NA;NA;NA;Douglas;PowerBI;Emi

            var lineresults = "";
            var playercardsbyId = new List<Cards>();
            var playeridfrombiz = 0;
            var myplayerhit = new Cards();
            int i = 0;
            int endofline = 0;
            //Get playerId
            string[] arrinputhits = playerlinecard.Split(';');
            var playerId = arrinputhits[0].ToString();


            //TO DO: CHECK WHETHER THE PLAYER ALREADY WON THIS LINE...
            //	LINE1	LINE2	BINGO

            var playerprizecheckls = await _context.Winners.Where(h => h.PlayerId == Convert.ToInt32(playerId) && h.GameSessionId==Convert.ToInt32(gameid)).ToListAsync();

            if (arrinputhits[1].ToString() == "NA")
            {

                i = 6;
                endofline = 9;



                //DID PLAYER ALREADY WON THIS PRIZE?
                var alreadywonline1 = playerprizecheckls.Where(s => s.PrizeType == "LINE2").FirstOrDefault();

                if (alreadywonline1 != null)
                {
                    lineresults = "AlreadyWonClaimedPrize";
                }
            }
            else
            {

                i = 3;
                endofline = 6;

                //DID PLAYER ALREADY WON THIS PRIZE?

                var alreadywonline2 = playerprizecheckls.Where(s => s.PrizeType == "LINE1").FirstOrDefault();

                if (alreadywonline2 != null)
                {
                    lineresults = "AlreadyWonClaimedPrize";
                }

            }



            if (lineresults != "AlreadyWonClaimedPrize")
            {

                lineresults = TTTBingoManager.LineCardCheck(_context, playerlinecard, gameid);
                //EXAMPLE
                //LINE1;PlayerG114_1;2198;Emi_False;.NET_False;GTP_False;NA_False;NA_False;NA_False
                //LINE2;PlayerL426_1;2200;NA_False;NA_False;NA_False;ATTG_False;Emi_False;Gustavo_False;

                //GET Card Player status.
                string[] tokens1 = lineresults.Split(';');
                playeridfrombiz = Convert.ToInt16(tokens1[2].ToString());

                playercardsbyId = await _context.Cards.Include(x => x.Question).Where(t => t.PlayerId == playeridfrombiz).ToListAsync();

                for (; i < endofline; i++)
                {
                    //Update hits in the Player card records
                    string[] hit = tokens1[i].ToString().Split('_');

                    myplayerhit = playercardsbyId.Where(r => r.Question.Answer == hit[0].ToString()).SingleOrDefault();

                    if (ModelState.IsValid)
                    {
                        if (myplayerhit != null)
                        {
                            myplayerhit.Hit = bool.Parse(hit[1].ToString());
                            _context.Update(myplayerhit);
                        }
                        await _context.SaveChangesAsync();

                    }
                }

                //POST LineCard to ADMIN check
                var checkmylinecard = new GameEvent();
                checkmylinecard.NextQstatus = "";
                checkmylinecard.GameOnOff = true;
                //EVENT TYPE EXAMPLE:
                //TO DO FIX: CHECK THE PARAMETER lineresults' VALUES.
                //2;LINE;PlayerY42_1;1599;ATTG_False;Monica_False;Diego_False;
                checkmylinecard.EventType = "2;" + lineresults;

                var existingevent = await _context.GameEvent.Where(ge=>ge.GameSessionId==Convert.ToInt32(gameid)).ToListAsync();

                if (ModelState.IsValid)
                {
                    if (existingevent != null && existingevent.Count < 2)
                    {
                        //ADD CURRENT LINE TO THE LIST OF PLAYERS CLAIMING FOR A PRIZE
                        if (existingevent[0].EventType != null && existingevent[0].EventType != "")
                        {
                            checkmylinecard.EventId = 0;
                            _context.Add(checkmylinecard);
                            await _context.SaveChangesAsync();
                        }
                        else
                        {
                            _context.Remove(existingevent[0]);
                            await _context.SaveChangesAsync();

                            checkmylinecard.EventId = 0;
                            _context.Add(checkmylinecard);
                            await _context.SaveChangesAsync();
                        }
                    }
                    else
                    {
                        checkmylinecard.EventId = 0;
                        _context.Add(checkmylinecard);
                        await _context.SaveChangesAsync();
                    }


                }

                //FLAG NUMBER "2", INDICATES THIS LINE IS BEING CLAIMED BY THE PLAYER
                lineresults = "2;" + lineresults;
                //Return results to the ADMIN console
                //EXAMPLE
                //2; LINE1; PlayerP77_1; 2202; Goni_False; Sharepoint101_False; Fabiola_False; NA_False; NA_False; NA_False
                //2; LINE2; PlayerF76_1; 2203; NA_False; NA_False; NA_False; Sharepoint101_False; Jonatan_False; Fabiola_False;

            }

            Response.Headers.Add("LineCardPlayerResults", lineresults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpGet]
        public async Task<HttpResponseMessage> GetWinner(string cursessionidgame)
        {
            var bingoresults = "";

            var existingevent = await _context.GameEvent.Where(pw=>pw.GameSessionId==Convert.ToInt32(cursessionidgame)).ToListAsync();

            if (existingevent != null && existingevent.Count > 1)
            {

                for (int i = 1; i < existingevent.Count; i++)
                {
                    bingoresults = bingoresults + existingevent[i].EventType + "|";
                }

            }
            else
            {
                bingoresults = "Nowinners";
            }

            //Return results to the ADMIN console
            Response.Headers.Add("WinnerResults", bingoresults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpGet]
        public HttpResponseMessage CheckQuestionsAskedPlayer(string playercheckcurrentId, string gameid, string answertoevaluate1, string answertoevaluate2, string answertoevaluate3)
        {
            string[] arranswer1;
            string[] arranswer2;
            string[] arranswer3;
            string lscardplayercheck = "";

            if (answertoevaluate1 != "" && answertoevaluate1 != null && answertoevaluate2 != "" && answertoevaluate2 != null && answertoevaluate3 != "" && answertoevaluate3 != null)
            {
                arranswer1 = answertoevaluate1.Split('_');
                arranswer2 = answertoevaluate2.Split('_');
                arranswer3 = answertoevaluate3.Split('_');
                lscardplayercheck = TTTBingoManager.GetCardPlayerCheckStatus(_context, playercheckcurrentId, gameid, arranswer1[0].ToString(), arranswer2[0].ToString(), arranswer3[0].ToString());
            }
            else
            {
                lscardplayercheck = TTTBingoManager.GetCardPlayerCheckStatus(_context, playercheckcurrentId, gameid, answertoevaluate1, answertoevaluate2, answertoevaluate3);
            }


            //Return results to the ADMIN console
            Response.Headers.Add("CardPlayerCheckResults", lscardplayercheck);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpGet]
        public async Task<HttpResponseMessage> FilterByQuestionStatus(string questiontoken, string gamekeysessionid)
        {
            var questionsaskedresult = "";
            var questionsasked = await _context.Questions.Where(m => m.QuestionStatus == 0 && m.GameSessionId==Convert.ToInt32(gamekeysessionid)).ToListAsync();

            if (questionsasked != null && questionsasked.Count() > 0)
            {
                //winnersearchresults = winnersearchresults + winnerId + ";" + email + ";" + prizeType + ";" + score + ";" + playerID + ";" + gPNCode + ";" + fullName + ";" + playerNick;
                var qid = "";
                var qqasked = "";
                var qqstatus = "";
                var qqanswer = "";

                foreach (Questions q in questionsasked)
                {
                    qid = q.QuestionId.ToString();
                    qqasked = q.QuestionText;
                    qqstatus = q.QuestionStatus.ToString();
                    qqanswer = q.Answer;

                    // lscurrentquestions = lscurrentquestions + qst.QuestionId + ";" + qst.QuestionText + ";" + qst.QuestionStatus + ";" + qst.Answer + "|";
                    questionsaskedresult = questionsaskedresult + qid + ";" + qqasked + ";" + qqstatus + ";" + qqanswer + "|";

                }

            }
            else
            {
                questionsaskedresult = "NoResults";
            }

            Response.Headers.Add("JSonQuestionsAskedResult", questionsaskedresult);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> ClearAllQuestionsServer(string deactivebygid)
        {
            var lscurrentquestions = "";
            //var message1 = "";
            var allcurrentquestions = await _context.Questions.Where(deac=>deac.GameSessionId==Convert.ToInt32(deactivebygid)).ToListAsync();

            if (ModelState.IsValid)
            {
                if (allcurrentquestions != null && allcurrentquestions.Count() > 0)
                {
                    foreach (Questions p in allcurrentquestions.ToList())
                    {

                        p.QuestionStatus = 0;

                        _context.Update(p);
                        await _context.SaveChangesAsync();
                    }
                }
            }


            var lsquestions = await _context.Questions.ToListAsync();

            if (lsquestions != null && lsquestions.Count() > 0)
            {

                foreach (Questions qst in lsquestions)
                {
                    lscurrentquestions = lscurrentquestions + qst.QuestionId + ";" + qst.QuestionText + ";" + qst.QuestionStatus + ";" + qst.Answer + "|";
                }
            }

            //Send response to UI
            Response.Headers.Add("JSonQuestionsDEACTIVATEDResult", lscurrentquestions);
            return new HttpResponseMessage(HttpStatusCode.Created);

            //return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<HttpResponseMessage> ActivateAllQuestionsServer(string allqgameID)
        {
            var lscurrentquestions = "";
            //var questionsaskedresult = "";
            var allcurrentquestions = await _context.Questions.Where(hall=>hall.GameSessionId==Convert.ToInt32(allqgameID)).ToListAsync();

            if (ModelState.IsValid)
            {
                if (allcurrentquestions != null && allcurrentquestions.Count() > 0)
                {
                    foreach (Questions p in allcurrentquestions.ToList())
                    {

                        p.QuestionStatus = 1;

                        _context.Update(p);
                        await _context.SaveChangesAsync();
                    }
                }
            }



            var lsquestions = await _context.Questions.ToListAsync();

            if (lsquestions != null && lsquestions.Count() > 0)
            {

                foreach (Questions qst in lsquestions)
                {
                    lscurrentquestions = lscurrentquestions + qst.QuestionId + ";" + qst.QuestionText + ";" + qst.QuestionStatus + ";" + qst.Answer + "|";
                }
            }



            //Send response to UI

            //return RedirectToAction(nameof(Index));
            Response.Headers.Add("JSonQuestionsActivatedResult", lscurrentquestions);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [HttpGet]
        public async Task<HttpResponseMessage> SearchQbyText(string qbytxt)
        {
            var questionbytextinput = "";

            var qbytexto = await _context.Questions.Where(m => m.QuestionText.Contains(qbytxt)).ToListAsync();

            if (qbytexto != null && qbytexto.Count() > 0)
            {

                foreach (Questions qx in qbytexto)
                {
                    questionbytextinput = questionbytextinput + qx.QuestionId.ToString() + ";" + qx.QuestionText + ";" + qx.QuestionStatus + ";" + qx.Answer + "|";
                }
            }
            else
            {
                questionbytextinput = "NoResults";
            }

            Response.Headers.Add("JSonSearchQbyTextResult", questionbytextinput);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }



        [HttpGet]
        public async Task<HttpResponseMessage> GetCurrentQuestions(string questionsbygameId)
        {
            string[] arrnewtrivia = questionsbygameId.Split(';');
            var gamesessionid = "";
            var lscurrentquestions = "";

            if (arrnewtrivia.Length > 1)
            {
                if (arrnewtrivia[0] == "NEWGAMETRIVIA")
                {
                    gamesessionid = arrnewtrivia[1];
                }

            }
            else
            {
                gamesessionid = questionsbygameId;

            }


            var lsquestions = await _context.Questions.Where(hp=>hp.GameSessionId==Convert.ToInt32(gamesessionid)).ToListAsync();

            if (lsquestions != null && lsquestions.Count() > 0)
            {

                if (arrnewtrivia[0] == "NEWGAMETRIVIA" && lsquestions.Count() == 15)
                {
                    lscurrentquestions = "INITIALQUESTIONNAIREDONE";
                }
                else
                {
                    foreach (Questions qst in lsquestions)
                    {
                        lscurrentquestions = lscurrentquestions + qst.QuestionId.ToString() + ";" + qst.QuestionText + ";" + qst.QuestionStatus + ";" + qst.Answer + "|";
                    }
                }




            }

            //Return results to the ADMIN console
            Response.Headers.Add("ListCurrentQuestionsResults", lscurrentquestions);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [HttpGet]
        public async Task<HttpResponseMessage> GetCurrentPlayers(string playersbygID)
        {
            var lscurrentplayers = "NoPlayerListYet";

            var lsplayers = await _context.Players.Where(hn=>hn.GameSessionId==Convert.ToInt32(playersbygID)).ToListAsync();

            if (lsplayers != null && lsplayers.Count() > 0)
            {

                foreach (Players ply in lsplayers)
                {

                    lscurrentplayers = lscurrentplayers + ply.PlayerId + ";" + ply.PlayerName + ";" + ply.Email + ";" + ply.FullName + ";" + ply.Gpncode + "|";
                }
            }

            //Return results to the ADMIN console
            Response.Headers.Add("ListCurrentPlayersResults", lscurrentplayers);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [HttpGet]
        public async Task<HttpResponseMessage> GetCurrentPlayerCards(string playercardsbygameID)
        {
            var lscurrentplayercards = "NoCardsYet";

            var lsplayercards = await _context.Cards.Where(ch=>ch.GameSessionId==Convert.ToInt32(playercardsbygameID)).Include(x => x.Player).Include(y => y.Question).ToListAsync();



            if (lsplayercards != null && lsplayercards.Count() > 0)
            {

                foreach (Cards crd in lsplayercards)
                {

                    lscurrentplayercards = lscurrentplayercards + crd.Player.PlayerName + ";" + crd + ";" + crd.Question.Answer + ";" + crd.Hit + "|";
                }
            }

            //Return results to the ADMIN console
            Response.Headers.Add("ListCurrentPlayerCardsResults", lscurrentplayercards);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpGet]
        public async Task<HttpResponseMessage> GetCurrentRegisteredWinners(string winnersbygameId)
        {
            var lscurrentregwinners = "NoWinnersYet";

            var lswinners = await _context.Winners.Where(wh=>wh.GameSessionId==Convert.ToInt32(winnersbygameId)).ToListAsync();

            if (lswinners != null && lswinners.Count() > 0)
            {
                foreach (Winners wnr in lswinners)
                {
                    lscurrentregwinners = lscurrentregwinners + wnr.WinnerId + ";" + wnr.PlayerNick + ";" + wnr.FullName + ";" + wnr.Email + ";" + wnr.PrizeType + "|";
                }
            }

            //Return results to the ADMIN console
            Response.Headers.Add("ListCurrentRegWinnersResults", lscurrentregwinners);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> CleanUpEventType(string cleanupeventype)
        {
            var activateresults = "";

            var nextquestion = _context.GameEvent.ToList();

                nextquestion[0].NextQstatus = "";
                nextquestion[0].EventType = "999";


                if (ModelState.IsValid)
                {

                    //INSERT 1 NextQ column
                    _context.Update(nextquestion[0]);
                    await _context.SaveChangesAsync();

                }
            

            activateresults = nextquestion[0].EventType;

            //Return results to the ADMIN console
            Response.Headers.Add("CleanUpEventTypeResults", activateresults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> ActivateNexQuestion(string nexquestionforgamesession)
        {
            var activateresults = "";

            var nextquestion = await _context.GameEvent.Where(next=>next.GameSessionId==Convert.ToInt32(nexquestionforgamesession)).ToListAsync();

            if(nextquestion[0].EventType=="11" || nextquestion[0].EventType == "2" || nextquestion[0].EventType == "4" || nextquestion[0].EventType == "5")
            {
                //DO NOTHING
            }
            else
            {
                nextquestion[0].NextQstatus = "";
                nextquestion[0].EventType = "10";


                if (ModelState.IsValid)
                {

                    //INSERT 1 NextQ column
                    _context.Update(nextquestion[0]);
                    await _context.SaveChangesAsync();

                }
            }



            activateresults = nextquestion[0].EventType;

            //Return results to the ADMIN console
            Response.Headers.Add("ActivateQResults", activateresults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> NotifyPlayers(string notifyvalue)
        {
            var notify1results = "";
            var notifyobject = new GameEvent();
            notifyobject.EventType = notifyvalue;
            notifyobject.NextQstatus = "";
            notifyobject.GameOnOff = true;

            //UPDATE WINNERS WITH CHECK RESULTS 
            var previouswinners = _context.GameEvent.ToList();

            if (ModelState.IsValid)
            {
                if (previouswinners != null && previouswinners.Count > 0)
                {
                    foreach (GameEvent g in previouswinners)
                    {
                        _context.Remove(g);
                        await _context.SaveChangesAsync();
                    }

                }


                //INSERT EventType column
                _context.Add(notifyobject);
                await _context.SaveChangesAsync();

            }

            notify1results = notifyobject.EventType.ToString();

            //Return results to the ADMIN console
            Response.Headers.Add("NotifyResults", notify1results);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [HttpGet]
        public async Task<HttpResponseMessage> GetSkinNameForPlayers(string nextskin, string gid)
        {
            var activationcoderesults = "Error";

            var nextquestion = await _context.GameEvent.Where(sks=>sks.GameSessionId==Convert.ToInt32(gid)).ToListAsync();

            if (nextquestion != null && nextquestion.Count > 0)
            {
                activationcoderesults = nextquestion[0].EventType + ";" + nextquestion[0].NextQstatus;

            }
            else
            {
                activationcoderesults = "KeepChecking";
            }

            //Return next question to the Player console
            Response.Headers.Add("ActivationCodeNextSkin", activationcoderesults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [HttpGet]
        public async Task<HttpResponseMessage> GetActivationCodeNexQ(string nextqplayerbysessionid)
        {
            //var activationcoderesults = "";
            var activationcoderesults = "";

            var nextquestion = await _context.GameEvent.Where(nxsid=>nxsid.GameSessionId==Convert.ToInt32(nextqplayerbysessionid)).ToListAsync();
           
            if (nextquestion != null && nextquestion.Count > 0)
            {
                if (nextquestion[0].EventType == "5" || nextquestion[0].EventType == "6" && nextquestion[0].NextQstatus!="")
                {
                    activationcoderesults = nextquestion[0].NextQstatus;
                }
                else
                {
                    if (nextquestion[0].EventType == "9")
                    {
                        activationcoderesults = "KeepChecking";
                    }
                }

            }
            else
            {
                activationcoderesults = "KeepChecking";
            }

            //Return next question to the Player console
            Response.Headers.Add("ActivationCodeNextQ", activationcoderesults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }



        [HttpGet]
        public async Task<HttpResponseMessage> GetNexWinners(string checkplayerforprize, string gameplayersid)
        {

            var eventslist = await _context.GameEvent.Where(gnx=>gnx.GameSessionId==Convert.ToInt32(gameplayersid)).ToListAsync();
          
            var getwinnersfromadminresults = "";
            var nextwinnerfromadmin = new GameEvent();
            var officialwinnersls = "";
            //GETS THE PRIZE TYPE: 2 FOR LINE, 4 FOR BINGO.
            if (eventslist != null && eventslist.Count > 0)
            {
                nextwinnerfromadmin = eventslist[0];
            }


            //GETS THE ACTUAL OFFICIAL WINNERS LIST

            var currentofficialwinners = await _context.Winners.Where(wnx => wnx.GameSessionId == Convert.ToInt32(gameplayersid)).OrderByDescending(p => p.Score).ToListAsync();

            if (currentofficialwinners != null && currentofficialwinners.Count() > 0)
            {
                foreach (Winners wi in currentofficialwinners)
                {
                    officialwinnersls = officialwinnersls + wi.Score.ToString() + ";" + wi.PlayerNick + "|";
                }

                if (nextwinnerfromadmin != null)
                {

                    var isthisplayerabingowinner = currentofficialwinners.Where(hk => hk.PlayerId == Convert.ToInt32(checkplayerforprize) && hk.PrizeType == "BINGO").FirstOrDefault();

                    if (isthisplayerabingowinner != null)
                    {
                        //RETURN VALE SAMPLE: 5;37;100;PlayerH593_1|100;PlayerZ294_1|100;PlayerO599_1|
                        getwinnersfromadminresults = nextwinnerfromadmin.EventType + ";" + isthisplayerabingowinner.PlayerId.ToString() + ";" + officialwinnersls;
                    }
                    else
                    {
                        //RETURN VALE SAMPLE: 5;Notawinner;100;PlayerH593_1|100;PlayerZ294_1|100;PlayerO599_1|
                        var eventslist2 = await _context.GameEvent.ToListAsync();
                        getwinnersfromadminresults = eventslist2[0].EventType + ";" + "Notawinner" + ";" + officialwinnersls;

                    }


                }

            }
            else
            {
                getwinnersfromadminresults = nextwinnerfromadmin.EventType + ";NoWinnersOrError";
            }

            //Return next question to the Player console
            Response.Headers.Add("NextWinnersAdminResults", getwinnersfromadminresults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [HttpGet]
        public async Task<HttpResponseMessage> GetMonitor(string curgamesesid)
        {
            var latestlsplayer = "NoPlayersYet";


            //var players = _context.Players.OrderByDescending(r => r.PlayerId).ToList();
            //curgamesesid
            var players = await _context.Players.Where(tr => tr.PlayerName.Contains("_1") && tr.GameSessionId==Convert.ToInt32(curgamesesid)).OrderByDescending(r => r.PlayerId).ToListAsync();

            //if (players != null )
            //{
                //string[] nameplayer1 = players[0].PlayerName.Split('_');
                //latestlsplayer = nameplayer1[0].ToString() + ";";
            //}

            if (players != null && players.Count > 1)
            {
                string[] nameplayer1 = players[0].PlayerName.Split('_');
                latestlsplayer = nameplayer1[0].ToString() + ";";

                string[] nameplayer2 = players[1].PlayerName.Split('_');
                latestlsplayer = latestlsplayer + nameplayer2[0].ToString() + ";";
            }

            if (players != null && players.Count > 2)
            {
                string[] nameplayer3 = players[2].PlayerName.Split('_');
                latestlsplayer = latestlsplayer + nameplayer3[0].ToString() + ";";
            }

            //Return next question to the Player console
            Response.Headers.Add("MonitorResults", latestlsplayer);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpGet]
        public async Task<HttpResponseMessage> GetPlayersTotal(string curidgamesession)
        {
            var count = "";
            var activationflag = "";
            var officialwinnertotal = "";

            var eventlist = await _context.GameEvent.Where(evsid=> evsid.GameSessionId==Convert.ToInt32(curidgamesession)).ToListAsync();

            if (eventlist != null && eventlist.Count > 0)
            {
                if (eventlist[0].GameOnOff == true)
                {
                    activationflag = "activated";
                }
                else
                {
                    activationflag = "inactive";
                }
            }
            else
            {
                count = "0";
                activationflag = "inactive";
            }

            //COUNT ONLY PLAYERS, FOR THE CURRENT GAME SESSION, WITH "_1" STATUS AS ACTIVE PLAYERS
            //var playerscount = await _context.Players.Where(h => h.PlayerName.Contains("_1")).ToListAsync();
            //curidgamesession
            var playerscount = await _context.Players.Where(h => h.PlayerName.Contains("_1") && h.GameSessionId==Convert.ToInt32(curidgamesession)).ToListAsync();

            if (playerscount != null && playerscount.Count > 0)
            {
                count = playerscount.Count().ToString();
            }

            count = count + ";" + activationflag;

            //GETS THE ACTUAL OFFICIAL WINNERS LIST
            //var currentofficialwinners = await _context.Winners.ToListAsync();
             var currentofficialwinners = await _context.Winners.Where(mr=>mr.GameSessionId== Convert.ToInt32(curidgamesession)).ToListAsync();


            if (currentofficialwinners != null && currentofficialwinners.Count() > 0)
            {
                foreach (Winners wix in currentofficialwinners)
                {
                    officialwinnertotal = officialwinnertotal + wix.PlayerNick + ";";
                }
            }
            else
            {
                officialwinnertotal = "NoWinnersTotal";
            }

            count = count + ";" + activationflag + ";" + officialwinnertotal;




            //Return next question to the Player console
            Response.Headers.Add("PlayersCountResults", count);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpPost]
        public HttpResponseMessage IsGameOn(string gamestatus)
        {
            var gamestatusresults = "";
            var gamestatuslocal = new List<GameEvent>();

            gamestatuslocal = _context.GameEvent.ToList();
            var gamehasadmin = _context.Players.Where(k => k.PlayerName.Contains("ADMIN")).ToList();

            if (gamestatuslocal != null && gamestatuslocal.Count > 0)
            {
                if (gamestatuslocal[0].GameOnOff != null && gamestatuslocal[0].GameOnOff == false)
                {
                    gamestatusresults = "GameIsOFF";
                }
                else
                {
                    if (gamehasadmin.Count > 0)
                    {
                        gamestatusresults = "GameIsON";
                    }
                    else
                    {
                        gamestatusresults = "GameNotStarted";
                    }

                }
            }
            else
            {
                gamestatusresults = "GameIsOFF";
            }





            //Return next question to the Player console
            Response.Headers.Add("PlayerGameStatus", gamestatusresults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        [AcceptVerbs("GET")]
        [AllowAnonymous]
        public HttpResponseMessage GetNexQuestion(string nexquestionbygameid)
        {
            var nextqplayerresults = "";


            var nextquestion = _context.GameEvent.Where(nxq=>nxq.GameSessionId==Convert.ToInt32(nexquestionbygameid)).ToList();
            nextqplayerresults = nextquestion[0].EventType + ";" + nextquestion[0].NextQstatus;



            //Return next question to the Player console
            Response.Headers.Add("NextQResults", nextqplayerresults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> BlockIncomingPlayers(string bingomode, string gamenewsid)
        {
            bool? blockresults = false;
            var blockincomingplayers = new GameEvent();
            blockincomingplayers.GameSessionId = Convert.ToInt32(gamenewsid);
            blockincomingplayers.EventType = bingomode;
            blockincomingplayers.NextQstatus = "";
            blockincomingplayers.GameOnOff = true;

            //DELETES PREVIOUS POTENTIAL WINNERS
            var previouspotentialwinners = await _context.GameEvent.Where(vk=>vk.GameSessionId==Convert.ToInt32(gamenewsid)).ToListAsync();

            //var previousofficialwinners = await _context.Winners.ToListAsync();

            if (ModelState.IsValid)
            {

                if (previouspotentialwinners != null && previouspotentialwinners.Count > 0)
                {
                    foreach (GameEvent g in previouspotentialwinners)
                    {
                        _context.Remove(g);
                        await _context.SaveChangesAsync();
                    }

                }


                //INSERT 1 NextQ column
                _context.Add(blockincomingplayers);
                await _context.SaveChangesAsync();

            }

            blockresults = blockincomingplayers.GameOnOff;

            //Return next question to the Player console
            Response.Headers.Add("BlockPlayersResults", Convert.ToString(blockresults));
            return new HttpResponseMessage(HttpStatusCode.Created);
        }
    }
}