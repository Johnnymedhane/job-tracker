import { Link } from "react-router-dom"
import Button from "../components/Button"

import Navbar from "../components/Navbar"

function HomePage() {

    return (
        <div className="home-page">
            <Navbar />
            <div className="home-title">
                <h1 className="title">Job Tracker </h1>
                
                <svg xmlns="http://www.w3.org/2000/svg" 
                height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Zm400 360H600v80H360v-80H160v160h640v-160Zm-360 0h80v-80h-80v80Zm-280-80h200v-80h240v80h200v-200H160v200Zm320 40Z"/>
                </svg>
            </div>

            <div className="text-content">
           
                <p>Keep track of your job search journey!</p>
                <p>Your one-stop solution for managing job applications.</p>
                <p>Track your job applications, connections, and activity logs with ease.</p>
                <p>Stay organized and never miss an opportunity!</p>
                <p>Get started now and take control of your job search!</p>
            </div>
            <Link to="/auth" className="link">
           <Button style={"btn-home"}>Get Started &rarr;</Button>
           </Link>
        </div>

    )
}


export default HomePage
