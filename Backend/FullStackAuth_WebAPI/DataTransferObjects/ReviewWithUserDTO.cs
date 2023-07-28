namespace FullStackAuth_WebAPI.DataTransferObjects
{
    public class ReviewWithUserDTO
    {
        public int Id { get; set; }
        public string BookId { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public UserForDisplayDto User { get; set; }
    }
}
