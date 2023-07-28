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
    const [text, setText] = useState();
    const [rating, setRating] = useState(0);

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

    //Handle submit to post a new review. 
    const handleSubmit = async(e) => {
        e.preventDefault();
        let newReview = {
            bookId: bookId,
            text: text,
            rating: rating
        }
        console.log(newReview)
        let response = await axios.post('http://localhost:5216/api/Reviews', newReview, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        console.log(response.status)
        if(response.status === 201){
            setText()
            setRating(0)
            getBookReviewDetails()
        }
    }
    //Handle edit of a review. 
    // const handleEdit = async(e) => {
    //     e.preventDefault();
    //     let editedReview = {
    //         text: text,
    //         rating: rating
    //     }
    //     console.log(editedReviewReview)
    //     let response = await axios.post(`http://localhost:5216/api/Reviews/${bookId}`, {
    //         headers: {
    //             Authorization: "Bearer " + token
    //         }
    //     });
    //     console.log(response.status)
    //     if(response.status === 201){
    //         setText()
    //         setRating(0)
    //         getBookReviewDetails()
    //     }
    // }


    //Handle favorite and unfavorite
    const handleFavorite = async() => {
        let favorite = {
            bookId: bookId,
            title: book.volumeInfo.title,
            thumbnailUrl: book.volumeInfo.imageLinks.smallThumbnail
        }
        console.log(favorite)
        let response = await axios.post(`http://localhost:5216/api/Favorites`, favorite, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        console.log(response.status)
        if(response.status === 201){
            getBookReviewDetails()
        }
    }

    const handleUnFavorite = async() => {

        let response = await axios.delete(`http://localhost:5216/api/Favorites/${bookId}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        console.log(response.status)
        if(response.status === 204){
            getBookReviewDetails()
        }
    }




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
                    {user ? fullReviewDetails.isFavorite ? <button className="favButton" onClick={handleUnFavorite}>Remove Favorite</button> : <button className="favButton" onClick={handleFavorite}>Add Favorite</button> : <></>}
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
                    <><span key={index}>{capitalizeFirstLetter(review.user.userName)}</span> - <span>{review.text}</span><br /></>)}</> 
                ) : <></>
                } 
            <br />
            {user ? //Shor Circuit Conditional to check if the user is logged in. 
            <form onSubmit={handleSubmit}>
                    <label>Leave A Review:</label>
                    <textarea className="reviewText" rows="10" cols="40" type="text" onChange={(e) => setText(e.target.value)} value={text} />
                    <br />
                    <label>Rating (1-5):</label>
                    <input className="ratingInput" type="number" onChange={(e) => setRating(e.target.value)} value={rating} />
                    <button type="submit">Post Review</button>
                </form> : <p>Log in to leave review</p>}

            </div>
           
        </div>

     );
}
 
export default BookDetailsPage;