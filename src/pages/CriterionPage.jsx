import { Link, NavLink, Outlet } from "react-router-dom"

import Button from "../components/Button"
import Navbar from "../components/Navbar"

function Criterion() {
   
    

    
    return (
        <div className="criterion">
            <Navbar />
          <div className="criterion-main">
            <nav className="criterion-nav">
                <ul>
                    <li>
                        <NavLink to="must-have">Must Have Criteria</NavLink>
                    </li>
                    <li>
                        <NavLink to="nice-to-have">Nice to Have Criteria</NavLink>
                    </li>
                </ul>
            </nav>
                <Outlet />
            </div>
            <Link to="/app" className="btn-criterion">
                <Button >Finish &rarr; </Button>
            </Link>
            
        </div>
    )
}

export default Criterion
