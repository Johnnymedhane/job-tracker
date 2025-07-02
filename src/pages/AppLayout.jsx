import {  Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAddJobContext } from "../contexts/addJobContexts"

function JobsPage() {
    const { isBlure } = useAddJobContext();
    
    

    // const navigate = useNavigate();
   

    return (
        <div className={`jobs-page ${isBlure ? "show-add-job-form" : ""}`}>    
            <Navbar />
            <main className="main-content">
            <Outlet />
            </main>
            <div className="overlay" onClick={() => {}}></div>
        </div>
    )
}

export default JobsPage;
