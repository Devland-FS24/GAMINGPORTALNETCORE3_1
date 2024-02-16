using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using EYGamingClub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace EYGamingClub.Controllers
{
    public class PlayerController : Controller
    {
        private readonly EYGamingCubContext _context;

        public PlayerController(EYGamingCubContext context)
        {
            _context = context;
        }

        // GET: Question
        public async Task<IActionResult> Index()
        {
            ViewBag.PlayersCount = _context.Players.Count();
            return View(await _context.Players.OrderByDescending(r => r.PlayerId).ToListAsync());
        }

        // GET: Employee/Create
        public IActionResult AddOrEdit(int id = 0)
        {
            if (id == 0)
                return View(new Players());
            else
                return View(_context.Players.Find(id));
        }

        // POST: Employee/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddOrEdit([Bind("PlayerId,PlayerName")] Players player)
        {
            if (ModelState.IsValid)
            {
                if (player.PlayerId == 0)
                    _context.Add(player);
                else
                    _context.Update(player);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(player);
        }


        // GET: Employee/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            var player = await _context.Players.FindAsync(id);
            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }


        [AcceptVerbs("POST")]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> ResetBingoGame(string nextqplayer)
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

            //Delete previous questions
            var previousquestions = await _context.Questions.ToListAsync();


            if (ModelState.IsValid)
            {

                //Delete previous winners
                //var previouswinners
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

                //Delete previous questions
                //var previousquestions
                if (previousquestions != null && previousquestions.Count > 0)
                {
                    foreach (Questions h in previousquestions)
                    {
                        _context.Remove(h);
                        await _context.SaveChangesAsync();
                    }
                }

                message1 = "DONE.";
                //_context.SaveChanges();
            }


            Response.Headers.Add("ResetResults", message1);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


    }
}