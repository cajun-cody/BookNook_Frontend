
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import './HomePage.css';

const HomeContent = ({ user, token }) => {
  const [books, setBooks] = useState([]);

  //Func to capitalize first letter of username.
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    fetchBooks();
  }, [token]);

  const fetchBooks = async () => {
    try {
      let response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=money&maxResults=6",
        // {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // }
      );
      setBooks(response.data.items);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="home-content">
      <h1 className="welcome">Welcome, {capitalizeFirstLetter(user.userName)}!</h1>
      <Link to="/search" className="search-link">
        <div>Search Books</div>
      </Link>
      <h4 className="interest">Is your interest in books about money?</h4>
      <div className="book-list">
        {books &&
        books.map((item) => (
          <Link to={`/bookdetails/${item.id}`} key={item.id} className="book">
            <img src={item.volumeInfo.imageLinks.thumbnail} alt="Thumbnail"></img>
            <p className="book-title">{item.volumeInfo.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [user, token] = useAuth();

  // Check if the user is logged in
  if (!user || !token) {
    // If not logged in, you can return a message or redirect to a login page
    return (
      <div className="container">
        <p>Please login to access BookNook.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return <HomeContent user={user} token={token} />;
};

export default HomePage;
