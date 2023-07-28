using FullStackAuth_WebAPI.Data;
using FullStackAuth_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FullStackAuth_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FavoritesController(ApplicationDbContext context)
        {
            _context = context;
        }



        // GET: api/<FavoritesController>
        [HttpGet, Authorize]
        public IActionResult Get()
        {
            List<Favorite> myFavorites = _context.Favorites.Where(f => f.UserId == User.FindFirstValue("id")).ToList();
            return StatusCode(200, myFavorites);
        }

        // GET api/<FavoritesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }



        // POST api/Favorites
        [HttpPost, Authorize]
        public IActionResult Post([FromBody] Favorite book)
        {
            //Check current user to get id. 
            var userId = User.FindFirstValue("id");
            //Check if it is favorite already
            var alreadyFavorited = _context.Favorites.Where(f => f.BookId == book.BookId).Where(f => f.UserId == userId).ToList();
            if (!alreadyFavorited.Any())
            {
                book.UserId = userId;
                _context.Favorites.Add(book);
                _context.SaveChanges();
            }
            else
            {
                return Conflict(new { error = "Resource Already Exists", message = "You already favorited this book." });
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return StatusCode(201, book);
        }




        // PUT api/<FavoritesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FavoritesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
