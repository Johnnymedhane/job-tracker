import { useState } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";



const appNavigation = [
  {"name": "Criterion", "path": "/criterion"},
  {"name": "Job List", "path": "/app/jobList"},
  {"name": "Job Form", "path": "/app/jobForm"}
];
const authNavigation = [
  {"name": "Home", "path": "/"},
  {"name": "Login", "path": "/auth/login"},
  {"name": "Sign Up", "path": "/auth/signup"}
];
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
              {authNavigation.map((navItem) => (
                <li key={navItem.name}
                onClick={() => setIsOpen(false)}>
                  <NavLink to={navItem.path}>{navItem.name}</NavLink>
                </li>
              ))}
            </>
          )}

          {isAuthenticated && (
            <>
              {appNavigation.map((navItem) => (
                <li key={navItem.name}
                onClick={() => setIsOpen(false)}>
                  <NavLink to={navItem.path}>{navItem.name}</NavLink>
                </li>
              ))}
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
            </nav>
        </aside>
    )
}

export default Header;
