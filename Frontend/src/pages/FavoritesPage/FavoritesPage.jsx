import { useState, useEffect} from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";

const FavoritesPage = (props) => {
    const [user, token] = useAuth();
    const [favorites, setFavorites] = useState([]);

    useEffect(() =>{
        const getFavorites = async() => {
            let response = await axios.get("http://localhost:5216/api/Favorites", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            setFavorites(response.data)
            console.log(response.data)
        }   
        getFavorites()
    },[])


    return ( 
        <div>This is my favorite.
            <div>
                {favorites && 
                favorites.map((item)=> (
                    <div>
                        <Link to={`/bookdetails/${item.bookId}`} key={item.id} >
                            <img src={item.thumbnailUrl} alt="Thumbnail"></img>
                            <p>{item.title}</p>
                        </Link>
                         
                    </div>
                ))}
            </div>         
        </div>
     );
};
 
export default FavoritesPage;