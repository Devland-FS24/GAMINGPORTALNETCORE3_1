using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Net;
using EYGamingClub.Models;

namespace EYGamingClub.Controllers
{
    public class QuestionController : Controller
    {
        private readonly EYGamingCubContext _context;

        public QuestionController(EYGamingCubContext context)
        {
            _context = context;
        }

        // GET: Question
        public async Task<IActionResult> Index()
        {

            return View(await _context.Questions.ToListAsync());
        }

        // GET: Employee/Create
        public IActionResult AddOrEdit(int id = 0)
        {

            if (id == 0)
                return View(new Questions());
            else
                return View(_context.Questions.Find(id));

        }

        // POST: Employee/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddOrEdit([Bind("QuestionId,QuestionText,QuestionStatus,Answer")] Questions question)
        {
            if (ModelState.IsValid)
            {
                if (question.QuestionId == 0)
                    _context.Add(question);
                else
                    _context.Update(question);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(question);
        }


        [HttpGet]
        public async Task<HttpResponseMessage> FilterByQuestionStatus(string questiontoken)
        {
            var questionsaskedresult = "";
            var questionsasked = await _context.Questions.Where(m => m.QuestionStatus == 0).ToListAsync();

            if (questionsasked != null && questionsasked.Count() > 0)
            {
                //winnersearchresults = winnersearchresults + winnerId + ";" + email + ";" + prizeType + ";" + score + ";" + playerID + ";" + gPNCode + ";" + fullName + ";" + playerNick;
                var qqasked = "";
                var qqstatus = "";
                var qqanswer = "";

                foreach (Questions q in questionsasked)
                {
                    qqasked = q.QuestionText;
                    qqstatus = q.QuestionStatus.ToString();
                    qqanswer = q.Answer;

                    questionsaskedresult = questionsaskedresult + qqasked + ";" + qqstatus + ";" + qqanswer + "|";

                }

            }
            else
            {
                questionsaskedresult = "NoResults";
            }

            Response.Headers.Add("JSonQuestionsAskedResult", questionsaskedresult);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }


        // GET: Employee/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            var question = await _context.Questions.FindAsync(id);
            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }


        public async Task<IActionResult> ClearAllQuestionsServer()
        {
            //var message1 = "";
            var allcurrentquestions = await _context.Questions.ToListAsync();

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

            //Send response to UI
            //Response.Headers.Add("JSonAllQuestionsServer", message1);
            //return new HttpResponseMessage(HttpStatusCode.Created);

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> ActivateAllQuestionsServer()
        {

            var allcurrentquestions = await _context.Questions.ToListAsync();

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

            //Send response to UI

            return RedirectToAction(nameof(Index));
        }

        /*[OutputCache(NoStore = true, Location = OutputCacheLocation.Client, Duration = 3)] */// every 3 sec
        [ResponseCache(VaryByHeader = "User-Agent", Duration = 1)]
        public ActionResult GetContributor()
        {

            IEnumerable<ModelTest> list = Repository.GetData();


            int min = list.Min(m => m.ID);

            int max = list.Max(m => m.ID);



            int randomId = new Random().Next(min, max + 1);



            ModelTest model = list.FirstOrDefault(m => m.ID == randomId);

            Questions x = new Questions();

            return PartialView("Contributor", x);



        }
    }
}