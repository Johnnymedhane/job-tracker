import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Signup() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
  
    if (!email || !password || !name) {
      return alert("Please fill out all fields.");
    }
  
    const userData = {
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    };
  
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("auth", "true");
  
    navigate("/app/jobList");
  }
  
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} className="signup-form">
              <input type="text" 
                  value={name}
                 onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required />
             
         <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
  <div className="password-field">     
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
            required
            className="password-input"
          />
        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" height="18px"
                          viewBox="0 -960 960 960"
                          width="18px" fill="#1f1f1f">
                          <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                      </svg> : <svg xmlns="http://www.w3.org/2000/svg"
                              height="18px"
                              viewBox="0 -960 960 960"
                              width="18px" fill="#1f1f1f">
                              <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                      </svg>}
        </span>
          
            </div>
        <Button type="submit">Sign Up</Button>
          </form>
          <p>Already have an account? <Link to="/auth">Login</Link></p>


    </div>
  );
}

export default Signup;
