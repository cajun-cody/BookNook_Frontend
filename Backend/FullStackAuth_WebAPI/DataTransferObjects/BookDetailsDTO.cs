using FullStackAuth_WebAPI.Models;

namespace FullStackAuth_WebAPI.DataTransferObjects
{
    public class BookDetailsDTO
    {
        //ICollections since there would be a collection of reviews with different users. 
        public List<ReviewWithUserDTO> Reviews { get; set; }
        public bool IsFavorite { get; set; }
        public double AverageRating { get; set; }
    }
}
