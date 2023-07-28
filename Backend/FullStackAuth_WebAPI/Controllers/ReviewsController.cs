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
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/<ReviewsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ReviewsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }



        // POST api/Reviews
        [HttpPost, Authorize]
        public IActionResult Post([FromBody] Review review )  //Add validation to this to check user and check data sent in.
        {
            //Get the User Id from the token. 
            var userId = User.FindFirstValue("id");
            //Get the user object from the db. 
            User loggedInUser = _context.Users.Find(userId);
            //Match the userId to make sure it is the same as the loggedInUser
            review.UserId = userId;
            //Add the review and save to db. 
            _context.Reviews.Add(review);
            _context.SaveChanges();

            return StatusCode(201, review);
        }









        // PUT api/<ReviewsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ReviewsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
