import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchPage = (props) => {

    //State variables to set the search and results. Set each to an empty array. 
    const [search, setSearch] = useState([])
    const [books, setBooks] = useState([])

    //Function to handle a submit with an axios call, then set results. 
    const handleSubmit = async(e) => {
        e.preventDefault();
        let response = await axios.get(`https://www.googleapis.com/books/v1/volumes/?q=${search}/`)
        console.log(response)
        setBooks(response.data.items)
    }



    return ( 
        <div>
            <div>This is my search page!</div>
            <form onSubmit={handleSubmit}>
                <h2>Search For Books:   </h2>
                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} /> 
                <input type="submit" value="Search" />
            </form>
            {books && books.map((item) => (              
                <Link to={`/bookdetails/${item.id}`}>
                    <p>{item.volumeInfo.title}</p>
                    <img src={item.volumeInfo.imageLinks.thumbnail} alt="Thumbnail"></img>
                    </Link>
            ))}
        </div>

     );
}
 
export default SearchPage;
