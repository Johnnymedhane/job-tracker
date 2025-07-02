import { useEffect, } from "react";

import { useNavigate } from "react-router-dom";
import { useJobs } from "../contexts/JobsContexts";
import { useAddJobContext } from "../contexts/addJobContexts";
import JobFormFields from "./JobFormFields";




function AddJobForm() {

  const navigate = useNavigate();

  const { addJob, mustHaveCriteria } = useJobs();
  
  
  // Access context values
  const { title, setTitle
    , company, setCompany,
    website, setWebsite,
    connection, setConnection,
    activityLog, setActivityLog,
    selectedMustHave, setSelectedMustHave,
    rankedNiceToHave, setRankedNiceToHave,
    handleMustHaveChange,
   successMessage, setSuccessMessage
  } = useAddJobContext();

 

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        navigate("/app/jobList");
      }
    };
    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
  

 


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      title,
      company,
      website,
      connection,
      activityLog,
      mustHave: mustHaveCriteria
        ?.map(c => selectedMustHave?.includes(c.id)),
      niceToHave: rankedNiceToHave,
    };

    try {
      await addJob(newJob);
      setSuccessMessage("Job added successfully!");
      alert("Job added!");

      // Clear form
      setTitle("");
      setCompany("");
      setWebsite("");
      setConnection("");
      setActivityLog("");
      setSelectedMustHave([]);
      setRankedNiceToHave([]);

    } catch (err) {
      console.error("Failed to add job", err);
      alert("Failed to add job.");
    } finally {
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/app/jobList");
      }, 3000);
    }
  };

      
  





  return (
    <JobFormFields 
      title={title}
      setTitle={setTitle}
      company={company}
      setCompany={setCompany}
      website={website}
      setWebsite={setWebsite}
      connection={connection}
      setConnection={setConnection}
      activityLog={activityLog}
      setActivityLog={setActivityLog}
      selectedMustHave={selectedMustHave}
      handleMustHaveChange={handleMustHaveChange}
      handleSubmit={handleSubmit}
      successMessage={successMessage}
     
      />
  )
}
//     <form onSubmit={handleSubmit} className="add-job-form">
//       {error && <p className="error-message">{error}</p>}
//       {!error && successMessage &&
//         <div className="success-message">
//           <span className="icon-check">
//     <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="currentColor">
//       <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
//     </svg>
//   </span>
//           <p>{successMessage}</p>
//         </div>}
//       {!error && !successMessage && (
//         <>
//           <h2>Add New Job</h2>
//           <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" required />
//           <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" required />
//           <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" />
//           <input value={connection} onChange={(e) => setConnection(e.target.value)} placeholder="Connection" />
//           <input value={activityLog} onChange={(e) => setActivityLog(e.target.value)} placeholder="Activity Log" />

//           <h3>Must Have Criteria</h3>
//           <ul>
//             {mustHaveCriteria.map((c) => (
//               <li key={c.id}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={selectedMustHave.includes(c.id)}
//                     onChange={() => handleMustHaveChange(c.id)}
//                   />
//                   {c.criteria}
//                 </label>
//               </li>
//             ))}
//           </ul>

//           <h3>Nice to Have Criteria (rank from 1 to 5)</h3>
//           <ul>
//             {niceToHaveCriteria.map((c) => (
//               <li key={c.id}>
//                 <label> {c.criteria}
//                   <select
//                     onChange={handleChange} 
                   
//                    >
//                     <option value="">Select Rank</option>
//                     {[1, 2, 3, 4, 5].map((rank) => (
//                       <option 
//                         key={rank}
//                         value={rank}

//                       >
//                         {rank}
//                       </option>
//                     ))}
                  
//                   </select>
//                 </label>
//               </li>

             
//             ))}
//           </ul>
          
//           <h3>Selected Nice to Have Criteria</h3>
//           <ul>
//             {newList.map((item, index) => (
//               <li key={index}>
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </>
//         )}
//       <Button type="submit">{isLoading ? "Submitting..." : "Add Job"}</Button>
//     </form>
//   );
// }

export default AddJobForm;
