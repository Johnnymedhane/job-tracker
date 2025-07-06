import { Link, NavLink, Outlet } from "react-router-dom"

import Button from "../components/Button"
import Navbar from "../components/Navbar"
import { useJobs } from "../contexts/JobsContexts";

function Criterion() {
   
    
    const { mustHaveCriteria, niceToHaveCriteria, jobs } = useJobs();
    const navigateTo = mustHaveCriteria.length > 0 && niceToHaveCriteria.length > 0 ? jobs.length > 0 ? "/app" : "/app/jobForm" : "/criterion";

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
            <Link to={navigateTo} className="btn-criterion">
                <Button >Next &rarr; </Button>
            </Link>
            
        </div>
    )
}

export default Criterion
