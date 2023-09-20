import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchPage.css';

const SearchPage = ({user}) => {

    //State variables to set the search and results. Set each to an empty array. 
    const [search, setSearch] = useState([])
    const [books, setBooks] = useState([])

    //Function to handle a submit with an axios call, then set results. 
    const handleSubmit = async(e) => {
        e.preventDefault();
        let response = await axios.get(`https://www.googleapis.com/books/v1/volumes/?q=${search}/`)
        console.log(response)
        setBooks(response.data.items)
        console.log(user)
    }


    return ( 
        <div className="search-container">
            <div className="search-header">What do you want to search for?</div>
            <form onSubmit={handleSubmit}>
                {/* <h2>Search For Books:   </h2> */}
                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className="search-input"/> 
                <input type="submit" value="Search" className="search-button"/>
            </form>
            <div className="search-results">
                {books && books.map((item) => (              
                <div className="search-item" >
                    <Link to={`/bookdetails/${item.id}`}>
                    <p className="search-item-title">{item.volumeInfo.title}</p>
                    <img src={item.volumeInfo.imageLinks.thumbnail} alt="Thumbnail"></img>
                    </Link>
                 </div>

            ))} 
            </div>

        </div>

     );
}
 
export default SearchPage;
