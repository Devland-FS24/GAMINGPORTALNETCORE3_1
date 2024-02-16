using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Web;
using System.Net;
using EYGamingClub.Models;

namespace EYGamingClub.Controllers
{
    public class CardController : Controller
    {
        private readonly EYGamingCubContext _context;

        public CardController(EYGamingCubContext context)
        {
            _context = context;
        }

        // GET: Question
        public async Task<IActionResult> Index()
        {

            var cardlist = new List<Cards>();
            var cardlist2 = new List<Cards>();

            cardlist = _context.Cards.Include(x => x.Player).ToList();
            cardlist2 = _context.Cards.Include(x => x.Question).ToList();

            ViewBag.CardList = cardlist2;

            return View(await _context.Cards.ToListAsync());
        }

        [HttpGet]
        public async Task<HttpResponseMessage> SearchCardbyPlayerNick(string cardbyplayer)
        {
            var cardbyplayernickname = "";
            var playername = "";
            var cardanswer = "";
            var cardhit = "";


            var playerbysearch = await _context.Players.Where(m => m.PlayerName == cardbyplayer).FirstOrDefaultAsync();

            if (playerbysearch != null)
            {
                var playercardsbyId = _context.Cards.Include(x => x.Question).Where(t => t.PlayerId == playerbysearch.PlayerId).ToList();

                foreach (Cards cp in playercardsbyId)
                {

                    playername = cp.Player.PlayerName;
                    cardanswer = cp.Question.Answer;
                    cardhit = cp.Hit.ToString();

                    cardbyplayernickname = cardbyplayernickname + playername + ";" + cardanswer + ";" + cardhit + "|";

                }
            }
            else
            {
                cardbyplayernickname = "NoResults";
            }

            Response.Headers.Add("JSonSearchCardResult", cardbyplayernickname);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        // GET: Employee/Create
        public IActionResult AddOrEdit(int id = 0)
        {
            if (id == 0)
                return View(new Cards());
            else
                return View(_context.Cards.Find(id));
        }

        // POST: Employee/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddOrEdit([Bind("QuestionPlayerId,QuestionId,PlayerId,Answer")] Cards card)
        {
            var cardindexer = 0;
            var cardslist = _context.Cards.ToList();
            var lastcardId = cardslist.Count;

            if (lastcardId > 1)
                cardindexer = lastcardId + 1;

            if (ModelState.IsValid)
            {
                if (card.QuestionPlayerId == 0)
                {
                    card.QuestionPlayerId = cardindexer;
                    _context.Add(card);
                }
                else
                    _context.Update(card);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(card);
        }


        // GET: Employee/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            var card = await _context.Cards.FindAsync(id);
            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<HttpResponseMessage> BingoGameStartOver(string startoverkey)
        {

            var message1 = "Error";

            //Delete previous winners
            var previouswinners = await _context.Winners.ToListAsync();

            //Delete previous cards
            var previouscards = await _context.Cards.ToListAsync();

            //Delete previous players
            var previousplayers = await _context.Players.ToListAsync();

            //Delete previous game events 
            var previousgameevents = await _context.GameEvent.ToListAsync();

            //SET previous questions to ACTIVE status
            var previousquestions = await _context.Questions.ToListAsync();


            if (ModelState.IsValid)
            {

                //Delete previous winners
                if (previouswinners != null && previouswinners.Count > 0)
                {
                    foreach (Winners z in previouswinners)
                    {
                        _context.Remove(z);
                        await _context.SaveChangesAsync();
                    }
                }

                //Delete previous cards
                if (previouscards != null && previouscards.Count > 0)
                {
                    foreach (Cards c in previouscards)
                    {
                        _context.Remove(c);
                        await _context.SaveChangesAsync();
                    }
                }

                //Delete previous players
                if (previousplayers != null && previousplayers.Count > 0)
                {
                    foreach (Players p in previousplayers)
                    {
                        _context.Remove(p);
                        await _context.SaveChangesAsync();
                    }
                }

                //Delete previous game events 
                if (previousgameevents != null && previousgameevents.Count > 0)
                {
                    foreach (GameEvent g in previousgameevents)
                    {
                        _context.Remove(g);
                        await _context.SaveChangesAsync();
                    }

                }

                //SET previous questions TO ACTIVE
                if (previousquestions != null && previousquestions.Count > 0)
                {
                    foreach (Questions h in previousquestions.ToList())
                    {
                        h.QuestionStatus = 1;
                        _context.Update(h);
                        await _context.SaveChangesAsync();
                    }
                }

                message1 = "DONE.";

            }

            Response.Headers.Add("StartOverResults", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

    }
}