using FullStackAuth_WebAPI.Data;
using FullStackAuth_WebAPI.DataTransferObjects;
using FullStackAuth_WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FullStackAuth_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookDetailsController(ApplicationDbContext context)
        {
            _context = context;
        }

        //// GET: api/<BookDetailsController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/BookDetails/5
        [HttpGet("{bookId}")]
        public IActionResult Get(string bookId)
        {
            //
            List<ReviewWithUserDTO> reviews = _context.Reviews
                .Where(b => b.BookId == bookId).Include(b => b.User).Select(r => new ReviewWithUserDTO
                {
                    Id = r.Id,
                    BookId = r.BookId,
                    Text = r.Text,
                    Rating = r.Rating,
                    User = new UserForDisplayDto
                    {
                        Id = r.User.Id,
                        FirstName = r.User.FirstName,
                        LastName = r.User.LastName,
                        UserName = r.User.UserName
                    }
                }).ToList();
            //Set favorite to false unless user is validated
            bool favorite = false;
            //Find the current users UserId
            var userId = User.FindFirstValue("id");
            //Check if userId is not null. If not select the books that are favorited by their bookId. 
            if (userId != null)
            {
                favorite = _context.Favorites.Where(f => f.UserId == userId).Select(f => f.BookId).ToList().Contains(bookId);
            }

            //DTO returns a list of reviews associated with the bookId
            BookDetailsDTO bookDetails = new BookDetailsDTO
            {
                Reviews = reviews,
                IsFavorite = favorite,
                AverageRating = reviews.Select(r => r.Rating).Sum() / reviews.Count(),

            };


            return StatusCode(200, bookDetails);
        }

        // POST api/<BookDetailsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<BookDetailsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BookDetailsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
