import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

function AuthenticationPage() {
    return (
        <div className="auth-layout">
            <Navbar />
        <div className="auth-container">
                <h1 className="aut-title">Welcome to Job Tracker</h1>
                <nav className="auth-nav">
                    <ul>
                        <li>
                            <NavLink to="/auth/login" className="auth-link">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/auth/signup" className="auth-link">Sign Up</NavLink>
                        </li>
                    </ul>
                 
                </nav>
                <Outlet />
                <Link to="/" className="btn-auth">
                        <Button> &larr; Go to Home</Button>
                    </Link>
            </div>  
            <footer className="auth-footer">
                <p>&copy; {new Date().getFullYear()} Job Tracker. All rights reserved.</p>
            </footer>
      </div>
    );
}

export default AuthenticationPage
