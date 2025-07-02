import { createContext, useContext, useEffect, useReducer } from "react";


const jobsContext = createContext();
const BASE_URL = "https://job-tracker-backend-vww0.onrender.com";




function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true
            };

        case "jobsData/loaded":
            return {
                ...state,
                jobs: action.payload,
                isLoading: false
            };
        case "jobsData/added":
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
                isLoading: false
            };
        case "jobsData/updated":
            return {
                ...state,
                jobs: state.jobs.map(job =>
                    job.id === action.payload.id ? action.payload : job
                ),
                isLoading: false
            };
        
        case "jobsData/deleted":
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== action.payload.id),
                isLoading: false
            };
        
        
        case "mustHaveCriteria/essential":
            return {
                ...state,
                mustHaveCriteria: action.payload,
                isLoading: false
            };
        case "mustHaveCriteria/added":
            return {
                ...state,
                mustHaveCriteria: [...state.mustHaveCriteria, action.payload],
                isLoading: false
            };
        
        
        case "mustHaveCriteria/deleted":
            return {
                ...state,
                mustHaveCriteria: state.mustHaveCriteria.filter(item => item.id !== action.payload.id),
                isLoading: false
            };
        
        
        case "niceToHaveCriteria/preferred":
            return {
                ...state,
                niceToHaveCriteria: action.payload,
                isLoading: false
            };
        
        case "niceToHaveCriteria/added":
            return {
                ...state,
                niceToHaveCriteria: [...state.niceToHaveCriteria, action.payload],
                isLoading: false
            };

        case "niceToHaveCriteria/deleted":
            return {
                ...state,
                niceToHaveCriteria: state.niceToHaveCriteria.filter(item => item.id !== action.payload.id),
                isLoading: false
            };

        case "selectedCriteria/created":
            return {
                ...state,
                selectedCriteria: action.payload
            };

        case "rejected":
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default: throw new Error(`Unknown action type: ${action.type}`);
    }
}

// Initial state for the jobs context

const initialJobs = {
    isLoading: false,
    jobs: [],
    error: "",
    mustHaveCriteria: [],
    niceToHaveCriteria: [],
    selectedCriteria: [],
}



function JobsProvider({ children }) {

    // const[jobs, setJobs] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const [mustHaveCriteria, setMustHaveCriteria] = useState([]);
    // const [niceToHaveCriteria, setNiceToHaveCriteria] = useState([]);
    // const [selectedCriteria, setSelectedCriteria] = useState([]);

    const[{ isLoading, jobs, error, mustHaveCriteria, niceToHaveCriteria, selectedCriteria}, dispatch] = useReducer(reducer, initialJobs);


    // Fetch jobs data when the component mounts
    useEffect(function () {

        async function fetchJobs() {
            dispatch({ type: "loading" });
            try {
                const response = await fetch(`${BASE_URL}/jobs`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                dispatch({ type: "jobsData/loaded", payload: data });

            } catch (err) {
                dispatch({ type: "rejected", payload: err.message });
            } 
        }

        fetchJobs();
    }, [])

    
    // Fetch must-have criteria when the component mounts
    useEffect(function () {
       async function fetchMustHaveCriteria() {
           dispatch({ type: "loading" });
            try {
                const response = await fetch(`${BASE_URL}/mustHave`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                dispatch({ type: "mustHaveCriteria/essential", payload: data });


            } catch (err) {
                dispatch({ type: "rejected", payload: err.message });
            }
        }
        fetchMustHaveCriteria();
    }, [])

    // update jobs data 
    async function updateJob(jobId, updatedFields) {
        dispatch({ type: "loading" });
        try {
          const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
          });
      
          if (!response.ok) throw new Error("Failed to update job");
      
          const updatedJob = await response.json();
      
          dispatch({
            type: "jobsData/updated",
            payload: updatedJob,
          });
        } catch (err) {
          dispatch({ type: "rejected", payload: err.message });
        }
      }
      
    

    // Fetch nice-to-have criteria when the component mounts

    useEffect(() => {
        async function fetchNiceToHaveCriteria() {
            dispatch({ type: "loading" });
            try {
                const response = await fetch(`${BASE_URL}/niceToHave`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                dispatch({ type: "niceToHaveCriteria/preferred", payload: data });
            } catch (err) {
                dispatch({ type: "rejected", payload: err.message });
            }
        }
        fetchNiceToHaveCriteria();
    }, []);


    // Function to add a job
    async function addJob(newJob) {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/jobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newJob)
            });
            if (!response.ok) {
                throw new Error("Failed to add job");
            }
            const data = await response.json();
            dispatch({ type: "jobsData/added", payload: data });
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
            console.error("Error adding job:", err);
        }
    }







    // Function to add a must-have criterion
    
    async function addMustHaveCriterion(newCriterion) {

        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/mustHave`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ criteria: newCriterion })
            });

            if (!response.ok) {
                throw new Error("Failed to add criterion");
            }

            const data = await response.json();
            dispatch({ type: "mustHaveCriteria/added", payload: data });
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
        } 



    }
    // Function to add a nice-to-have criterion
    async function addNiceToHaveCriterion(newCriterion) {
        dispatch({ type: "loading" });
        try {
            
            const response = await fetch(`${BASE_URL}/niceToHave`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ criteria: newCriterion })
            });

            if (!response.ok) {
                throw new Error("Failed to add criterion");
            }

            const data = await response.json();
            dispatch({ type: "niceToHaveCriteria/added", payload: data });
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
        } 
    }



// // Function to delete a job
    async function deleteJob(jobId) {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/jobs/${jobId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete job");
            }

            // const data = await response.json();
            dispatch({ type: "jobsData/deleted", payload: { id: jobId } });
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
        } 
    }


    // // Function to delete a must-have criterion

    async function deleteMustHaveCriterion(criterionId) {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/mustHave/${criterionId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete criterion");
            }
            // const data = await response.json();


            dispatch({ type: "mustHaveCriteria/deleted", payload: { id: criterionId } });
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
        } 
    }

    // Function to delete a nice-to-have criterion
    async function deleteNiceToHaveCriterion(criterionId) {
        dispatch({ type: "loading" });
        try {
            const response = await fetch(`${BASE_URL}/niceToHave/${criterionId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete criterion");
            }

            // const data = await response.json();
            dispatch({ type: "niceToHaveCriteria/deleted", payload: { id: criterionId } });
        } catch (err) {
            dispatch({ type: "rejected", payload: err.message });
        } 
    }

    return (
        <jobsContext.Provider value={{
            jobs,
            isLoading,
            selectedCriteria,
            error,
            mustHaveCriteria,
            niceToHaveCriteria,
            addMustHaveCriterion,
            deleteMustHaveCriterion,
            deleteNiceToHaveCriterion,
            addNiceToHaveCriterion,
            addJob,
            deleteJob,
            updateJob,
            dispatch, // Expose the dispatch function for more complex actions if needed
        }}>
            {children}
        </jobsContext.Provider>
    )
}

function useJobs() {
    if (!jobsContext) {
        throw new Error("useJobs must be used within a JobsProvider");
    }
    return useContext(jobsContext);
}

export { JobsProvider, useJobs };