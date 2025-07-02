import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useJobs } from "../contexts/JobsContexts";
import { useAddJobContext } from "../contexts/addJobContexts";
import JobFormFields from "./JobFormFields";




function EditJobForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { jobs, updateJob, mustHaveCriteria } = useJobs();
  ;
    const jobToEdit = jobs.find((job) => job.id === Number(id));
    
    const {
        title, setTitle,
        company, setCompany,
        website, setWebsite,
        connection, setConnection,
        activityLog, setActivityLog,
        selectedMustHave, setSelectedMustHave,
        rankedNiceToHave, setRankedNiceToHave,
        successMessage, setSuccessMessage,
    } = useAddJobContext();

    useEffect(() => {
        if (jobToEdit) {
            setTitle(jobToEdit.title || "");
            setCompany(jobToEdit.company || "");
            setWebsite(jobToEdit.website || "");
            setConnection(jobToEdit.connection || "");
            setActivityLog(jobToEdit.activityLog || "");
            setRankedNiceToHave(jobToEdit.niceToHave || []);
        }
    }, [jobToEdit, setTitle, setCompany, setWebsite, setConnection, setActivityLog, setRankedNiceToHave]);

   

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === "Escape") {
            navigate(-1); // Navigate back to the previous page
          }
        };
        // Add event listener for keydown
        window.addEventListener("keydown", handleKeyDown);
    
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [navigate]);
      






    
     
    async function handleSubmit(e) {
        e.preventDefault();

        const updatedJob = {
            title,
            company,
            website,
            connection,
            activityLog,
            mustHave: mustHaveCriteria?.map(c => selectedMustHave?.includes(c.id)),
          niceToHave: rankedNiceToHave,
        };

       try {
            await updateJob(Number(id), updatedJob);
           setSuccessMessage("Job updated successfully!");
            setTitle("");
            setCompany("");
            setWebsite("");
            setConnection("");
            setActivityLog("");
            setSelectedMustHave([]);
            setRankedNiceToHave([]);
            

        } catch (error) {
           console.error("Failed to update job", error);
            setSuccessMessage("Failed to update job.");
           console.error("Failed to update job", error);
            setSuccessMessage("Failed to update job.");
       } finally {
            setTimeout(() => {
                navigate("/app/jobList");
                setSuccessMessage("");
            }, 3000);
        }

    }
    if (!jobToEdit) {
        return <div>Job not found</div>;
    }
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
            handleMustHaveChange={(id) => {
                setSelectedMustHave((prev) =>
                    prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
                );
            }}
            
            handleSubmit={handleSubmit}
            successMessage={successMessage}



           
        />
    )
}

export default EditJobForm;
