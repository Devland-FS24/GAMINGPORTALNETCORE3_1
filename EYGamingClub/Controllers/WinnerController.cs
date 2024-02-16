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
    public class WinnerController : Controller
    {
        private readonly EYGamingCubContext _context;

        public WinnerController(EYGamingCubContext context)
        {
            _context = context;
        }

        // GET: Question
        public async Task<IActionResult> Index()
        {
            return View(await _context.Winners.ToListAsync());
        }

        [HttpGet]
        public async Task<HttpResponseMessage> SearchWinnerByToken(string winnertoken)
        {
            var winnersearchresults = "";
            var winnerId = "";
            var email = "";
            var prizeType = "";
            var score = "";
            var playerID = "";
            var gPNCode = "";
            var fullName = "";
            var playerNick = "";



            var winnerbysearch = await _context.Winners.Where(m => m.Email.Contains(winnertoken) || m.PrizeType.Contains(winnertoken) || m.Gpncode.Contains(winnertoken) || m.FullName.Contains(winnertoken) || m.PlayerNick.Contains(winnertoken)).FirstOrDefaultAsync();

            if (winnerbysearch != null)
            {
                winnerId = winnerbysearch.WinnerId.ToString();
                email = winnerbysearch.Email;
                prizeType = winnerbysearch.PrizeType;
                score = winnerbysearch.Score.ToString();
                playerID = winnerbysearch.PlayerId.ToString();
                gPNCode = winnerbysearch.Gpncode;
                fullName = winnerbysearch.FullName;
                playerNick = winnerbysearch.PlayerNick;

                winnersearchresults = winnersearchresults + winnerId + ";" + email + ";" + prizeType + ";" + score + ";" + playerID + ";" + gPNCode + ";" + fullName + ";" + playerNick;


            }
            else
            {
                winnersearchresults = "NoResults";
            }

            Response.Headers.Add("JSonSearchWinnerResult", winnersearchresults);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        // GET: Employee/Create
        //public IActionResult AddOrEdit(int id = 0)
        //{
        //    if (id == 0)
        //        return View(new Winners());
        //    else
        //        return View(_context.Winners.Find(id));
        //}

        // POST: Employee/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> AddOrEdit([Bind("QuestionPlayerId,QuestionId,PlayerId,Answer")] Cards card)
        //{
        //    var cardindexer = 0;
        //    var cardslist = _context.Cards.ToList();
        //    var lastcardId = cardslist.Count;

        //    if (lastcardId > 1)
        //        cardindexer = lastcardId + 1;

        //    if (ModelState.IsValid)
        //    {
        //        if (card.QuestionPlayerId == 0)
        //        {
        //            card.QuestionPlayerId = cardindexer;
        //            _context.Add(card);
        //        }
        //        else
        //            _context.Update(card);
        //        await _context.SaveChangesAsync();
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(card);
        //}


        // GET: Employee/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    var card = await _context.Cards.FindAsync(id);
        //    _context.Cards.Remove(card);
        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}


    }
}