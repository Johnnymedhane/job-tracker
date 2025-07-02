import { useState } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";

function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    // const user = JSON.parse(localStorage.getItem("user"));
    const isAuthenticated = localStorage.getItem("auth") === "true";



    function handleLogout() {
        localStorage.setItem("auth", false);
        navigate("/");
        console.log("User logged out");
    }
    
    return (
        <aside className="app-navbar">

            <nav className={`header-nav ${isOpen ? "open" : ""}`} >
                <NavLink to="/" className="header-logo">
                    <img src="/logo1.png" alt="Job Tracker Logo" />
                </NavLink>

                    <Button style={"hamburger-btn"} onClick={() => setIsOpen(!isOpen)}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </Button>
                    <ul>
          {!isAuthenticated && (
            <>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/auth/login">Login</NavLink></li>
              <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
            </>
          )}

          {isAuthenticated && (
            <>
              <li><NavLink to="/criterion">Criteria</NavLink></li>
              <li><NavLink to="/app/jobList">Job List</NavLink></li>
              <li><NavLink to="/app/jobForm">Add Job</NavLink></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
            </nav>
        </aside>
    )
}

export default Header;
