// components/JobFormFields.jsx

import { useEffect, useRef } from "react";
import { useJobs } from "../contexts/JobsContexts";
import Button from "./Button";
import { useAddJobContext } from "../contexts/addJobContexts";

function JobFormFields({
    title,
    setTitle,
    company,
    setCompany,
    website,
    setWebsite,
    connection,
    setConnection,
    activityLog,
    setActivityLog,
    selectedMustHave,
    handleMustHaveChange,
    handleSubmit,
    successMessage,
    
})
{
  const { mustHaveCriteria, niceToHaveCriteria, isLoading, error } = useJobs();
  const{handleNiceToHaveChange}= useAddJobContext()
  const inpitFields = useRef([]);

  useEffect(function () {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        const currentIndex = inpitFields.current.findIndex(
          (input) => document.activeElement === input
        );
        if (currentIndex >= 0 && currentIndex < inpitFields.current.length - 1) {
          inpitFields.current[currentIndex + 1].focus();
        }
      }
      else if (event.key === "ArrowLeft") {
        const currentIndex = inpitFields.current.findIndex(
          (input) => document.activeElement === input
        );
        if (currentIndex > 0) {
          inpitFields.current[currentIndex - 1].focus();
        }
      }  

    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }

  }, [])
  
  function handleChange(e) {
    const { value } = e.target;
    
    handleNiceToHaveChange(value);

    console.log("value", value);
    
  }

    return (
        <form onSubmit={handleSubmit} className="add-job-form">
      {error && <p className="error-message">{error}</p>}
      {!error && successMessage &&
        <div className="success-message">
          <span className="icon-check">
    <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="currentColor">
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  </span>
          <p>{successMessage}</p>
        </div>}
      {!error && !successMessage && (
        <>
            <h2>Add New Job</h2>
            <div className="form-fields">
            <input
              ref={el => inpitFields.current[0]= el}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title" required />
            <input
              ref={el => inpitFields.current[1] = el}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company" required />
            <input
              ref={el => inpitFields.current[2] = el}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website" />
            <input ref={el => inpitFields.current[3] = el}
              value={connection}
              onChange={(e) => setConnection(e.target.value)}
              placeholder="Connection" />
            <textarea ref={el => inpitFields.current[4] = el}
              value={activityLog}
              onChange={(e) => setActivityLog(e.target.value)}
                placeholder="Activity Log" />
              </div>

          <h3>Must Have Criteria</h3>
          <ul>
            {mustHaveCriteria.map((c) => (
              <li key={c.id}>
                <label>
                  <input
                     type="checkbox"
                    checked={selectedMustHave.includes(c.id)}
                    onChange={() => handleMustHaveChange(c.id)}
                  />
                  {c.criteria}
                </label>
              </li>
            ))}
          </ul>

          <h3>Nice to Have Criteria (rank from 1 to 5)</h3>
          <ul>
            {niceToHaveCriteria.map((c) => (
              <li key={c.id}>
                <label> {c.criteria}
                        <select
                    onChange={handleChange} 
                   
                   >
                    <option value="">Select Rank</option>
                    {[1, 2, 3, 4, 5].map((rank) => (
                      <option 
                        key={rank}
                        value={rank}

                      >
                        {rank}
                      </option>
                    ))}
                  
                  </select>
                </label>
              </li>

             
            ))}
          </ul>
          
        </>
        )}
      <Button type="submit">{isLoading ? "Submitting..." : "Add Job"}</Button>
    </form>
  );
}


export default JobFormFields;