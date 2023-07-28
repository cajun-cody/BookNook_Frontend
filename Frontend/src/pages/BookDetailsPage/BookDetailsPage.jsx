import BookDetailsCard from "../../components/BookDetailsCard/BookDetailsCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const BookDetailsPage = (props) => {

    //State variables for axios requests
    const [user, token] = useAuth();
    const {bookId} = useParams();
    const [book, setBook] = useState({});
    const [fullReviewDetails, setFullReviewDetails] = useState({})

    //Get a book to display on details
    const getBook = async() =>{
        let response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        setBook(response.data)
        console.log("Here is the book",response.data)
    }

    //Get the details of a review associated with the bookId from backend. 
    const getBookReviewDetails = async() => {
        let response = await axios.get(`http://localhost:5216/api/BookDetails/${bookId}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        setFullReviewDetails(response.data)
        console.log(response.data)
    }
    //UseEffect to run on render with bookId as a dependancy. 
    useEffect(() =>{
        getBook()
        getBookReviewDetails()
    }, [bookId]) 


    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    return ( 
        <div>
            <div>This is my book details!</div>
            <div className="bookInfo">
                {book.volumeInfo && 
                <div>
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/>
                    <h1>{book.volumeInfo.title}</h1>
                    <p>{book.volumeInfo.description}</p>
                </div>
                }
            </div>
            <div className="reviewInfo">
            {fullReviewDetails.reviews?(
                    <>
                        <h2>Average User Rating: {fullReviewDetails.averageRating}</h2>
                        <h3>User Reviews:</h3>
                        {fullReviewDetails.reviews.map((review, index) => 
                        <><span key={index}>{capitalizeFirstLetter(review.user.userName)}</span> - <span>{review.text}</span><br /></>)} 
                    </> 
                ) : <></>
                } 
                <br />
            </div>
           
        </div>

     );
}
 
export default BookDetailsPage;