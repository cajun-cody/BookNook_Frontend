import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none" }}>
            <b>BookNook</b>
          </Link>
        </li>
        <li>          
          <Link to="/search" style={{ textDecoration: "none" }}>
            <b>Search</b>
          </Link>
        </li>
        <li>
          {user ? (
              <Link to="/favorites" style={{ textDecoration: "none" }}>
                <b>Favorites</b>
              </Link>
          ) : <></>}
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
